import { Button, Card, Skeleton, Spinner } from "@heroui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import { postsServices } from "../services/postsService";

export default function Feed() {
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => postsServices.getAllPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, numberOfPages } = lastPage.meta.pagination;
      if (currentPage < numberOfPages) {
        return currentPage + 1;
      }
      return undefined;
    },
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 3,
    retryDelay: 3000,
  });

  const posts = data?.pages.flatMap((page) => page.data.posts) || [];
  const { ref, inView } = useInView({
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, isFetching, fetchNextPage]);

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
      ) : isError && posts.length === 0 ? (
        <div className="bg-elevated text-text-primary p-4 max-w-3xl mx-auto mt-10 rounded-xl">
          <p className="text-2xl mb-4">{error.message}</p>
          <Button color="secondary" onClick={refetch}>Retry</Button>
        </div>
      ) : (
        <div className="max-w-3xl my-10 mx-auto">
          {isFetching && !isFetchingNextPage && posts.length > 0 && (
            <Spinner className="mb-4 mx-auto block" size="sm" />
          )}

          <div className="grid gap-4 rounded-2xl bg-elevated border border-text-secondary text-text-primary">
            <CreatePost />

            {posts.map((post) => (
              <Post key={post._id} post={post} showTopComment={true} />
            ))}
          </div>
          <div className="text-center py-8 mt-4 min-h-[60px] flex flex-col items-center justify-center">
            {isFetchingNextPage ? (
              <Spinner label="Loading more posts..." />
            ) : isError && posts.length > 0 ? (
              <div className="space-y-2">
                <p className="text-danger text-sm">Failed to load more posts.</p>
                <Button size="sm" color="danger" variant="flat" onClick={() => fetchNextPage()}>
                  Try Loading Again
                </Button>
              </div>
            ) : hasNextPage ? (
              !isFetching ? (
                <div ref={ref} className="h-2 w-full bg-transparent" />
              ) : (
                <span className="text-text-secondary text-sm">Preparing next posts...</span>
              )
            ) : (
              <span className="text-text-secondary text-sm font-medium">You've reached the end of the feed!</span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
