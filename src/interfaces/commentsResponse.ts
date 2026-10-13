import type { CommentI } from "./commentI";

interface Pagination {
    currentPage: number;
    limit: number;
    total: number;
    numberOfPages: number;
}

export interface CommentsResponse {
    data: { comments: CommentI[] };
    meta: { pagination: Pagination };
}

export interface RepliesResponse {
    data: { replies: CommentI[] };
    meta: { pagination: Pagination };
}

// Mutations do not need the endpoint-specific resource payload.
export interface CommentMutationResponse {
    success: boolean;
    message: string;
}
