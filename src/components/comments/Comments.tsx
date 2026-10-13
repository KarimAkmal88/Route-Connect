import { Button, Spinner } from "@heroui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { commentKeys } from "../../hooks/commentQueries";
import { commentsServices } from "../../services/commentsService";
import Comment from "../Comment";
import CommentForm from "./CommentForm";

export default function Comments({ postId, parentId, enabled = true }: { postId: string; parentId?: string; enabled?: boolean }) {
    const query = useInfiniteQuery({
        queryKey: parentId ? commentKeys.replies(postId, parentId) : commentKeys.comments(postId),
        queryFn: async ({ pageParam, signal }) => {
            if (parentId) {
                const response = await commentsServices.getReplies(postId, parentId, pageParam, signal);
                return { items: response.data.replies, pagination: response.meta.pagination };
            }
            const response = await commentsServices.getComments(postId, pageParam, signal);
            return { items: response.data.comments, pagination: response.meta.pagination };
        },
        initialPageParam: 1,
        getNextPageParam: ({ pagination }) => pagination.currentPage < pagination.numberOfPages ? pagination.currentPage + 1 : undefined,
        enabled: enabled && !!postId,
    });
    const comments = query.data?.pages.flatMap((page) => page.items) ?? [];
    const label = parentId ? "replies" : "comments";

    return <section aria-label={label} className="space-y-4 rounded-lg bg-elevated p-4 text-text-primary">
        {!parentId && <>
            <h2 className="text-lg font-semibold">Comments</h2>
            <CommentForm postId={postId} />
        </>}
        {query.isPending && query.isFetching && <Spinner label={`Loading ${label}`} />}
        {query.isError && <div role="alert" className="space-y-2">
            <p className="text-error">Failed to load {label}. Please try again.</p>
            <Button size="sm" isDisabled={query.isFetching} onPress={() => {
                if (query.isFetchNextPageError) void query.fetchNextPage();
                else void query.refetch();
            }}>Retry</Button>
        </div>}
        {query.isSuccess && comments.length === 0 && <p className="text-text-secondary">No {label} yet.</p>}
        {comments.map((comment) => <Comment key={comment._id} comment={comment} postId={postId} parentId={parentId} />)}
        {query.hasNextPage && <Button variant="flat" isLoading={query.isFetchingNextPage} isDisabled={query.isFetching}
            onPress={() => { void query.fetchNextPage(); }}>Load more {label}</Button>}
    </section>;
}
