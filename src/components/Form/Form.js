import React, { Component } from "react";
import { EmailInput, PhoneInput, UrlInput } from "../Input/Input";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: "",
        isValid: false,
        type: "email",
        placeholder: "E-mail address",
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
        placeholder: "Phone Number",
        rules: {
          required: true
        }
      },
      url: {
        value: "",
        isValid: false,
        type: "url",
        placeholder: "Website",
        rules: {
          required: true
        }
      }
    };
  }

  /**
   * AJAX post request with current state of form to given url
   * @param {Object} event - event data generated from form itself
   * @param {Object} currentState - current state of form
   * @returns {void} - does a post request to given url
   */
  onSubmitHandler = (event, currentState, url) => {
    event.preventDefault();
    const formData = new FormData();
    for (let name in currentState) {
      formData.append(name, currentState[name].value);
    }
    axios.post(url, formData);
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
        placeholder: fieldData.placeholder,
        required: rules.required,
        minLength: rules.minLength,
        maxLength: rules.maxLength,
        onSetValue: payload => this.onChangedHandler(payload, name),
        name: name,
        key: name
      };
      switch (currentState[name].type) {
        case "email":
          return <EmailInput {...defaultProps} data-test="email-input" />;
        case "phone":
          return (
            <PhoneInput
              {...defaultProps}
              minLength={rules.minLength || 10}
              maxLength={rules.maxLength || 10}
              data-test="phone-input"
            />
          );
        case "url":
          return (
            <UrlInput
              {...defaultProps}
              maxLength={null}
              data-test="url-input"
            />
          );
        default:
          return null;
      }
    });
  };

  render() {
    const InputsToRender = this.manageInputsToRender(this.state);
    return (
      <form
        onSubmit={event =>
          this.onSubmitHandler(event, this.state, "someurl.com")
        }
        data-test="component-Form"
      >
        {InputsToRender}
      </form>
    );
  }
}

export default Form;
