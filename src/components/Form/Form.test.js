import React from "react";
import { mount, shallow } from "enzyme";
import axios from "axios";

import Form from "./Form";
import { findByTestAttr } from "../../test/util";

const defaultProps = {};

/**
 * Mock a render of component with given props
 * @param {Object} props - React props
 * @param {Function} Component - React class component
 * @returns {ReactComponent} - Mounted React component
 */
const setup = (props = {}, Component) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Component {...setupProps} />);
};

describe("Input functional component", () => {
  let wrapper, component;
  beforeEach(() => {
    wrapper = setup({}, Form);
    component = findByTestAttr(wrapper, "component-Form");
  });

  it("should render without error", () => {
    expect(component.length).toBe(1);
  });

  it('should call `onSubmitHandler` function onSubmit', () => {
    wrapper.instance().onSubmitHandler = jest.fn();
    component.simulate("submit");
    expect(wrapper.instance().onSubmitHandler).toHaveBeenCalled();
  })
  
  describe("manageInputsToRender function", () => {
    let wrapper, component;
    beforeEach(() => {
      wrapper = setup({}, Form);
      component = findByTestAttr(wrapper, "component-Form");
    });

    it("should render email input if state has it", () => {
      const state = {
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
      wrapper.setState(state);
      const EmailInput = findByTestAttr(wrapper, "email-input");
      expect(EmailInput.length).toBe(1);
    });
    it("should render phone input if state has it", () => {
      const state = {
        phone: {
          value: "",
          isValid: false,
          type: "phone",
          rules: {
            required: true
          }
        }
      };
      wrapper.setState(state);
      const PhoneInput = findByTestAttr(wrapper, "phone-input");
      expect(PhoneInput.length).toBe(1);
    });
    it("should render url input if state has it", () => {
      const state = {
        url: {
          value: "",
          isValid: false,
          type: "url",
          rules: {
            required: true
          }
        }
      };
      wrapper.setState(state);
      const UrlInput = findByTestAttr(wrapper, "url-input");
      expect(UrlInput.length).toBe(1);
    });
    it("should render nothing if state has invalid type input", () => {
      const state = {
        somethingRandom: {
          value: "",
          isValid: false,
          type: "invalidType",
          rules: {
            required: true,
            minLength: 6,
            maxLength: 30
          }
        }
      };
      wrapper.setState(state);
      const InvalidTypeInput = findByTestAttr(wrapper, "invalidType-input");
      expect(InvalidTypeInput.length).toBe(0);
    });
  });

  describe("onChangedHandler function", () => {
    let wrapper;
    const state = {
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
    beforeEach(() => {
      wrapper = mount(<Form {...defaultProps} />);
      wrapper.setState(state);
    });
    afterEach(() => {
      wrapper.unmount();
    })
    it("should be called once there is change event on input", () => {
      const spy = jest.spyOn(wrapper.instance(), "onChangedHandler");
      /**
       * expectation is once `manageInputsToRender` function is called there will be a prop
       * called onSetValue that is assigned to each child component
       * that will call `onChangedHandler` function once evoked
       */
      wrapper
        .instance()
        .manageInputsToRender(wrapper.state())[0]
        .props.onSetValue("something");
      expect(spy).toHaveBeenCalled();
    });

    it("should setState accordingly to given values", () => {
      const payload = { value: "somevalue", isValid: false };
      wrapper.instance().onChangedHandler(payload, "email");
      const newState = { ...state.email, ...payload };
      expect(wrapper.state("email")).toEqual(newState);
    });
  });
  describe("onSubmitHandler function", () => {
    let wrapper;
    const state = {
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
      }
    };
    beforeEach(() => {
      wrapper = mount(<Form {...defaultProps} />);
      wrapper.setState(state);
    });
    afterEach(() => {
      wrapper.unmount();
    })
    it("should call preventDefault, generate `formData` and make post request with it", () => {
      const expectedFormData = new FormData();
      const url = "mockurl";
      for (let name in state) {
        expectedFormData.append(name, state[name].value);
      }
      const event = { preventDefault: jest.fn() };
      axios.post = jest.fn();
      wrapper.instance().onSubmitHandler(event, state, url);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalledWith(url, expectedFormData);
    });
  });
});
