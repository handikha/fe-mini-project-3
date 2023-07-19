import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Button(props) {
  const className = [props.className];
  props.isButton && className.push("px-8 py-2 rounded-lg ");

  props.isSmall && className.push("px-2 py-1 rounded-md ");

  props.isPrimary &&
    className.push("bg-primary hover:bg-green-700 text-white duration-300");

  props.isDanger &&
    className.push("bg-red-500 hover:bg-red-600 text-white duration-300");

  props.isSecondary &&
    className.push("bg-light-gray hover:bg-gray text-white duration-300");

  props.isBLock && className.push("w-full");

  const onClick = () => {
    props.onClick && props.onClick();
  };

  if (props.isLink) {
    return (
      <Link to={props.path} className={className.join(" ")} onClick={onClick}>
        {props.title ? props.title : props.children}
      </Link>
    );
  }

  return (
    <button
      className={className.join(" ")}
      type={props.type}
      onClick={onClick}
      disabled={props.isLoading}
    >
      {props.isLoading ? (
        <div className="block h-6 w-6 animate-spin rounded-full border-[3px] border-r-transparent">
          <span className="sr-only">Loading...</span>
        </div>
      ) : props.title ? (
        props.title
      ) : (
        props.children
      )}
    </button>
  );
}

Button.propTypes = {
  type: propTypes.oneOf(["button", "link", "submit"]),
  onClick: propTypes.func,
  path: propTypes.string,
  title: propTypes.string,
  className: propTypes.string,
  isDisabled: propTypes.bool,
  isLoading: propTypes.bool,
  isBLock: propTypes.bool,
  hasShadow: propTypes.bool,
  isButton: propTypes.bool,
  isSmall: propTypes.bool,
  isPrimary: propTypes.bool,
  isDanger: propTypes.bool,
  isSecondary: propTypes.bool,
  isLink: propTypes.bool,
};
