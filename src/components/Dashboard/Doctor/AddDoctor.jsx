import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createDoctor, updateDoctor } from "@/db/doctor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import DashFormField from "../shared/DashFormField";
import DoctorMultiSelect from "./DoctorMultiSelect";
import DoctorOffDays from "./DoctorOffDays";
import DoctorPhotoUpload from "./DoctorPhotoUpload";
import DoctorSpecialities from "./DoctorSpecialities";

const doctorSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  photo: z.string(),
  qualifications: z.string().min(1, {
    message: "Qualifications is required",
  }),
  about: z.string(),
  specialities: z
    .array(z.string())
    .nonempty({ message: "Select at least one speciality" }),
  designation: z.string(),
  languages: z
    .array(z.string())
    .nonempty({ message: "Select at least one language" }),
  institute: z.string(),
  department: z.string(),
  appointmentNo: z.any(),
  chamberTime: z.string(),
  offDays: z.array(z.string()),
  floorNo: z.string(),
  roomNumber: z.string(),
  branchNames: z.array(z.string()),
  bmdcNo: z.string(),
  consultationFee: z.string().optional(),
  phone: z.string(),
  feesToShowReport: z.string().optional(),
});

const AddDoctor = ({ doctor = {} }) => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: doctor?.name || "",
      photo: doctor?.photo || "",
      qualifications: doctor?.qualifications || "",
      about: doctor?.about || "",
      specialities: doctor?.specialities || [],
      designation: doctor?.designation || "",
      languages: doctor?.languages || [],
      institute: doctor?.institute || "",
      department: doctor?.department || "",
      appointmentNo: doctor?.appointmentNo || "",
      chamberTime: doctor?.chamberTime || "",
      offDays: doctor?.offDays || [],
      floorNo: doctor?.floorNo || "",
      roomNumber: doctor?.roomNumber || "",
      branchNames: doctor?.branchNames || [],
      bmdcNo: doctor?.bmdcNo || "",
      consultationFee: doctor?.consulatationFee || undefined,
      phone: doctor?.phone || "",
      feesToShowReport: doctor?.feesToShowReport || undefined,
    },
  });

  const checkedDays = form.watch("offDays", doctor?.offDays || []);

  const handleDaysChange = (day, checked) => {
    const newCheckedDays = checked
      ? [...checkedDays, day]
      : checkedDays.filter((d) => d !== day);

    form.setValue("offDays", newCheckedDays);
  };

  const handlePhotoUpload = (imageUrl) => {
    form.setValue("photo", imageUrl);
  };

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createDoctor,
    onSuccess: (result) => {
      if (result.status === "success") {
        toast("Doctor added successfully", {
          type: "success",
        });

        queryClient.invalidateQueries("doctors");
        queryClient.invalidateQueries("specialities");
        navigate("../");
      } else {
        toast("Failed to add doctor", {
          type: "error",
        });
      }
    },
    onError: (error) => {
      toast("Failed to add doctor", {
        type: "error",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateDoctor,
    onSuccess: (result) => {
      if (result.status === "success") {
        toast("Doctor updated successfully", {
          type: "success",
        });

        queryClient.invalidateQueries("doctors");
        queryClient.invalidateQueries("specialities");
        navigate("../");
      } else {
        toast(result.message || "Failed to update doctor", {
          type: "error",
        });
      }
    },
    onError: (error) => {
      console.log(error);

      toast("Failed to update doctor", {
        type: "error",
      });
    },
  });

  const onSubmit = (doctorData) => {
    if (doctor._id) {
      updateMutation.mutate({ doctorId: doctor._id, doctorData });
    } else {
      createMutation.mutate(doctorData);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="relative space-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-[240px_1fr] gap-6">
            <DoctorPhotoUpload
              isUpdate={!!doctor?.photo}
              oldPhoto={doctor?.photo || ""}
              handlePhotoUpload={handlePhotoUpload}
            />
            <div className="space-y-4">
              <DashFormField
                label="Name"
                name="name"
                placeholder="Enter doctor name"
                formControl={form.control}
              />
              <DashFormField
                label="Qualifications"
                name="qualifications"
                placeholder="Enter doctor qualifications"
                formControl={form.control}
              />
              <DoctorSpecialities
                formControl={form.control}
                onSelectChange={form.setValue}
                initialSelected={
                  doctor?.specialities?.map((s) => ({
                    value: s.name,
                    label: s.name,
                  })) || []
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-3">
            <DashFormField
              label="Institute"
              name="institute"
              placeholder="Enter doctor institute"
              formControl={form.control}
            />
            <DashFormField
              label="Designation"
              name="designation"
              placeholder="Enter doctor designation"
              formControl={form.control}
            />
            <DashFormField
              label="Department"
              name="department"
              placeholder="Enter doctor department"
              formControl={form.control}
            />
            <DashFormField
              label="BMDC No"
              name="bmdcNo"
              placeholder="Enter doctor BMDC number"
              formControl={form.control}
            />
            <DashFormField
              label="Appointment Number"
              name="appointmentNo"
              placeholder="Enter appointment phone number"
              formControl={form.control}
            />
            <DashFormField
              label="Phone"
              name="phone"
              placeholder="Enter doctor phone number"
              formControl={form.control}
            />
            <DashFormField
              label="Chamber Time"
              name="chamberTime"
              placeholder="Enter doctor chamber time"
              formControl={form.control}
            />
            <DoctorOffDays
              formControl={form.control}
              onCheckedChange={handleDaysChange}
              checkedDays={checkedDays}
            />
            <DashFormField
              label="Floor Number"
              name="floorNo"
              placeholder="Enter doctor floor number"
              formControl={form.control}
            />
            <DashFormField
              label="Room Number"
              name="roomNumber"
              placeholder="Enter doctor room number"
              formControl={form.control}
            />
            <DashFormField
              label="Consultation Fee"
              name="consultationFee"
              inputType="number"
              placeholder="Enter doctor consultation fee"
              formControl={form.control}
            />

            <DashFormField
              label="Fees To Show Report"
              name="feesToShowReport"
              inputType="number"
              placeholder="Enter fees to show report"
              formControl={form.control}
            />
            <DoctorMultiSelect
              label="Languages"
              name="languages"
              placeholder="Select languages doctor speaks"
              formControl={form.control}
              onSelectChange={form.setValue}
              initialSelectables={[
                { value: "English", label: "English" },
                { value: "Bengali", label: "Bengali" },
              ]}
              initialSelected={
                doctor?.languages?.map((lang) => ({
                  value: lang,
                  label: lang,
                })) || []
              }
            />
            <DoctorMultiSelect
              label="Branch Names"
              name="branchNames"
              placeholder="Type branch names doctor works at"
              formControl={form.control}
              onSelectChange={form.setValue}
              initialSelected={
                doctor?.branchNames?.map((branch) => ({
                  value: branch,
                  label: branch,
                })) || []
              }
            />
            <div className="col-span-2">
              <DashFormField
                label="About Doctor"
                name="about"
                placeholder="Enter short description about doctor"
                formControl={form.control}
                isTextarea={true}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className="bg-blue hover:bg-blue/90"
              size="lg"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddDoctor;
