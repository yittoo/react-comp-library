import React from "react";
import { mount } from "enzyme";

import { PhoneInput } from "./PhoneInput";
import { findByTestAttr } from "../../../test/util";

const defaultProps = {
  isValid: false,
  value: "",
  onSetValue: jest.fn(),
  name: "phone"
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

describe("PhoneInput functional component", () => {
  describe("if there are missing necessary props", () => {
    beforeEach(() => {
      console.error = jest.fn();
    })
    it("should throw error when `value` is missing", async () => {
      const wrapper = mount(<PhoneInput />);
      expect(console.error).toHaveBeenCalled();
      expect(wrapper).toEqual({});
    });
    it("should throw error when `onSetValue` is missing", async () => {
      const wrapper = mount(<PhoneInput value="" />);
      expect(console.error).toHaveBeenCalled();
      expect(wrapper).toEqual({});
    });
    it("should throw error when `name` is missing", async () => {
      const wrapper = mount(<PhoneInput value="" onSetValue={jest.fn()} />);
      expect(console.error).toHaveBeenCalled();
      expect(wrapper).toEqual({});
    });
  });

  /**
   * Necessary props: `value`, `onSetValue`, `name`
   */
  describe("if there are necessary props", () => {
    it("should render without crashing", () => {
      const wrapper = setup({}, PhoneInput);
      const component = findByTestAttr(wrapper, "component-PhoneInput");
      expect(component.length).toBe(1);
    });
    describe("if entered phone is invalid", () => {
      let wrapper, component;
      beforeEach(() => {
        wrapper = setup({}, PhoneInput);
        component = findByTestAttr(wrapper, "component-PhoneInput");
      });
      it("should call `onSetValue` prop function", () => {
        const event = { target: { value: "433424dsa" } };
        component.simulate("change", event);
        expect(wrapper.props().onSetValue).toHaveBeenCalled();
      });
      it("should have `Input--invalid` class on dummy value", () => {
        const event = { target: { value: "433424dsa" } };
        component.simulate("change", event);
        expect(wrapper.exists(".Input--invalid")).toBe(true);
      });
      it("should have `Input--invalid` class on empty value", () => {
        const event = { target: { value: "" } };
        component.simulate("change", event);
        expect(wrapper.exists(".Input--invalid")).toBe(true);
      });
    });

    describe("if there are `minLength` or `maxLength` props and phone appears valid except those rules", () => {
      let wrapper, component;
      const editedProps = {
        minLength: 10,
        maxLength: 10
      };
      beforeEach(() => {
        wrapper = setup(editedProps, PhoneInput);
        component = findByTestAttr(wrapper, "component-PhoneInput");
      });
      it("should have `Input--invalid` class if it does not match `minLength`", () => {
        component.simulate("change", { target: { value: "532423" } });
        expect(wrapper.exists(".Input--invalid")).toBe(true);
      });
      it("should have `Input--invalid` class if it does not match `maxLength`", () => {
        component.simulate("change", { target: { value: "4234567543801" } });
        expect(wrapper.exists(".Input--invalid")).toBe(true);
      });
    });

    describe("if entered phone is valid", () => {
      let wrapper, component;
      const editedProps = { value: "4392104835", isValid: true, minLength: 10, maxLength: 10 };
      beforeEach(() => {
        wrapper = setup(editedProps, PhoneInput);
        component = findByTestAttr(wrapper, "component-PhoneInput");
      });
      it("input `value` should be equal to `prop.value` and isValid true", () => {
        expect(component.props().value).toBe("4392104835");
        expect(wrapper.props().isValid).toBe(true);
      });
      it("should have `Input--valid` class", () => {
        component.simulate("change", { target: { value: "4392104835" } });
        expect(wrapper.exists(".Input--valid")).toBe(true);
      });
    });
  });
});
