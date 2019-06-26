import React, { Component } from "react";
import { EmailInput } from "../Input/Input";

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

  render() {
    const InputsToRender = Object.keys(this.state).map(name => {
      const fieldData = { ...this.state[name] };
      const { rules } = fieldData;
      switch (this.state[name].type) {
        case "email":
          return (
            <EmailInput
              value={fieldData.value}
              isValid={fieldData.isValid}
              required={rules.required}
              onSetValue={payload => this.onChangedHandler(payload, name)}
              name={name}
              key={name}
            />
          );
        default:
          return null;
      }
    });

    return <form onSubmit={this.onSubmitHandler}>{InputsToRender}</form>;
  }
}

export default Form;
