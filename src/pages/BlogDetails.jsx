import { BlogComments } from "@/components/Blogs/BlogComments";
import BlogDetailsSkeleton from "@/components/Blogs/BlogDetailsSkeleton";
import BlogReactions from "@/components/Blogs/BlogReactions";
import { getBlogById } from "@/db/blog";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { franc } from "franc";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetails = () => {
  const user = useStore((state) => state.user);
  const { blogId } = useParams();

  const navigate = useNavigate();

  const blogQuery = useQuery({
    queryKey: ["blogs", { blogId }],
    queryFn: () => getBlogById(blogId),
    placeholderData: keepPreviousData,
  });

  const blog = blogQuery.data?.data?.blog || {};

  if (!blogQuery.isFetching && blog.status === "Draft") {
    const isNotAuthor =
      user?.role !== "admin" && blog.author?._id !== user?._id;
    const isNotAdminPost = user?.role === "admin" && blog.postedBy !== "admin";

    if (isNotAuthor || isNotAdminPost) return navigate("/blogs");
  }

  const langCode = franc(blog?.content || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          {(!blogQuery.isFetching || blog._id) && (
            <div className="rounded-lg bg-white p-4 sm:p-6 md:p-10">
              <h1
                className={cn(
                  "mb-5 text-center text-[22px] font-semibold leading-snug sm:text-2xl md:text-3xl",
                  langCode === "ben" && "font-hindSiligrui",
                )}
              >
                {blog.title}
              </h1>
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="aspect-video w-full rounded-lg object-cover"
              />
              <div className="mt-4 space-y-3">
                <p className="text-center font-medium text-gray-700">
                  {format(new Date(blog?.publishedDate), "dd MMMM yyyy")}, by{" "}
                  <span className="text-blue">
                    {blog.author?.name || "Admin"}
                  </span>
                </p>
                {blog.tags?.length > 0 && (
                  <p className="text mx-auto flex max-w-2xl flex-wrap justify-center gap-2 text-center text-sm">
                    {blog.tags?.map((t) => (
                      <span
                        className="rounded-full bg-blue px-2 py-0.5 text-white"
                        key={t}
                      >
                        {t}
                      </span>
                    ))}
                  </p>
                )}
              </div>
              <div
                className={cn(
                  "blog-content mt-10",
                  langCode === "ben" && "[&_*]:font-hindSiligrui",
                )}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.content,
                  }}
                ></div>
              </div>
            </div>
          )}
          {blogQuery.isFetching && !blog._id && <BlogDetailsSkeleton />}
          <BlogReactions reactions={blog?.reactions} blogId={blogId} />
          <BlogComments blogId={blogId} />
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
