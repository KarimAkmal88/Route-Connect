import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { queryClient } from "../../contexts/queryClientProvider";
import { postsServices } from "../../services/postsService";

export default function EditPost({ postId, body, onCancel, image }: { postId: string; body: string | undefined; onCancel: () => void; image: string | undefined }) {

  const [editedBody, setEditedBody] = useState<string>(body ?? "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<FileList | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const file = newImage?.[0];
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (formData: FormData) => postsServices.EditPost(formData, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts',],
      });
      queryClient.invalidateQueries({
        queryKey: ['post', postId],
      })
      onCancel();
    }
  });

  function editPost(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.set('body', editedBody);
    if (file) {
      formData.set('image', file);
    }
    mutate(formData)
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      objectUrlRef.current = url;
    } else {
      setPreviewUrl(null);
    }
  }

  function clearImagePreview() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
      setPreviewUrl(null);
    }

  }

  useEffect(() => {
    function cleanUp() {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    }
    return cleanUp
  }, [])

  return (
    <>
      <div className="bg-elevated rounded-xl my-4 p-3 sm:p-4">
        <form className="space-y-4" onSubmit={editPost}>
          <div>
            <textarea aria-label="Edit post text"
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              className="w-full bg-background text-sm px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent resize-none text-text-primary">
            </textarea>
          </div>
          {
            isError && <p className="text-error">Failed to edit the post. Please try again.</p>
          }
          <div className="relative">
            {(previewUrl || image) && (
              <img src={previewUrl ? previewUrl : image} alt="Preview" className="w-full max-h-64 object-contain rounded-lg text-text-primary" />)
            }
            {
              previewUrl &&
              <button
                onClick={() => {
                  clearImagePreview();
                  setNewImage(null);
                  fileInputRef.current!.value = ""
                }}
                type="button"
                aria-label="Remove selected image" className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            }
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <label className="cursor-pointer text-text-secondary hover:text-secondary transition duration-200">
                <input
                  onChange={(event) => {
                    setNewImage(event.target.files);
                    handleImageChange(event);
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="fileInput"
                  ref={fileInputRef}
                />
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Photo</span>
                </div>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  onCancel()
                }}
                type="button"
                className="px-4 py-2 text-text-secondary hover:text-text-primary transition duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={isPending}

                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {isPending ?
                  <span className="flex items-center space-x-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Updating...</span>
                  </span>
                  :
                  <span>Save</span>
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
