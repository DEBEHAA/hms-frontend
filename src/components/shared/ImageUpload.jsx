import { uploadImage } from "@/db/imageUpload";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaStarOfLife } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { TbPhotoUp } from "react-icons/tb";
import { toast } from "sonner";

const ImageUpload = ({
  photo,
  isRequired = false,
  isUpdate = false,
  onImageUpload,
  uploadButtonLabel = "Click to upload image",
  maxFileSizeMB = 5,
  customStyles = {},
  updateNote = "PS: Don't select anything if you don't want to change the photo.",
  imageId = "uploadImage",
  setIsUploading,
  isUploading,
}) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = async (imageFile) => {
    setImage(URL.createObjectURL(imageFile));

    const toastId = toast.loading("Image is uploading...");
    setIsUploading(true);

    const result = await uploadImage(imageFile);
    setIsUploading(false);

    if (result?.success) {
      onImageUpload(result.data.display_url);
      toast.success("Image upload successful!", { id: toastId });
    } else {
      setImage(null);
      toast.error("Image upload failed! Please try again", { id: toastId });
    }
  };

  const handleFileInputChange = async (e) => {
    const imageFile = e.target?.files[0];
    if (!imageFile) return;

    if (imageFile.size > maxFileSizeMB * 1024 * 1024) {
      return toast.error(`Image size should be less than ${maxFileSizeMB}MB`);
    }

    return await handleImageUpload(imageFile);
  };

  const clearImage = () => {
    setImage(null);
    onImageUpload("");
  };

  return (
    <div
      className={cn(
        "aspect-[5/6] w-[240px] overflow-hidden rounded-lg border-2 border-dashed bg-[#F8F9FB]",
        customStyles.wrapper,
      )}
    >
      {!image && !photo && (
        <label
          className={cn(
            "group flex h-full cursor-pointer flex-col items-center justify-center p-5 text-center",
            customStyles.label,
          )}
          htmlFor={imageId}
        >
          <span className="text-3xl text-gray-400">
            <TbPhotoUp />
          </span>
          <p className="mb-1 mt-6 text-sm text-[#4d91ff] group-hover:underline">
            {uploadButtonLabel}
            {!isUpdate && isRequired && (
              <span className="ml-1 inline-block text-[10px] text-red-400">
                <FaStarOfLife />
              </span>
            )}
          </p>
          <span className="text-xs text-gray-400">
            ( Less than {maxFileSizeMB} MB )
          </span>
          {isUpdate && updateNote && (
            <p className="mt-5 text-sm text-red-400">{updateNote}</p>
          )}
        </label>
      )}
      <input
        type="file"
        accept="image/*"
        name={imageId}
        id={imageId}
        className="hidden"
        onChange={handleFileInputChange}
      />
      {(image || photo) && (
        <div
          className={cn(
            "relative h-full w-full p-2",
            customStyles.imageContainer,
          )}
        >
          <img
            src={isUpdate ? photo || image : image}
            alt=""
            className={cn(
              "h-full w-full rounded-md object-cover",
              customStyles.image,
            )}
          />
          <button
            className={cn(
              "absolute right-3 top-3 rounded-md bg-white/90 p-1.5 text-xl text-red-500",
              customStyles.deleteButton,
            )}
            onClick={clearImage}
            disabled={isUploading}
          >
            <MdDelete />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
