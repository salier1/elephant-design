import React, { useState } from "react";
import classNames from "classnames";
// import Transition from "../Transition";
export type AlertType = "success" | "default" | "warning" | "danger";
interface BaseAlertProps {
  type?: AlertType;
  title: string;
  closeable?: boolean;
  className?: string;
  description?: string;
  onClose?: () => void;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const [hide, setHide] = useState(false);
  const { type = "default", title, closeable = true, className, description, onClose, ...restProps } = props;
  const classes = classNames("alt", className, {
    [`alt-${type}`]: type,
  });
  const titleClasses = classNames("alt-title", className, {
    "bold-title": description,
  });
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose();
    }
    setHide(true);
  };
  return (
    // <Transition in={!hide} timeout={300} animation="zoom-in-top">
    <div className={classes} {...restProps}>
      <span className={titleClasses}>{title}</span>
      {closeable && (
        <span className="alt-close" onClick={handleClose}>
          X
        </span>
      )}
      {description && <p className="alt-desc">{description}</p>}
    </div>
    // </Transition>
  );
};

export default Alert;
