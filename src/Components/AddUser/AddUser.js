import React, { useRef, useState } from "react";
import classes from "./AddUser.module.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import ErrorModal from "../UI/ErrorModel/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const enteredNameRef = useRef();
  const enteredAgeRef = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const inputName = enteredNameRef.current.value;
    const inputAge = enteredAgeRef.current.value;
    if (inputName.trim().length === 0 || inputAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+inputAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(inputName, inputAge);
    enteredNameRef.current.value = "";
    enteredAgeRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={enteredNameRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={enteredAgeRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
