import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import formatRelativeTime from "../helpers/timeFormat";
import { useAuth } from "../hooks/useAuth";
import { invalidateCommentQueries } from "../hooks/commentQueries";
import type { CommentI } from "../interfaces/commentI";
import { commentsServices } from "../services/commentsService";
import defaultPhoto from "../assets/logos/default-profile-image.jpg";
import CommentForm from "./comments/CommentForm";
import Comments from "./comments/Comments";

interface Props {
    comment: CommentI;
    postId?: string;
    parentId?: string;
}

export default function Comment({ comment, postId, parentId }: Props) {
    const { userData } = useAuth();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [replying, setReplying] = useState(false);
    const isReply = !!parentId || !!comment.parentComment || comment.isReply === true;
    const label = isReply ? "reply" : "comment";
    const owner = userData?._id === comment.commentCreator._id;
    const deletion = useMutation({
        mutationFn: () => {
            if (!postId) throw new Error("A post is required to delete a comment.");
            return commentsServices.deleteComment(postId, comment._id);
        },
        onSuccess: async () => {
            if (postId) await invalidateCommentQueries(postId, parentId, comment._id);
            setDeleting(false);
        },
    });

    return <article className="space-y-3 rounded-lg border border-divider p-3">
        <div className="flex items-center gap-3">
            <img src={comment.commentCreator.photo || defaultPhoto} alt={comment.commentCreator.name} className="h-9 w-9 rounded-full object-cover" />
            <div>
                <h3 className="font-semibold">{comment.commentCreator.name}</h3>
                <p className="text-xs text-text-secondary">{formatRelativeTime(comment.createdAt)}</p>
            </div>
        </div>
        {editing && postId ? <CommentForm postId={postId} parentId={parentId} comment={comment}
            onDone={() => setEditing(false)} onCancel={() => setEditing(false)} /> : <>
            {comment.content && <p className="whitespace-pre-wrap break-words">{comment.content}</p>}
            {comment.image && <img src={comment.image} alt="Comment attachment" className="max-h-80 max-w-full rounded-lg object-contain" />}
        </>}
        {postId && <div className="flex flex-wrap gap-2">
            {owner && <>
                <Button size="sm" variant="light" isDisabled={editing || replying || deletion.isPending} onPress={() => setEditing(true)}>Edit</Button>
                <Button size="sm" color="danger" variant="light" isDisabled={editing || replying || deletion.isPending} onPress={() => {
                    deletion.reset();
                    setDeleting(true);
                }}>Delete</Button>
            </>}
            {!isReply && <>
                <Button size="sm" variant="light" isDisabled={replying || deletion.isPending} onPress={() => setReplying(true)}>Reply</Button>
                <Button size="sm" variant="light" onPress={() => setShowReplies(!showReplies)}>
                    {showReplies ? "Hide replies" : `View replies${comment.repliesCount !== undefined ? ` (${comment.repliesCount})` : ""}`}
                </Button>
            </>}
        </div>}
        {postId && !isReply && replying && <CommentForm postId={postId} parentId={comment._id} onCancel={() => setReplying(false)} onDone={() => {
            setReplying(false);
            setShowReplies(true);
        }} />}
        {postId && !isReply && <div hidden={!showReplies} className="ml-3 border-l border-divider pl-3">
            <Comments postId={postId} parentId={comment._id} enabled={showReplies} />
        </div>}
        <Modal isOpen={deleting} isDismissable={!deletion.isPending} hideCloseButton={deletion.isPending}
            onOpenChange={(open) => { if (!deletion.isPending) setDeleting(open); }}>
            <ModalContent>
                <ModalHeader>Delete {label}</ModalHeader>
                <ModalBody>
                    <p>Delete this {label}{!isReply ? " and its replies" : ""}?</p>
                    {deletion.isError && <p role="alert" className="text-error">Deletion failed. Please try again.</p>}
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" isDisabled={deletion.isPending} onPress={() => setDeleting(false)}>Cancel</Button>
                    <Button color="danger" isLoading={deletion.isPending} onPress={() => deletion.mutate()}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </article>;
}
