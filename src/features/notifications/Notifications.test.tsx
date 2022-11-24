import ReactDom, { createPortal } from "react-dom";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";

describe("MyComponent", () => {
  beforeAll(() => {
    createPortal(
      <div>hello</div>,
      document.getElementById("notifications") as Element | DocumentFragment
    );
  });

  afterEach(() => {
    createPortal.mockClear();
  });

  it("should render correctly", () => {
    const component = renderer.create(<div>Hello World!</div>);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
