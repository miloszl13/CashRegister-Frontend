import { fireEvent, getByRole, getByTestId, queryByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MealItemForm from "./MealItemForm";
import store from "../../../store/index";
import { Provider } from "react-redux";
import { AuthContextProvider } from "../../../store/auth-context";

const mockedAddToCart = jest.fn();
const mockedDeleteProduct = jest.fn();



const MealItemFormMock = () => {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <MealItemForm
          id={1}
          onAddToCart={mockedAddToCart}
          onDelete={mockedDeleteProduct}
        />
        ;
      </Provider>
    </AuthContextProvider>
  );
};

describe("MealItemForm render", () => {
  it("Should render meal item form", () => {
    render(<MealItemFormMock/>);
    const mealitemForm=screen.getByTestId('mealItemForm');
    expect(mealitemForm).toBeInTheDocument()
  });
});
