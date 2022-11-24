/*
 * jest-dom adds custom jest matchers for asserting on DOM nodes.
 * allows you to do things like:
 * expect(element).toHaveTextContent(/react/i)
 * learn more: https://github.com/testing-library/jest-dom
 * */
import "@testing-library/jest-dom/extend-expect";

/*
 * With this solution if you get error like TypeError: window.matchMedia is not a function
 * then solve by this way. add those line to your setupTests.ts file.
 * Original solution link https://stackoverflow.com/a/64872224/5404861
 * */
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
