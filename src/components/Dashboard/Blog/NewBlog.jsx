import DashboardHeader from "../shared/DashboardHeader";
import NewBlogForm from "./NewBlogForm";

const NewBlog = () => {
  return (
    <>
      <DashboardHeader title="New Blog" desc="Add a new blog post" />
      <div className="mx-auto h-[calc(100dvh-80px)] w-full overflow-y-auto">
        <div className="p-3 sm:p-5 xl:p-10">
          <NewBlogForm />
        </div>
      </div>
    </>
  );
};

export default NewBlog;
