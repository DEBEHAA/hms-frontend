import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createNewBlog, updateBlog } from "@/db/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import NewBlogFormFields from "./NewBlogFormFields";

const NewBlogForm = ({ blog = {} }) => {
  const [blogUrl, setBlogUrl] = useState(blog._id ? `/blogs/${blog._id}` : "");
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState(blog.title || "");
  const [content, setContent] = useState(blog.content || "");
  const [featuredImage, setFeaturedImage] = useState(blog.featuredImage || "");
  const [tags, setTags] = useState(
    blog.tags?.map((tag) => ({ value: tag, label: tag })) || [],
  );

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: (blogData) => {
      if (!blog._id) {
        return createNewBlog(blogData);
      } else {
        return updateBlog(blog._id, blogData);
      }
    },
    onSuccess: (result) => {
      if (result.status === "fail") {
        toast.error(result.message);
      } else {
        toast.success(result.message);

        queryClient.invalidateQueries(["blogs"]);
        setBlogUrl(`/blogs/${result.data?.blog?._id}`);
      }
    },
  });

  const handlePostBlog = (e, status) => {
    e.preventDefault();

    if (!title || !content || (!featuredImage && !blog.featuredImage)) {
      return toast.error("Please fill in all of the required fields");
    }

    let publishedDate = blog.publishedDate;

    if (!blog._id || (blog.status === "Draft" && status === "Published")) {
      publishedDate = new Date();
    }

    const blogData = {
      title,
      content,
      featuredImage: featuredImage || blog.featuredImage,
      tags: tags.map((tag) => tag.value),
      status,
      publishedDate,
    };

    postMutation.mutate(blogData);
  };

  return (
    <div>
      <Form>
        <form
          className="aria-disabled:pointer-events-none aria-disabled:opacity-60"
          aria-disabled={postMutation.isPending}
        >
          <div className="mb-5 flex justify-between gap-10">
            <Button
              className="py-5"
              onClick={() => navigate("../blogs")}
              variant="outline"
            >
              <ChevronLeft /> Go Back
            </Button>
            <div className="flex items-center gap-2">
              <Button
                onClick={(e) => handlePostBlog(e, "Draft")}
                className="py-5"
                variant="outline"
                type="button"
                disabled={isUploading || postMutation.isPending}
              >
                Save Draft
              </Button>
              <Button
                onClick={(e) => handlePostBlog(e, "Published")}
                className="bg-blue py-5 hover:bg-blue/90"
                disabled={isUploading || postMutation.isPending}
              >
                Publish
              </Button>
            </div>
          </div>
          <NewBlogFormFields
            blogUrl={blogUrl}
            tags={tags}
            setTags={setTags}
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            featuredImage={featuredImage}
            setFeaturedImage={setFeaturedImage}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
            isUpdate={!!blog._id}
          />
        </form>
      </Form>
    </div>
  );
};

export default NewBlogForm;
