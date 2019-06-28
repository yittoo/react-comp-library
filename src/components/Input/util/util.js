/**
   * Assigns class to input field accordingly
   * @param {Boolean} isValid if input field is valid or not
   * @param {Object} classesModule variable obtained from name.module.scss
   * @param {Function} setState setState function to be evoked depending on outcome
   * @returns {void} does function call on `setClasses` hook setState function
   */
export const classesHandler = (isValid, classesModule, setState) => {
  if (!isValid) {
    setState([classesModule.Input, classesModule["Input--invalid"]]);
  } else {
    setState([classesModule.Input, classesModule["Input--valid"]]);
  }
};