import Image, { type ImageProps } from "next/image";
import { asset } from "@/lib/asset";

type SiteImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

/** next/image wrapper that respects GitHub Pages basePath. */
export function SiteImage({ src, alt, ...props }: SiteImageProps) {
  return <Image src={asset(src)} alt={alt} {...props} />;
}
