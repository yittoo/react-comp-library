import React, { useState } from "react";
import classes from "../Input.module.scss";

import { classesHandler } from "../util/util";

/**
 * @param {Object} props
 * must have `value`, `onSetValue`, `name` props
 * can have `Boolean`: `required`, `Number`: `minLength`, `Number`: `maxLength`, `String`: `placeholder` props
 */
export const PhoneInput = props => {
  const [inputClasses, setClasses] = useState([classes.Input]);
  // Throws error if any of the necessary props are missing
  try {
    if (typeof props.value !== "string") {
      throw Error(
        "PhoneInput component expects a `String` type prop called `value`"
      );
    }
    if (typeof props.onSetValue !== "function") {
      throw Error(
        "PhoneInput component expects a `Function` type prop called `onSetValue`"
      );
    }
    if (typeof props.name !== "string") {
      throw Error(
        "PhoneInput component expects a `String` type prop called `name`"
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
    const isValid = isValidPhone(value, {
      minLength: props.minLength,
      maxLength: props.maxLength
    });
    props.onSetValue({ value, isValid });
    classesHandler(isValid, classes, setClasses);
  };

  // /**
  //  * Assigns class to input field accordingly
  //  * @param {Boolean} isValid if input field is valid or not
  //  * @returns {void} does function call on `setClasses` hook setState function
  //  */
  // const classesHandler = isValid => {
  //   if (!isValid) {
  //     setClasses([classes.Input, classes["Input--invalid"]]);
  //   } else {
  //     setClasses([classes.Input, classes["Input--valid"]]);
  //   }
  // };

  /**
   * Checks whether input email is valid or not
   * @param {String} currentValue current email input value
   * @returns {Boolean} - whether it's a valid email or not
   */
  const isValidPhone = (currentValue, { minLength, maxLength }) => {
    if (!currentValue || isNaN(Number(currentValue))) return false;
    if (minLength && !isNaN(minLength) && currentValue.length < minLength)
      return false;
    if (maxLength && !isNaN(maxLength) && currentValue.length > maxLength)
      return false;

    return true;
  };

  return (
    <input
      className={inputClasses.join(" ")}
      value={props.value}
      onChange={onChangeHandler}
      type="text"
      data-test="component-PhoneInput"
      name={props.name}
      required={props.required}
      placeholder={props.placeholder}
    />
  );
};
