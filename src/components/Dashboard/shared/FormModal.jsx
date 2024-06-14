import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const FormModal = ({ children, title }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("..");
  };

  return (
    <Dialog onOpenChange={handleClose} defaultOpen>
      <DialogContent className="grid max-h-[calc(100dvh-40px)] w-[calc(100%-20px)] max-w-[780px] grid-cols-1 grid-rows-[auto_1fr] gap-0 rounded-lg p-0 sm:w-[calc(100%-40px)] md:max-h-[calc(100dvh-60px)]">
        <DialogHeader
          className={
            "flex w-full flex-row items-center justify-between gap-5 space-y-0 border-b px-5 py-4"
          }
        >
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <button
            onClick={handleClose}
            className="text-2xl text-red-500 outline-none ring-0"
          >
            <MdOutlineClose />
          </button>
        </DialogHeader>
        <ScrollArea className="p-5">
          <div>{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
