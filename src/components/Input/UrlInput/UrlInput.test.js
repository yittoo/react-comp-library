import React from "react";
import { mount } from "enzyme";

import { UrlInput } from "./UrlInput";
import { findByTestAttr } from "../../../test/util";

const defaultProps = {
  isValid: false,
  value: "",
  onSetValue: jest.fn(),
  name: "url"
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

describe("UrlInput functional component", () => {
  describe("if there are missing necessary props", () => {
    beforeEach(() => {
      console.error = jest.fn();
    });
    it("should throw error when `value` is missing", async () => {
      const wrapper = mount(<UrlInput />);
      expect(console.error).toHaveBeenCalled();
      expect(wrapper).toEqual({});
      wrapper.unmount();
    });
    it("should throw error when `onSetValue` is missing", async () => {
      const wrapper = mount(<UrlInput value="" />);
      expect(console.error).toHaveBeenCalled();
      expect(wrapper).toEqual({});
      wrapper.unmount();
    });
    it("should throw error when `name` is missing", async () => {
      const wrapper = mount(<UrlInput value="" onSetValue={jest.fn()} />);
      expect(console.error).toHaveBeenCalled();
      expect(wrapper).toEqual({});
      wrapper.unmount();
    });
  });

  /**
   * Necessary props: `value`, `onSetValue`, `name`
   */
  describe("if there are necessary props", () => {
    it("should render without crashing", () => {
      const wrapper = setup({}, UrlInput);
      const component = findByTestAttr(wrapper, "component-UrlInput");
      expect(component.length).toBe(1);
      wrapper.unmount();
    });
    describe("if entered url is invalid", () => {
      let wrapper, component;
      beforeEach(() => {
        wrapper = setup({}, UrlInput);
        component = findByTestAttr(wrapper, "component-UrlInput");
      });
      afterEach(() => {
        wrapper.unmount();
      });
      it("should call `onSetValue` prop function", () => {
        const event = { target: { value: "google.com" } };
        component.simulate("change", event);
        expect(wrapper.props().onSetValue).toHaveBeenLastCalledWith({
          value: event.target.value,
          isValid: true
        });
      });
      it("should have `Input--invalid` class on dummy value", () => {
        const event = { target: { value: "https://google" } };
        component.simulate("change", event);
        expect(wrapper.exists(".Input--invalid")).toBe(true);
      });
      it("should have `Input--invalid` class on empty value", () => {
        const event = { target: { value: "" } };
        component.simulate("change", event);
        expect(wrapper.exists(".Input--invalid")).toBe(true);
      });
    });

    describe("if there are `minLength` or `maxLength` props and url appears valid except those rules", () => {
      let wrapper, component;
      const editedProps = {
        minLength: 6
      };
      beforeEach(() => {
        wrapper = setup(editedProps, UrlInput);
        component = findByTestAttr(wrapper, "component-UrlInput");
      });
      afterEach(() => {
        wrapper.unmount();
      });
      it("should have `Input--invalid` class if it does not match `minLength`", () => {
        component.simulate("change", { target: { value: "aa.c" } });
        expect(wrapper.exists(".Input--invalid")).toBe(true);
      });
      it("should have `Input--invalid` class if it does not match `maxLength`", () => {
        component.simulate("change", {
          target: { value: "adsadawe_43_ewqqcdsfqwes@adsaedsafvsfsd" }
        });
        expect(wrapper.exists(".Input--invalid")).toBe(true);
      });
    });

    describe("if entered url is valid", () => {
      let wrapper, component;
      const editedProps = {
        value: "http://google.com",
        isValid: true,
        minLength: 6
      };
      beforeEach(() => {
        wrapper = setup(editedProps, UrlInput);
        component = findByTestAttr(wrapper, "component-UrlInput");
      });
      afterEach(() => {
        wrapper.unmount();
      });
      it("input `value` should be equal to `prop.value` and isValid true", () => {
        expect(component.props().value).toBe("http://google.com");
        expect(wrapper.props().isValid).toBe(true);
      });
      it("should have `Input--valid` class", () => {
        component.simulate("change", {
          target: { value: "http://google.com" }
        });
        expect(wrapper.exists(".Input--valid")).toBe(true);
      });
    });
  });
});
