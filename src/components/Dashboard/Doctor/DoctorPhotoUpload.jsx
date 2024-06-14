import ImageUpload from "@/components/shared/ImageUpload";
import { useState } from "react";

const DoctorPhotoUpload = ({
  isUpdate = false,
  oldPhoto = "",
  handlePhotoUpload,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div>
      <ImageUpload
        photo={oldPhoto}
        isUpdate={isUpdate}
        onImageUpload={handlePhotoUpload}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
        uploadButtonLabel="Upload doctor photo"
        imageId="doctorPhoto"
        customStyles={{
          wrapper: "h-[260px]",
        }}
      />
    </div>
  );
};

export default DoctorPhotoUpload;
