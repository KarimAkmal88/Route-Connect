import { queryClient } from "../contexts/queryClientProvider";

export const commentKeys = {
    comments: (postId: string) => ['comments', postId] as const,
    replies: (postId: string, commentId: string) => ['replies', postId, commentId] as const,
};

export async function invalidateCommentQueries(postId: string, parentId?: string, commentId?: string) {
    await Promise.all([
        queryClient.invalidateQueries({ queryKey: commentKeys.comments(postId) }),
        queryClient.invalidateQueries({ queryKey: ['post', postId] }),
        queryClient.invalidateQueries({ queryKey: ['posts'] }),
        ...(parentId ? [queryClient.invalidateQueries({ queryKey: commentKeys.replies(postId, parentId) })] : []),
        ...(commentId ? [queryClient.invalidateQueries({ queryKey: commentKeys.replies(postId, commentId) })] : []),
    ]);
}
