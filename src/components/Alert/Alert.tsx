import React, { useState } from "react";
import classNames from "classnames";
import Transition from "../Transition";
import Icon from "../Icon";
export type AlertType = "success" | "default" | "warning" | "danger";
interface BaseAlertProps {
  /**
   * allert type ` "success" | "default" | "warning" | "danger"`
   */
  type?: AlertType;
  /**
   * title
   */
  title: string;
  /**
   * if it is closeable
   */
  closeable?: boolean;
  className?: string;
  /**
   * content
   */
  description?: string;
  /**
   * if it is close able and show the close button
   * @returns void
   */
  onClose?: () => void;
}

const Alert: React.FC<BaseAlertProps> = ({ type = "default", title, closeable = true, className, description, onClose, ...restProps }) => {
  const [hide, setHide] = useState(false);
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
    <Transition in={!hide} timeout={300} animation="zoom-in-top">
      <div className={classes} {...restProps}>
        <div>hahahahah</div>
        <span className={titleClasses}>{title}</span>
        {closeable && (
          <span className="alt-close" onClick={handleClose}>
            <Icon icon="times" />
          </span>
        )}
        {description && <p className="alt-desc">{description}</p>}
      </div>
    </Transition>
  );
};

export default Alert;
