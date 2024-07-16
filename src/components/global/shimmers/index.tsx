import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

/**
 * Props for the ImageShimmer component.
 */
interface IProps {
  height: number;
  width: number;
  borderRadius?: string;
  forceDimensions?: boolean;
  show?: boolean;
  className?: string;
}

/**
 * Component that displays a skeleton loading animation for images.
 *
 * @param {IProps} props - The props for the ImageShimmer component.
 * @returns {JSX.Element | null} The rendered ImageShimmer component or null if `show` prop is false.
 */
const ImageShimmer: React.FC<IProps> = ({
  height,
  width,
  borderRadius,
  forceDimensions = false,
  show = true,
  className,
}: IProps): JSX.Element | null => {
  if (!show) return null;

  return (
    <>
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#ffffff">
        <Skeleton
          containerClassName={`flex ${className}`}
          className="!h-full !w-full rounded-2xl object-cover"
          height={height}
          width={width}
          inline={true}
          style={{ borderRadius: borderRadius ?? "12px" }}
        />
      </SkeletonTheme>
    </>
  );
};

export default ImageShimmer;
