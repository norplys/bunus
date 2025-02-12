"use client";

import { useState } from "react";
import clsx from "clsx";
import Image, { type ImageProps } from "next/image";

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  ...rest
}: ImageProps): JSX.Element {
  const [loading, setLoading] = useState(true);

  const handleCompleteLoad = () => setLoading(false);

  return (
    <Image
      className={clsx(className, loading && "animate-pulse bg-muted")}
      src={src}
      alt={alt}
      width={width}
      height={height}
      onLoad={handleCompleteLoad}
      {...rest}
    />
  );
}
