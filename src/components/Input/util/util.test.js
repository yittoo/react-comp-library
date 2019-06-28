import { classesHandler } from "./util";

describe("classesHandler utility function", () => {
  const classesModule = {
    Input: "input",
    "Input--invalid": "invalid",
    "Input--valid": "valid"
  };
  let setState;
  beforeEach(() => {
    setState = jest.fn();
  });
  it("should be called with --invalid parameter if `isValid` is false", () => {
    classesHandler(false, classesModule, setState);
    const expectedCall = [classesModule.Input, classesModule["Input--invalid"]];
    expect(setState).toHaveBeenCalledWith(expectedCall);
  });
  it("should be called with --valid parameter if `isValid` is true", () => {
    classesHandler(true, classesModule, setState);
    const expectedCall = [classesModule.Input, classesModule["Input--valid"]];
    expect(setState).toHaveBeenCalledWith(expectedCall);
  });
});
