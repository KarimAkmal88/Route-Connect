import { Button } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState, type SubmitEvent } from "react";
import type { CommentI } from "../../interfaces/commentI";
import { invalidateCommentQueries } from "../../hooks/commentQueries";
import { commentsServices } from "../../services/commentsService";

interface Props {
    postId: string;
    parentId?: string;
    comment?: CommentI;
    onDone?: () => void;
    onCancel?: () => void;
}

export default function CommentForm({ postId, parentId, comment, onDone, onCancel }: Props) {
    const [content, setContent] = useState(comment?.content ?? "");
    const [image, setImage] = useState<File>();
    const [preview, setPreview] = useState<string>();
    const [validationError, setValidationError] = useState("");
    const fileInput = useRef<HTMLInputElement>(null);
    const objectUrl = useRef<string | undefined>(undefined);
    const label = parentId ? "reply" : "comment";

    useEffect(() => () => {
        if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    }, []);

    function selectImage(file?: File) {
        if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
        objectUrl.current = file ? URL.createObjectURL(file) : undefined;
        setPreview(objectUrl.current);
        setImage(file);
        if (!file && fileInput.current) fileInput.current.value = "";
    }

    const mutation = useMutation({
        mutationFn: (formData: FormData) => comment
            ? commentsServices.editComment(postId, comment._id, formData)
            : commentsServices.createComment(postId, formData, parentId),
        onSuccess: async () => {
            await invalidateCommentQueries(postId, parentId);
            setContent("");
            selectImage();
            setValidationError("");
            onDone?.();
        },
    });

    function submit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (mutation.isPending) return;
        if (!content.trim() && !image && !comment?.image) {
            setValidationError(`Add text or an image to your ${label}.`);
            return;
        }
        if (image && !image.type.startsWith("image/")) {
            setValidationError("Please select an image file.");
            return;
        }
        setValidationError("");
        const formData = new FormData();
        if (content.trim()) formData.set("content", content.trim());
        if (image) formData.set("image", image);
        mutation.mutate(formData);
    }

    return <form onSubmit={submit} className="space-y-3 rounded-lg border border-divider p-3">
        <textarea aria-label={`${comment ? "Edit" : "Write"} ${label}`} value={content}
            onChange={(event) => setContent(event.target.value)} disabled={mutation.isPending}
            placeholder={`Write a ${label}...`} rows={3}
            className="w-full resize-y rounded-lg border border-divider bg-surface p-3 text-text-primary" />
        {(preview || comment?.image) && <img src={preview || comment?.image} alt="Attached image preview" className="max-h-64 rounded-lg object-contain" />}
        {image && <Button size="sm" variant="light" isDisabled={mutation.isPending} onPress={() => selectImage()}>Remove selected image</Button>}
        <label className="block text-sm text-text-secondary">
            {comment?.image ? "Replace image" : "Attach image (optional)"}
            <input ref={fileInput} type="file" accept="image/*" disabled={mutation.isPending}
                onChange={(event) => selectImage(event.target.files?.[0])} className="mt-1 block w-full" />
        </label>
        {validationError && <p role="alert" className="text-error">{validationError}</p>}
        {mutation.isError && <p role="alert" className="text-error">Failed to {comment ? "save" : "create"} {label}. Please try again.</p>}
        <div className="flex justify-end gap-2">
            {onCancel && <Button variant="light" isDisabled={mutation.isPending} onPress={onCancel}>Cancel</Button>}
            <Button type="submit" color="primary" isLoading={mutation.isPending}>{comment ? "Save" : `Send ${label}`}</Button>
        </div>
    </form>;
}
