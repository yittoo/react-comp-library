import React from 'react'
import { mount } from "enzyme";

import Input from "./Input";
import { findByTestAttr } from "../../test/util";

const defaultProps = {};
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

it('should render', () => {
  const wrapper = setup(null, Input);
  const component = findByTestAttr(wrapper, "component-Input");
  expect(component.length).toBe(1)
})
