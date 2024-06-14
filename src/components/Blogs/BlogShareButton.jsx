import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CopyIcon } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const BlogShareButton = ({ blogId, buttonStyles }) => {
  const blogUrl = `${window.location.origin}/blogs/${blogId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(blogUrl);
    toast.success("Link copied to clipboard");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={buttonStyles}>
          <PiShareFat className="text-[22px]" />
          <span>Share</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>Share Blog</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span
            onClick={handleCopyLink}
            className="flex cursor-pointer items-center gap-2"
            to="/"
          >
            <CopyIcon className="size-4" /> Copy Link
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="flex items-center gap-2"
            to={`https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`}
          >
            <FaFacebookF className="size-4" /> Facebook
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="flex items-center gap-2"
            to={`https://www.linkedin.com/shareArticle?mini=true&url=${blogUrl}`}
          >
            <FaLinkedinIn className="size-4" /> LinkedIn
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="flex items-center gap-2"
            to={`https://api.whatsapp.com/send?text=Check%20out%20this%20doctor%20profile%20-%20${blogUrl}`}
          >
            <FaWhatsapp className="size-4" /> Whatsapp
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BlogShareButton;
