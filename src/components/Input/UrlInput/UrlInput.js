import React, { useState } from "react";
import classes from "../Input.module.scss";

import { classesHandler } from "../util/util";

/**
 * @param {Object} props
 * must have `String`: `value`, `Function`: `onSetValue`, `String`: `name` props
 * can have `Boolean`: `required`, `Number`: `minLength`, `Number`: `maxLength`, `String`: `placeholder` props
 */
export const UrlInput = props => {
  const [inputClasses, setClasses] = useState([classes.Input]);
  // Throws error if any of the necessary props are missing
  try {
    if (typeof props.value !== "string") {
      throw Error(
        "UrlInput component expects a `String` type prop called `value`"
      );
    }
    if (typeof props.onSetValue !== "function") {
      throw Error(
        "UrlInput component expects a `Function` type prop called `onSetValue`"
      );
    }
    if (typeof props.name !== "string") {
      throw Error(
        "UrlInput component expects a `String` type prop called `name`"
      );
    }
  } catch (e) {
    console.error(e);
    return null;
  }

  /**
   * Does necessary calculations upon onChange event on input
   * @param {Object} event from onChange event of input
   * @returns {void} - does 2 function calls, 1 on `onSetValue` function prop another on `classesHandler`
   */
  const onChangeHandler = event => {
    const { value } = event.target;
    const isValid = isValidUrl(value, {
      minLength: props.minLength,
      maxLength: props.maxLength
    });
    props.onSetValue({ value, isValid });
    classesHandler(isValid, classes, setClasses);
  };

  /**
   * Checks whether input email is valid or not
   * @param {String} currentValue current email input value
   * @returns {Boolean} - whether it's a valid email or not
   */
  const isValidUrl = (currentValue, { minLength, maxLength }) => {
    if (!currentValue) return false;
    if (minLength && !isNaN(minLength) && currentValue.length < minLength)
      return false;
    const ignoreList = ["http://", "https://", "www."];
    let copiedValue = currentValue;
    ignoreList.forEach(e => {
      copiedValue = copiedValue.replace(e, "");
    });
    // split domain and extention
    const initialSplit = copiedValue.split(".");
    // equivalent to initialSplit[0] && initialSplit[1]
    // but does not assign string value as error but converts to boolean instead
    return !(!initialSplit[0] || !initialSplit[1]);
  };

  return (
    <input
      className={inputClasses.join(" ")}
      value={props.value}
      onChange={onChangeHandler}
      type="email"
      data-test="component-UrlInput"
      name={props.name}
      required={props.required}
      placeholder={props.placeholder}
    />
  );
};
