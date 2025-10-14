export const uploadToImgbb = async (base64Image) => {
  const formData = new FormData();
  formData.append("key", process.env.IMGBB_API_KEY);
  formData.append("image", base64Image.split(",")[1]); // remove header

  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (data.success) return data.data.url;
  throw new Error("Failed to upload image");
};

export const uploadMultiple = async (base64Images) => {
  const urls = [];
  for (const img of base64Images) {
    const url = await uploadToImgbb(img);
    urls.push(url);
  }
  return urls;
};
