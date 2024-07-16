import clsx from "clsx";
import { ImSpinner9 } from "react-icons/im";
import { IButtonStyleProps, ISizeStyleProps, IVariantStyleProps } from "@interfaces/button";

/**
 * Base styles for the button.
 */
const baseStyles: IButtonStyleProps = {
  solid: "btn",
  outline: "btn-outline",
};

/**
 * Variant styles for the button.
 */
const variantStyles: IVariantStyleProps = {
  solid: {
    primary: "btn-primary",
    secondary: "btn-secondary",
    success: "btn-success",
    danger: "btn-danger",
    warning: "btn-warning",
    info: "btn-info",
    light: "btn-light",
    dark: "btn-dark",
  },
  outline: {
    primary: "btn-outline-primary",
    secondary: "btn-outline-secondary",
    success: "btn-outline-success",
    danger: "btn-outline-danger",
    warning: "btn-outline-warning",
    info: "btn-outline-info",
    light: "btn-outline-light",
    dark: "btn-outline-dark",
  },
};

/**
 * Size styles for the button.
 */
const sizeStyles: ISizeStyleProps = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

/**
 * Props for the Button component.
 */
interface ButtonProps {
  variant?: keyof typeof baseStyles;
  color?: keyof (typeof variantStyles)["solid"];
  size?: keyof typeof sizeStyles;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  loaderClass?: string;
  [key: string]: any;
}

/**
 * Button component for rendering customizable buttons.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @returns {JSX.Element} The rendered Button component.
 */

/**
 * Button component for rendering a customizable button.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @returns {JSX.Element} The rendered Button component.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  color = "primary",
  size = "md",
  className,
  href,
  type,
  disabled,
  isLoading,
  children,
  loaderClass,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={clsx(
        baseStyles[variant],
        variantStyles[variant][color],
        sizeStyles[size],
        className
      )}
      type={type ? type : "button"}
      disabled={disabled ? true : false}
      {...props}
    >
      {isLoading ? (
        <ImSpinner9 className={clsx("animate-spin text-2xl", loaderClass)} />
      ) : (
        children
      )}
    </button>
  );
};
