import Image from "next/image";

export default function LoadingImage() {
  return (
    <Image
      src="/loadingAnimation.gif"
      width={100}
      height={1}
      alt="loading"
      className="w-24 h-6"
    />
  );
}
