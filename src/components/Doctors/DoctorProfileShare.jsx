import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CopyIcon, Share } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";

const DoctorProfileShare = ({ doctorId }) => {
  const profileUrl = `${window.location.origin}/doctors/${doctorId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Link copied to clipboard");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          <Share className="mr-2 size-[15px]" /> Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Share Doctor</DropdownMenuLabel>
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
            to={`https://www.facebook.com/sharer/sharer.php?u=${profileUrl}`}
          >
            <FaFacebookF className="size-4" /> Facebook
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="flex items-center gap-2"
            to={`https://www.linkedin.com/shareArticle?mini=true&url=${profileUrl}`}
          >
            <FaLinkedinIn className="size-4" /> LinkedIn
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="flex items-center gap-2"
            to={`https://api.whatsapp.com/send?text=Check%20out%20this%20doctor%20profile%20-%20${profileUrl}`}
          >
            <FaWhatsapp className="size-4" /> Whatsapp
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DoctorProfileShare;
