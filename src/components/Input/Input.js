import React, { useState } from "react";
import classes from "./Input.module.scss";

const Input = () => {
  return <input className={classes.Input} />;
};

export default Input;

/**
 * @param {Object} props
 * must have `isValid`, `value`, `onSetValue`, `name` props
 */
export const EmailInput = props => {
  const [touched, setTouched] = useState(false);
  const [inputClasses, setClasses] = useState([classes.Input]);

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
    if (typeof props.isValid !== "boolean") {
      throw Error(
        "EmailInput component expects a `Boolean` type prop called `isValid`"
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
  
 
  const onChangeHandler = event => {
    if (!touched) setTouched(true);
    const { value } = event.target;
    const isValid = isValidEmail(value);
    props.onSetValue({ value, isValid });

    if (touched && !isValid) {
      setClasses([classes.Input, classes["Input--invalid"]]);
    } else if (isValid) {
      setClasses([classes.Input, classes["Input--valid"]]);
    }
  };

  const isValidEmail = currentValue => {
    if (!currentValue) return false;
    // split identifier and domain+extention
    const initialSplit = currentValue.split("@");
    if (initialSplit[1]) {
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
    />
  );
};

