import { deleteComment } from "@/db/comment";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { franc } from "franc";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const CommentCard = ({
  comment,
  currentUserId,
  commentUpdateId,
  setCommentUpdateId,
  setCommentInput,
}) => {
  const { _id, content, user, createdAt } = comment;

  const langCode = franc(content || "");

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (result) => {
      if (result.status === "success") {
        queryClient.invalidateQueries(["comments", { blogId: _id }]);
        toast.success(result.message || "Comment deleted successfully");
      } else {
        toast.error(result.message);
      }
    },
    onError: (error) => {
      console.log(error);

      toast.error("Failed to delete comment");
    },
  });

  const handleCommentEdit = () => {
    setCommentUpdateId(_id);
    setCommentInput(content);

    const commentInput = document.getElementById("comment-input");
    commentInput.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteDoctor = () => {
    toast("Are you sure you want to delete this comment?", {
      description:
        "This action cannot be undone and will permanently delete the comment.",
      cancel: (
        <Button onClick={() => toast.dismiss()} size="sm" variant="outline">
          Cancel
        </Button>
      ),
      action: (
        <Button
          onClick={() => {
            deleteMutation.mutate(_id);
            toast.dismiss();
          }}
          size="sm"
          variant="destructive"
        >
          Delete
        </Button>
      ),
      position: "top-center",
      classNames: {
        toast: "flex-wrap [&_[data-content]]:w-full justify-end",
        title: "text-sm",
        description: "mb-2",
      },
    });
  };

  if (commentUpdateId === _id) return null;

  return (
    <div className="rounded-lg bg-gray-50 p-5">
      <div className="flex justify-between gap-8">
        <div className="">
          <h2 className="text-[15px] font-semibold text-gray-800">
            {user.name}
          </h2>
          <p className="text-[13px] font-medium text-gray-400">
            {format(new Date(createdAt), "dd MMM yyyy - hh:mm aa")}
          </p>
        </div>
        {user._id === currentUserId && (
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleCommentEdit}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleDeleteDoctor}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className="mt-3">
        <p
          className={cn(
            "text-[15px]",
            langCode === "ben" && "font-hindSiligrui text-[15px]",
          )}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
