export const uploadImage = async (imageFile) => {
  try {
    const ImageData = new FormData();
    ImageData.set("image", imageFile);

    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=96414755e81ac2a7e751fe0575e30c1b",
      {
        method: "POST",
        body: ImageData,
      },
    );

    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
