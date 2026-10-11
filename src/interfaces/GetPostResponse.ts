import type { PostI } from "./postI";

export interface GetPostResponse {
    success: boolean;
    message: string;
    data: {post: PostI};
}