import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNotice, updateNotice } from "@/db/notice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import DashFormField from "../shared/DashFormField";
import NoticeDateField from "./NoticeDateField";

const noticeSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.string().min(1, {
    message: "Notice content is required",
  }),
  startDate: z.date({
    message: "Start date is required",
  }),
  status: z.enum(["Active", "Expired"], {
    message: "Please select the status",
  }),
  audience: z.enum(["patient", "hospital", "all"], {
    message: "Please select the audience",
  }),
});

const NoticeForm = ({ notice }) => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      title: notice?.title || "",
      content: notice?.content || "",
      startDate: notice?.startDate ? new Date(notice?.startDate) : undefined,
      status: notice?.status || "Active",
      audience: notice?.audience || "all",
    },
  });

  const startDate = form.watch("startDate");
  const startDateError = form.formState.errors.startDate;

  const handleDateChange = (date) => {
    form.setValue("startDate", date);
  };

  const queryClient = useQueryClient();

  const noticeMutation = useMutation({
    mutationFn: (noticeData) => {
      if (notice?._id) {
        return updateNotice(notice._id, noticeData);
      }

      return createNotice(noticeData);
    },
    onSuccess: (result) => {
      if (result.status === "success") {
        toast.success(result.message);

        queryClient.invalidateQueries(["notice"]);
        navigate("..");
      } else {
        toast.error(result.message);
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleNoticeSubmit = (data) => {
    const noticeData = {
      ...data,
    };

    noticeMutation.mutate(noticeData);
  };

  return (
    <div className="mx-auto max-w-xl">
      <Form {...form}>
        <form
          className="space-y-3"
          onSubmit={form.handleSubmit(handleNoticeSubmit)}
        >
          <DashFormField
            name="title"
            label="Title"
            placeholder="Enter notice title"
            formControl={form.control}
            disabled={noticeMutation.isPending}
          />
          <DashFormField
            name="content"
            label="Content"
            placeholder="Enter notice content"
            formControl={form.control}
            isTextarea={true}
            disabled={noticeMutation.isPending}
          />
          <NoticeDateField
            startDate={startDate}
            startDateError={startDateError}
            handleDateChange={handleDateChange}
            disabled={noticeMutation.isPending}
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={noticeMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full py-[22px] text-[15px]">
                        <SelectValue placeholder="Select notice status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="audience"
              render={({ field }) => (
                <FormItem className="w-full space-y-1">
                  <FormLabel>Audience</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={noticeMutation.isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full py-[22px] text-[15px]">
                        <SelectValue placeholder="Select audience type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="patient">Patient</SelectItem>
                      <SelectItem value="hospital">Hospital</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center pt-2">
            <Button
              className="w-full max-w-[200px] bg-blue py-6 text-[15px] hover:bg-blue/90"
              type="submit"
              disabled={noticeMutation.isPending}
            >
              {notice?._id ? "Update Notice" : "Create Notice"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NoticeForm;
