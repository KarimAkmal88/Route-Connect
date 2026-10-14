import type { GetPostResponse } from "../interfaces/GetPostResponse";
import type { GetPostsResponse } from "../interfaces/getPostsResponse";
import { apiClient } from "./apiClient";

class PostsServices {
    async getAllPosts(page: number): Promise<GetPostsResponse> {
        const { data } = await apiClient.get('posts', {
            params: {
                page
            },
        })
        return data;
    }

    async DeletePost(postId: string) {
        const { data } = await apiClient.delete('posts/' + postId,)
        return data
    }

    async CreatePost(formData: FormData) {
        const { data } = await apiClient.post('posts', formData,)
        return data;
    }

    async EditPost(formData: FormData, postId: string) {
        const { data } = await apiClient.put('posts/' + postId, formData,)
        return data;
    }

    async GetPostDetail(postId: string): Promise<GetPostResponse> {
        const { data } = await apiClient.get('posts/' + postId,)
        return data
    }
}

export const postsServices = new PostsServices();