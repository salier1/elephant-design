import React from "react";
import classNames from "classnames";
export type ButtonSize = "lg" | "sm" | "md";
export type ButtonType = "primary" | "default" | "danger" | "link";

export interface BaseButtonProps {
  /**
   * button onClick
   */
  onClick?: (e: any) => void;
  /**
   * button classes
   */
  className?: string;
  /**
   * is the button disabled?
   */
  disabled?: boolean;
  /**
   * How large should the button be?
   */
  size?: ButtonSize;
  /**
   * What type should the button be?
   */
  btnType?: ButtonType;
  children?: React.ReactNode;
  /**
   * what should the link redirect?
   */
  href?: string;
}

// type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
// type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
// export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<BaseButtonProps> = ({ btnType = "default", size = "md", disabled = false, className, children, href, onClick, ...restProps }) => {
  const handleClick = (e: any) => {
    if (onClick) onClick(e);
  };

  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps} onClick={(e) => handleClick(e)}>
        {children}
      </button>
    );
  }
};
