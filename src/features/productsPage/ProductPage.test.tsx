import React from "react";
import { render } from "@testing-library/react";
import ProductPage from "./ProductPage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useAppDispatch, useAppSelector, appSelector } from "../../app/hooks";

const state = {};
const testUseAppSelector = (f: any) => f(state);

jest.mock("../../app/hooks");

describe("ProductPage", () => {
  beforeEach(() => {
    // appSelector.mockImplementation(testUseAppSelector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;

  function Setup() {
    return <ProductPage />;
  }

  /*it("should render component with redux provider", () => {
    store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <Setup />
      </Provider>
    );

    expect(getByText("Hello World!")).not.toBeNull();
  });*/
});
