import React, { Component } from "react";
import { EmailInput, PhoneInput } from "../Input/Input";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: "",
        isValid: false,
        type: "email",
        rules: {
          required: true,
          minLength: 6,
          maxLength: 30
        }
      },
      phone: {
        value: "",
        isValid: false,
        type: "phone",
        rules: {
          required: true
        }
      }
    };
  }

  onSubmitHandler = event => {
    event.preventDefault();
    const formData = new FormData();
    for (let name in this.state) {
      formData.append(name, this.state[name].value);
    }
    // axios.post(url, formData)
  };

  /**
   * Flexible onChange function for each input field
   * @param {Object} payload - input data to manipulate necessary field
   * @param {String} fieldName - form input name which is equal to it's corresponding space in `FormDetails` state
   */
  onChangedHandler = (payload, fieldName) => {
    this.setState(oldState => {
      return {
        ...oldState,
        [fieldName]: {
          ...oldState[fieldName],
          ...payload
        }
      };
    });
  };

  manageInputsToRender = currentState => {
    return Object.keys(currentState).map(name => {
      const fieldData = { ...currentState[name] };
      const { rules } = fieldData;
      const defaultProps = {
        value: fieldData.value,
        isValid: fieldData.isValid,
        required: rules.required,
        minLength: rules.minLength,
        maxLength: rules.maxLength,
        onSetValue: payload => this.onChangedHandler(payload, name),
        name: name,
        key: name
      };
      switch (currentState[name].type) {
        case "email":
          return <EmailInput {...defaultProps} />;
        case "phone":
          return (
            <PhoneInput
              {...defaultProps}
              minLength={rules.minLength || 10}
              maxLength={rules.maxLength || 10}
            />
          );
        default:
          return null;
      }
    });
  };

  render() {
    const InputsToRender = this.manageInputsToRender(this.state);
    return <form onSubmit={this.onSubmitHandler}>{InputsToRender}</form>;
  }
}

export default Form;
