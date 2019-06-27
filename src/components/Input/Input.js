import React, { useState } from "react";
import classes from "./Input.module.scss";

const Input = () => {
  return <input className={classes.Input} data-test="component-Input" />;
};

export default Input;

export { EmailInput } from "./EmailInput/EmailInput";
export { PhoneInput } from "./PhoneInput/PhoneInput";
