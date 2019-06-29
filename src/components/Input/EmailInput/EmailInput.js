import React, { useState } from "react";
import classes from "../Input.module.scss";

import { classesHandler } from "../util/util";

/**
 * @param {Object} props
 * must have `String`: `value`, `Function`: `onSetValue`, `String`: `name` props
 * can have `Boolean`: `required`, `Number`: `minLength`, `Number`: `maxLength`, `String`: `placeholder` props
 */
export const EmailInput = props => {
  const [inputClasses, setClasses] = useState([classes.Input]);
  // Throws error if any of the necessary props are missing
  try {
    if (typeof props.value !== "string") {
      throw Error(
        "EmailInput component expects a `String` type prop called `value`"
      );
    }
    if (typeof props.onSetValue !== "function") {
      throw Error(
        "EmailInput component expects a `Function` type prop called `onSetValue`"
      );
    }
    if (typeof props.name !== "string") {
      throw Error(
        "EmailInput component expects a `String` type prop called `name`"
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
    const isValid = isValidEmail(value, {
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
  const isValidEmail = (currentValue, { minLength, maxLength }) => {
    if (!currentValue) return false;
    if (minLength && !isNaN(minLength) && currentValue.length < minLength)
      return false;
    if (maxLength && !isNaN(maxLength) && currentValue.length > maxLength)
      return false;
    // split identifier and domain+extention
    const initialSplit = currentValue.split("@");
    // make sure there is only one `@`
    if (initialSplit[1] && initialSplit.length === 2) {
      // split domain and extention
      const secondarySplit = initialSplit[1].split(".");
      // equivalent to initialSplit[0] && secondarySplit[0] && secondarySplit[1]
      // but does not assign string value as error but converts to boolean instead
      return !(!initialSplit[0] || !secondarySplit[0] || !secondarySplit[1]);
    } else {
      return false;
    }
  };

  return (
    <input
      className={inputClasses.join(" ")}
      value={props.value}
      onChange={onChangeHandler}
      type="email"
      data-test="component-EmailInput"
      name={props.name}
      required={props.required}
      placeholder={props.placeholder}
    />
  );
};
