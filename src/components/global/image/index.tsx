import React from "react";
import Image from "next/image";

/**
 * Props for the ImageComponent.
 */
interface IProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
  figClassName?: string;
  alt?: string;
  blurEffect?: boolean;
  priority?: boolean;
  fill?: boolean;
}

/**
 * ImageComponent renders an image with optional styling and effects.
 *
 * @param {IProps} props - The props for the ImageComponent.
 * @returns {JSX.Element} The rendered ImageComponent.
 */
const ImageComponent: React.FC<IProps> = ({
  src,
  width,
  height,
  className,
  figClassName,
  alt,
  blurEffect,
  priority,
  fill,
  ...rest
}: IProps): JSX.Element => {
  return (
    <figure className={`leading-0 relative ${figClassName || ""}`}>
      <Image
        src={src}
        fill={fill}
        width={width}
        height={height}
        className={className}
        placeholder={blurEffect ? "blur" : "empty"}
        blurDataURL={`/_next/image?url=${src}&w=16&q=1`}
        alt={alt || "Image"}
        priority={priority}
        {...rest}
      />
    </figure>
  );
};

export default ImageComponent;
