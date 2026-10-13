import type { CommentsResponse, RepliesResponse, CommentMutationResponse } from "../interfaces/commentsResponse";
import { apiClient } from "./apiClient";

function authHeaders() {
    return { token: localStorage.getItem('token') };
}

class CommentsServices {
    async getComments(postId: string, page: number, signal?: AbortSignal) {
        const { data } = await apiClient.get<CommentsResponse>(`posts/${postId}/comments`, {
            params: { page, limit: 10 }, headers: authHeaders(), signal,
        });
        return data;
    }

    async getReplies(postId: string, commentId: string, page: number, signal?: AbortSignal) {
        const { data } = await apiClient.get<RepliesResponse>(`posts/${postId}/comments/${commentId}/replies`, {
            params: { page, limit: 10 }, headers: authHeaders(), signal,
        });
        return data;
    }

    async createComment(postId: string, formData: FormData, parentId?: string) {
        const path = parentId ? `posts/${postId}/comments/${parentId}/replies` : `posts/${postId}/comments`;
        const { data } = await apiClient.post<CommentMutationResponse>(path, formData, { headers: authHeaders() });
        return data;
    }

    async editComment(postId: string, commentId: string, formData: FormData) {
        const { data } = await apiClient.put<CommentMutationResponse>(`posts/${postId}/comments/${commentId}`, formData, { headers: authHeaders() });
        return data;
    }

    async deleteComment(postId: string, commentId: string) {
        const { data } = await apiClient.delete<CommentMutationResponse>(`posts/${postId}/comments/${commentId}`, { headers: authHeaders() });
        return data;
    }
}

export const commentsServices = new CommentsServices();
