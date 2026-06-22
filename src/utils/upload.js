import axios from "axios";

export const uploadToImgBB = async (file) => {
  const apiKey = import.meta.env.VITE_IMGBB_KEY;
  if (!apiKey) {
    throw new Error("ImgBB API key is not configured. Set VITE_IMGBB_KEY in your .env file.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData
  );

  if (!data.success) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.data.url;
};
