import Image from "next/image";
import ImageShimmer from "@components/global/shimmers";
import { useState } from "react";

/**
 * Props for the ShimmerImage component.
 */
interface IProps {
  src: any;
  alt: any;
  width: number;
  height: number;
  className: string;
  figClassName?: string;
  blurEffect?: boolean;
  priority?: boolean;
  fill?: any;
  borderRadius?: string;
}

/**
 * Component that displays an Image with a shimmer loading effect until the image is fully loaded.
 *
 * @param {IProps} props - The props for the ShimmerImage component.
 * @returns {JSX.Element} The rendered ShimmerImage component.
 */
const ShimmerImage: React.FC<IProps> = ({
  alt,
  ...rest
}: IProps): JSX.Element => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <ImageShimmer
        show={!imageLoaded}
        className={rest.className}
        height={rest.height}
        borderRadius={rest.borderRadius}
        width={rest.width}
      />
      <Image
        {...rest}
        onLoadingComplete={() => setImageLoaded(true)}
        // onError={() => setImageLoaded(true)}
        className={`overflow-hidden transition-all duration-[0.3s] ease-in-out
          ${!imageLoaded ? "blur-xl grayscale" : "blur-0 grayscale-0"} ${
          rest.className
        }`}
        style={{
          visibility: imageLoaded ? "visible" : "hidden",
          position: imageLoaded ? "relative" : "absolute",
        }}
        alt={alt}
      />
    </>
  );
};

export default ShimmerImage;
