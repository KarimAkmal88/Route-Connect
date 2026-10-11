import { Button, Card, Skeleton, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import { postsServices } from "../services/postsService";


export default function Feed() {


  const {
    data: posts = [],
    isLoading,
    isFetching,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: postsServices.getAllPosts,
    select: (data) => data.data.posts,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 3,
    retryDelay: 3000,
  })



  return (
    <>
      {isLoading && posts.length === 0 ? (
        <Card className="max-w-3xl space-y-5 p-4 mx-auto" radius="lg">
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
      ) :
        isError && posts.length === 0 ? (
          <div className="bg-elevated text-text-primary">
            <p className="text-2xl">{error.message}</p>
            <Button color="secondary" onClick={refetch}>Retry</Button>
          </div>
        ) : (
          <>
            {isFetching && posts.length > 0 && <Spinner />}

            {isError && posts.length > 0 &&
              <div className="bg-elevated text-text-primary">
                <p className="text-2xl">{error.message}</p>
                <Button color="secondary" onClick={refetch}>Retry</Button>
              </div>
            }

            <div className="max-w-3xl my-10 mx-auto">
              <div className="grid gap-4 rounded-2xl bg-elevated border border-text-secondary text-text-primary">
                <CreatePost />

                {posts.map((post) => (
                  <Post key={post._id} post={post} showTopComment={true}/>
                ))}
              </div>
            </div>
          </>
        )}
    </>
  );
}
