import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { updatePassword } from "@/db/auth";
import { useStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import DashFormField from "./DashFormField";

const passwordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmNewPassword: z.string(),
});

const ProfilePasswordForm = () => {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: async (result) => {
      if (result.status === "success") {
        toast.success("Password updated successfully");

        setUser(null);
        return navigate("/login");
      } else {
        toast.error(result.message);
      }
    },
  });

  const handlePasswordChange = (values) => {
    if (values.newPassword !== values.confirmNewPassword) {
      return toast.error("New passwords do not match. Please try again.");
    }

    updateMutation.mutate(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you'll be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handlePasswordChange)}
          >
            <DashFormField
              label="Current password"
              name="currentPassword"
              placeholder="Enter your current password"
              inputType="password"
              disabled={updateMutation.isLoading}
            />
            <DashFormField
              label="New password"
              name="newPassword"
              placeholder="Enter a new password"
              inputType="password"
              disabled={updateMutation.isLoading}
            />
            <DashFormField
              label="Confirm New password"
              name="confirmNewPassword"
              placeholder="Confirm your new password"
              inputType="password"
              disabled={updateMutation.isLoading}
            />
            <Button
              disabled={updateMutation.isLoading}
              className="bg-blue px-5 py-6 hover:bg-blue/90"
              type="submit"
            >
              Save password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfilePasswordForm;
