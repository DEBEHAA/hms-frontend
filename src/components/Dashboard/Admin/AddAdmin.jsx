import SignupFormField from "@/components/Auth/SignupFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createAdmin } from "@/db/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  mobileNo: z
    .string()
    .min(11, { message: "Mobile no must be at least 11 characters long" })
    .max(11, { message: "Mobile no must be at least 11 characters long" }),
  password: z.string().min(8, {
    message: "Password must contain at least 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must contain at least 8 characters",
  }),
});

const AddAdmin = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobileNo: "",
      password: "",
      confirmPassword: "",
    },
  });

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success("Admin added successful");

        queryClient.invalidateQueries(["admins"]);

        return navigate("..");
      } else {
        toast.error(data.message || "Failed to add admin");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(data.message || "Failed to add admin");
    },
  });

  const handleAddAdmin = (values) => {
    if (values.password !== values.confirmPassword) {
      return toast.error("Password doesn't match");
    }

    addMutation.mutate(values);
  };

  return (
    <div className="mx-auto max-w-md">
      <Form {...form}>
        <form
          className="relative space-y-3"
          onSubmit={form.handleSubmit(handleAddAdmin)}
        >
          <SignupFormField
            label="Full name"
            name="name"
            placeholder="Enter your name"
            formControl={form.control}
            disabled={addMutation.isPending}
          />
          <SignupFormField
            label="Mobile No."
            name="mobileNo"
            placeholder="Enter your mobile no."
            formControl={form.control}
            disabled={addMutation.isPending}
          />
          <SignupFormField
            label="Password"
            name="password"
            placeholder="Enter your password"
            inputType="password"
            formControl={form.control}
            disabled={addMutation.isPending}
          />
          <SignupFormField
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Enter your password again"
            inputType="password"
            formControl={form.control}
            disabled={addMutation.isPending}
          />

          <Button
            className="w-full bg-blue py-[22px] text-[15px] hover:bg-blue/90"
            type="submit"
            disabled={addMutation.isPending}
          >
            Add Admin
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddAdmin;
