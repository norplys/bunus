import toast from "react-hot-toast";
export default function imageValidator(
  imageFile: any,
  setImage: any,
  image: any,
  reset: any,
) {
  if (!imageFile?.length) {
    setImage(null);
    return;
  }
  if (imageFile[0].type.split("/")[0] !== "image") {
    reset({ image: null });
    toast.error("File harus berupa gambar!");
    return;
  }
  const imageUrl = URL.createObjectURL(imageFile[0]);
  if (imageUrl !== image) {
    setImage(imageUrl);
  }
  return () => URL.revokeObjectURL(imageFile);
}
