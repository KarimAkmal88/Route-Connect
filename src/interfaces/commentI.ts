import type { UserI } from "./userI";

export interface CommentI {
    _id:            string;
    content?:        string;
    commentCreator: UserI;
    post:           string;
    parentComment?: string | null;
    likes?:         string[];
    repliesCount?:  number;
    isReply?:       boolean;
    createdAt:      string;
    image?:         string;
}
