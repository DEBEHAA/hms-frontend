import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { updateAdmin } from "@/db/admin";
import { useStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import DashFormField from "../shared/DashFormField";

const adminSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  email: z
    .string()
    .refine(
      (val) => {
        if (val === "") return true;
        return z.string().email().safeParse(val).success;
      },
      { message: "Invalid email address" },
    )
    .optional(),
  mobileNo: z
    .string()
    .min(11, { message: "Mobile no must be at least 11 characters long" })
    .max(11, { message: "Mobile no must be at least 11 characters long" })
    .readonly(),
});

const AdminProfileForm = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const form = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      mobileNo: user.mobileNo || "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updateAdmin(user._id, data),
    onSuccess: (result) => {
      if (result.status === "success") {
        toast.success("Profile updated successfully");

        setUser(result.data?.user);
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Profile update failed");
    },
  });

  const handleProfileUpdate = (values) => {
    updateMutation.mutate(values);
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="relative space-y-3"
          onSubmit={form.handleSubmit(handleProfileUpdate)}
        >
          <DashFormField
            label="Name"
            name="name"
            placeholder="Enter your name"
            formControl={form.control}
            disabled={updateMutation.isPending}
          />
          <DashFormField
            label="Email"
            name="email"
            placeholder="Enter email address"
            formControl={form.control}
            disabled={updateMutation.isPending}
          />
          <DashFormField
            label="Mobile No"
            name="mobileNo"
            placeholder="Enter mobile number"
            formControl={form.control}
            disabled
          />
          <div className="pt-2 text-center">
            <Button
              disabled={updateMutation.isPending}
              className="bg-blue px-6 py-[25px] hover:bg-blue/90"
              type="submit"
            >
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminProfileForm;
