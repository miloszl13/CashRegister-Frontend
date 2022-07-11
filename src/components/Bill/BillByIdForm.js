import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import Modal from "../UI/Modal";
import classes from "./BillById.module.css";
import useInput from "../../hooks/use-input";
import Notification from "../UI/Notification";

//validation
const isNotEmpty = (value) => value.trim() !== "";

function BillForm(props) {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  //
  const {
    value: billNumberValue,
    isValid: billNumberIsValid,
    hasError: billNumberHasError,
    valueChangeHandler: billNumberChangeHandler,
    inputBlurHandler: billNumberBlurHandler,
    reset: resetbillNumber,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (billNumberIsValid) {
    formIsValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    props.onFilter(billNumberValue);
    dispatch(uiActions.hideBillByIdForm());
    resetbillNumber();
  };

  const clearNotificationHandler = () => {
    dispatch(uiActions.setNotificationToNull());
  };

  const billNumberClasses = billNumberHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <Modal>
      <form data-testid='billbyid' onSubmit={onSubmitHandler} onFocus={clearNotificationHandler}>
        <div className={billNumberClasses}>
          <div>
            <label htmlFor="billNumber">Bill number : </label>
            <input
              id="billNumber"
              type="text"
              value={billNumberValue}
              onChange={billNumberChangeHandler}
              onBlur={billNumberBlurHandler}
            ></input>
            {billNumberHasError && (
              <p className="error-text">Please enter bill number.</p>
            )}
          </div>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </button>
            <button
              type="submit"
              disabled={!formIsValid}
              className={classes.button}
            >
              Get
            </button>
          </div>
        </div>
        <br />
      </form>
      {notification && notification.component === "BillForm" && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </Modal>
  );
}

export default BillForm;
