import { validateEmail } from "../utils/helpers";
import { formState, useState } from "react";

function SignUp() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { username, email, password } = formState;
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    // targets the different name values in the form
    if (e.target.name === "email") {
      const isValid = validateEmail(e.target.value);

      // checks if email is valid
      if (!isValid) {
        setErrorMessage("Your email is invalid");
      } else {
        setErrorMessage("");
      }
    } else {
      // checks if other fields in form are valid
      if (!e.target.value.length) {
        setErrorMessage(`${e.target.name} is required.`);
      } else {
        setErrorMessage("");
      }
    }
    // updates form state if no error
    if (!errorMessage) {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formState);
  }

  return (
    <section>
      <h1 data-testid="Sign Up">Sign Up!</h1>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="name"
            defaultValue={username}
            onBlur={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            defaultValue={email}
            onBlur={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            defaultValue={password}
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

export default SignUp;
