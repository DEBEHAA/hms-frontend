import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { franc } from "franc";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { _id, title, featuredImage, publishedDate, author } = blog;

  const langCode = franc(title);

  return (
    <Link className="mx-auto h-full max-w-sm" to={`/blogs/${_id}`}>
      <div className="h-full overflow-hidden rounded-md bg-white">
        <img
          className="aspect-video object-cover"
          src={featuredImage}
          alt={title}
        />
        <div className="p-5">
          <h2
            className={cn(
              "mb-1 text-lg font-semibold leading-snug text-gray-800",
              langCode === "ben" && "font-hindSiligrui",
            )}
          >
            {title}
          </h2>

          <p className="text-sm text-gray-500">
            by <span className="text-blue">{author.name}</span>
          </p>

          <div className="mt-10">
            <p className="text-sm text-gray-500">
              Published on{" "}
              <span className="text-gray-800">
                {format(publishedDate, "dd MMM yyyy")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
