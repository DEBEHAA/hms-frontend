import ImageUpload from "@/components/shared/ImageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import HospitalProfileFormFields from "./HospitalProfileFormFields";

const HospitalProfileForm = () => {
  const [photo, setPhoto] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const user = useStore((state) => state.user);

  const handlePhotoUpload = (imageUrl) => setPhoto(imageUrl);

  useEffect(() => {
    setPhoto(user.profile?.photo);
  }, [user.profile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      {user.profile ? (
        <CardContent className="">
          <ImageUpload
            photo={photo}
            isUpdate={true}
            onImageUpload={handlePhotoUpload}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
            uploadButtonLabel="Upload profile photo"
            imageId="profilePhoto"
            updateNote=""
            customStyles={{
              wrapper: "w-48 h-52 mx-auto",
            }}
          />
          <HospitalProfileFormFields userData={user} photo={photo} />
        </CardContent>
      ) : (
        <h3>Loading...</h3>
      )}
    </Card>
  );
};

export default HospitalProfileForm;
