import React from "react";
import { mount } from "enzyme";

import { EmailInput } from "./EmailInput";
import { findByTestAttr } from "../../../test/util";

const defaultProps = {
  isValid: false,
  value: "",
  onSetValue: jest.fn(),
  name: "email"
};

/**
 * Mock a render of component with given props
 * @param {Object} props - React props
 * @param {Function} Component - React functional component
 * @returns {ReactComponent} - Mounted React component
 */
const setup = (props = {}, Component) => {
  const setupProps = { ...defaultProps, ...props };
  return mount(<Component {...setupProps} />);
};

describe("EmailInput functional component", () => {
  describe("if there are missing necessary props", () => {
    beforeEach(() => {
      console.error = jest.fn();
    })
    it("should throw error when `value` is missing", async () => {
      const wrapper = mount(<EmailInput />);
      expect(console.error).toHaveBeenCalled();
      expect(wrapper).toEqual({});
    });
    it("should throw error when `onSetValue` is missing", async () => {
      const wrapper = mount(<EmailInput value="" />);
      expect(console.error).toHaveBeenCalled();
      expect(wrapper).toEqual({});
    });
    it("should throw error when `name` is missing", async () => {
      const wrapper = mount(<EmailInput value="" onSetValue={jest.fn()} />);
      expect(console.error).toHaveBeenCalled();
      expect(wrapper).toEqual({});
    });
  });

  /**
   * Necessary props: `value`, `onSetValue`, `name`
   */
  describe("if there are necessary props", () => {
    it("should render without crashing", () => {
      const wrapper = setup({}, EmailInput);
      const component = findByTestAttr(wrapper, "component-EmailInput");
      expect(component.length).toBe(1);
    });
    describe("if entered mail is invalid", () => {
      let wrapper, component;
      beforeEach(() => {
        wrapper = setup({}, EmailInput);
        component = findByTestAttr(wrapper, "component-EmailInput");
      });
      it("should call `onSetValue` prop function", () => {
        const event = { target: { value: "qwerty" } };
        component.simulate("change", event);
        expect(wrapper.props().onSetValue).toHaveBeenCalled();
      });
      it("should have `Input--invalid` class on dummy value", () => {
        const event = { target: { value: "qwerty@das.das@asd.com" } };
        component.simulate("change", event);
        expect(wrapper.exists(".Input--invalid")).toBe(true);
      });
      it("should have `Input--invalid` class on empty value", () => {
        const event = { target: { value: "" } };
        component.simulate("change", event);
        expect(wrapper.exists(".Input--invalid")).toBe(true);
      });
    });

    describe("if there are `minLength` or `maxLength` props and email appears valid except those rules", () => {
      let wrapper, component;
      const editedProps = {
        minLength: 6,
        maxLength: 30
      };
      beforeEach(() => {
        wrapper = setup(editedProps, EmailInput);
        component = findByTestAttr(wrapper, "component-EmailInput");
      });
      it("should have `Input--invalid` class if it does not match `minLength`", () => {
        component.simulate("change", { target: { value: "a@a.c" } });
        expect(wrapper.exists(".Input--invalid")).toBe(true);
      });
      it("should have `Input--invalid` class if it does not match `maxLength`", () => {
        component.simulate("change", { target: { value: "adsadawe_43_ewqqcdsfqwes@adsaedsafvsfsd.com.en" } });
        expect(wrapper.exists(".Input--invalid")).toBe(true);
      });
    });

    describe("if entered email is valid", () => {
      let wrapper, component;
      const editedProps = { value: "asd@qwe.com.en", isValid: true, minLength: 6 };
      beforeEach(() => {
        wrapper = setup(editedProps, EmailInput);
        component = findByTestAttr(wrapper, "component-EmailInput");
      });
      it("input `value` should be equal to `prop.value` and isValid true", () => {
        expect(component.props().value).toBe("asd@qwe.com.en");
        expect(wrapper.props().isValid).toBe(true);
      });
      it("should have `Input--valid` class", () => {
        component.simulate("change", { target: { value: "asd@qwe.com.en" } });
        expect(wrapper.exists(".Input--valid")).toBe(true);
      });
    });
  });
});
