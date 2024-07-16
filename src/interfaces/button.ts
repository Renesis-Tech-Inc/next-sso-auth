/**
 * Interface representing button style properties.
 */
export interface IButtonStyleProps {
  solid: string;
  outline: string;
}

/**
 * Interface representing variant style properties.
 */
export interface IVariantStyleProps {
  solid: any;
  outline: any;
}

/**
 * Interface representing size style properties.
 */
export interface ISizeStyleProps {
  sm: string;
  lg: string;
  md: string;
}

/**
 * Interface representing component properties.
 */
export interface IProps {
  /**
   * The variant of the button.
   * @default "solid"
   */
  variant?: "solid" | "outline";

  /**
   * The color of the button.
   */
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";

  /**
   * Additional class names for the button.
   */
  className?: string;

  /**
   * The URL to link to if the button is rendered as an anchor.
   */
  href?: string;

  /**
   * The content of the button.
   */
  children: React.ReactNode;

  /**
   * Additional class names for the loader.
   */
  loaderClass?: string;

  /**
   * The size of the button.
   */
  size?: "sm" | "md" | "lg";

  /**
   * The type of the button.
   * @default "button"
   */
  type?: "button" | "submit" | "reset";

  /**
   * Click handler for the button.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the button is in a loading state.
   */
  isLoading?: boolean;
}
