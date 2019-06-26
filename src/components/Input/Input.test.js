import React from "react";
import { mount } from "enzyme";

import { EmailInput } from "./Input";
import { findByTestAttr } from "../../test/util";

const defaultProps = {
  isValid: false,
  value: "",
  onSetValue: function() {},
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
  describe("if there are no props", () => {
    it("should throw error and return empty object", async () => {
      console.error = jest.fn();
      const wrapper = mount(<EmailInput />);

      expect(wrapper).toEqual({});
      expect(console.error).toHaveBeenCalled();
    });
  });

  /**
   * Necessary props: `isValid`, `value`, `onSetValue`, `name`
   */
  describe("if there are necessary props", () => {
    let wrapper, component;

    beforeEach(() => {
      wrapper = setup({}, EmailInput);
      component = findByTestAttr(wrapper, "component-EmailInput");
    });

    it("should render without crashing", () => {
      expect(component.length).toBe(1);
    });
    it("should change value on onChange", () => {
      const event = { target: { value: "hello" } };
      component.simulate("change", event);
      // component.props().onChange(event);
      component.update();
      // console.log(component.debug())
      // expect(component.state()).toBe(event.target.value);
      // expect(setState).toHaveBeenCalledWith(1);
    });
  });
});
