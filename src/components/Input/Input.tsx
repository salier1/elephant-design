import React, { ReactElement, InputHTMLAttributes, ChangeEvent, forwardRef } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /**
   * 是否禁用 Input
   * */
  disabled?: boolean;
  /**
   * 设置 input 大小
   *
   * `"sm" | "md" | "lg"`
   * */
  size?: "sm" | "md" | "lg";
  /**
   * 添加图标，在右侧悬浮添加一个图标，用于提示，接受字符串输入
   * 可用图表名见`https://fontawesome.com/search?s=solid&f=classic&o=r`
   * */
  icon?: IconProp;
  /**
   * 添加前缀 用于配置一些固定组合
   * `string | ReactElement`
   * */
  prepend?: string | ReactElement;
  /**
   * 添加后缀 用于配置一些固定组合
   * `string | ReactElement`
   * */
  append?: string | ReactElement;
  /**
   * on change
   * @param e
   * @returns
   */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'vikingship'
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  const cnames = classNames("input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  // console.log(props.value === restProps.value);

  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    <div className={cnames} style={style}>
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper" data-testid="test-input">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input ref={ref} className="input-inner" disabled={disabled} {...restProps} />
      {append && <div className="input-group-append">{append}</div>}
    </div>
  );
});

export default Input;
