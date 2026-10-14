import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { Eraser } from "lucide-react";
import { queryClient } from "../../contexts/queryClientProvider";
import { postsServices } from "../../services/postsService";

export default function DeletePost({ postId, postIsDeleted }: { postId: string; postIsDeleted?: () => void }) {

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutate, isPending, isError, } = useMutation({
    mutationFn: postsServices.DeletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
      queryClient.removeQueries({
        queryKey: ['post', postId],
      });
      onClose();
      if (postIsDeleted) {
        postIsDeleted();
      }
    },
  });
  
  return (
    <>
      <Eraser onClick={() => {
        onOpen();
      }} className="cursor-pointer" />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete post</ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this post and all its content?
                </p>
                {
                    isError && <p className="text-red-500">Failed to delete post. Please try again.</p>
                  }
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onPress={() => mutate(postId)} isLoading={isPending} >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
