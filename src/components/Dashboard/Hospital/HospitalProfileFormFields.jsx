import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { updateHospital } from "@/db/hospital";
import { useStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import DashFormField from "../shared/DashFormField";

const hospitalSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
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
  contactNo: z.string(),
  address: z.string(),
  district: z
    .string()
    .min(3, { message: "District must be at least 3 characters long" }),
  description: z.string(),
  website: z.string(),
});

const HospitalProfileFormFields = ({ userData, photo }) => {
  const setUser = useStore((state) => state.setUser);

  const form = useForm({
    resolver: zodResolver(hospitalSchema),
    defaultValues: {
      name: userData.name || "",
      email: userData.email || "",
      mobileNo: userData.mobileNo || "",
      contactNo: userData.profile?.contactNo || "",
      address: userData.profile?.address || "",
      district: userData.profile?.district || "",
      description: userData.profile?.description || "",
      website: userData.profile?.website || "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateHospital,
    onSuccess: (result) => {
      if (result.status === "success") {
        toast("Profile updated successfully", {
          type: "success",
        });

        setUser(result.data?.user);
      }
    },
    onError: (error) => {
      console.error(error);
      toast("Profile update failed", { type: "error" });
    },
  });

  const handleProfileUpdate = (values) => {
    const hospitalData = {
      ...values,
      photo,
    };

    updateMutation.mutate(hospitalData);
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
            placeholder="Enter hospital name"
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
            label="Login mobile no"
            name="mobileNo"
            placeholder="Enter mobile number"
            formControl={form.control}
            disabled
          />
          <DashFormField
            label="Contact No"
            name="contactNo"
            placeholder="Enter contact number"
            formControl={form.control}
            disabled={updateMutation.isPending}
          />
          <DashFormField
            label="Address"
            name="address"
            placeholder="Enter full address"
            formControl={form.control}
            disabled={updateMutation.isPending}
          />
          <DashFormField
            label="district"
            name="district"
            placeholder="Enter hospital district"
            formControl={form.control}
            disabled={updateMutation.isPending}
          />
          <DashFormField
            label="Website URL"
            name="website"
            placeholder="Enter website URL"
            formControl={form.control}
            disabled={updateMutation.isPending}
          />
          <DashFormField
            label="Description"
            name="description"
            placeholder="Enter hospital description"
            formControl={form.control}
            isTextarea
            disabled={updateMutation.isPending}
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

export default HospitalProfileFormFields;
