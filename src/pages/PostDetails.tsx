import { Alert, Card, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Post from "../components/posts/Post";
import Comments from "../components/comments/Comments";
import { postsServices } from "../services/postsService";

export default function PostDetails() {

    const { postId = '' } = useParams();

    const { isPending, isError, data } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => postsServices.GetPostDetail(postId),
        enabled: !!postId,
    });

    if (isPending) {
        return <>
            <Card className="max-w-7xl space-y-5 p-4" radius="lg">
                <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300" />
                </Skeleton>
                <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                    </Skeleton>
                </div>
            </Card>
        </>;
    }

    if (isError) {
        return <div className="flex items-center justify-center w-full">
            <div className="flex flex-col w-full">
                <div className="w-full flex items-center my-3">
                    <Alert color="danger" title={"Error in loading data please try again"} />
                </div>
            </div>
        </div>
    }

    return (
        <>
            <Post post={data.data.post} showTopComment={false}/>
            <Comments key={postId} postId={postId} />
        </>
    );
}
