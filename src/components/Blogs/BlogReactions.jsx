import { dislikeBlog, getBlogReaction, likeBlog } from "@/db/blog";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { toast } from "sonner";
import BlogShareButton from "./BlogShareButton";

const buttonStyles =
  "flex w-full items-center justify-center gap-3 rounded-md bg-gray-50 py-4 transition-colors hover:bg-gray-100 disabled:pointer-events-none";

const BlogReactions = ({ reactions, blogId }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const user = useStore((state) => state.user);

  const queryClient = useQueryClient();

  const blogReactQuery = useQuery({
    queryKey: ["blog-reactions", blogId],
    queryFn: () => getBlogReaction(blogId),
    enabled: !!user?._id,
  });

  const blogReaction = blogReactQuery.data?.data?.reaction || {};

  const reactionMutation = useMutation({
    mutationFn: (type) => {
      if (type === "like") {
        setLiked(true);
        setDisliked(false);
        return likeBlog(blogId);
      } else {
        setDisliked(true);
        setLiked(false);
        return dislikeBlog(blogId);
      }
    },
    onSuccess: (result) => {
      if (result.status === "success") {
        queryClient.invalidateQueries(["blogs", blogId]);
        blogReactQuery.refetch();
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleBlogReaction = (type) => {
    if (!user?._id) {
      return toast.error("Please login to react on this blog");
    }

    reactionMutation.mutate(type);
  };

  useEffect(() => {
    setLiked(blogReaction.liked);
    setDisliked(blogReaction.disliked);
  }, [blogReaction]);

  return (
    <div className="mt-3 rounded-lg bg-white p-4 sm:p-6 lg:px-10 lg:py-6">
      <div className={"flex items-center justify-between gap-2 sm:gap-5"}>
        <button
          onClick={() => handleBlogReaction("like")}
          className={cn(buttonStyles, liked && "text-blue")}
          disabled={
            blogReactQuery.isFetching ||
            reactionMutation.isPending ||
            !user?._id
          }
        >
          {!liked ? (
            <AiOutlineLike className="text-[22px]" />
          ) : (
            <AiFillLike className="text-[22px] text-blue" />
          )}
          <span className="">
            {reactions?.like || 0}{" "}
            <span className="hidden sm:inline-block">Likes</span>
          </span>
        </button>
        <button
          onClick={() => handleBlogReaction("dislike")}
          className={cn(buttonStyles, disliked && "text-red-500")}
          disabled={
            blogReactQuery.isFetching ||
            reactionMutation.isPending ||
            !user?._id
          }
        >
          {!disliked ? (
            <AiOutlineDislike className="text-[22px]" />
          ) : (
            <AiFillDislike className="text-[22px]" />
          )}
          <span className="">
            {reactions?.dislike || 0}{" "}
            <span className="hidden sm:inline-block">Dislikes</span>
          </span>
        </button>
        <BlogShareButton blogId={blogId} buttonStyles={buttonStyles} />
      </div>
    </div>
  );
};

export default BlogReactions;
