import axios from "axios";

export default async function imageUpload(imageData) {
     const formData = new FormData();
      formData.append("image", imageData);
  const data = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
    formData
  );

  return data;
}
