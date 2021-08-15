import { validateEmail } from "../../utils/helpers";
import React, { useState } from "react";

function SignUpForm() {
  const [userFormData, setFormState] = useState({
    username: "",
    email: "",
    message: "",
  });
  // const { username, email, password } = formState;
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    // targets the different name values in the form
    if (name === "email") {
      const isValid = validateEmail(name);

      // checks if email is valid
      if (!isValid) {
        setErrorMessage("Your email is invalid");
      } else {
        setErrorMessage("");
      }
    } else {
      // checks if other fields in form are valid
      if (!value.length) {
        setErrorMessage(`${name} is required.`);
      } else {
        setErrorMessage("");
      }
    }
    // updates form state if no error
    if (!errorMessage) {
      setFormState({ ...userFormData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userFormData);
  }

  return (
    <section>
      <h1 data-testid="Sign Up">Sign Up!</h1>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="username"
            name="name"
            value={userFormData.username}
            onBlur={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            name="email"
            value={userFormData.email}
            onBlur={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={userFormData.password}
            onBlur={handleChange}
          />
        </div>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default SignUpForm;
