import React, { useState } from "react";


export default function Form() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  function handleEmailChange(event) {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setIsValid(validateEmail(inputEmail));
  }

  function validateEmail(inputEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save email");
        }
        alert("Success! You're in :) Make sure to check your spam folder.");
      })
      .catch((error) => {
        console.error(error);
        alert("Ooops that didn't work, try again");
      });

    setEmail("");
  }


  return (
    <>
      <form className="main-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Sign up for free water quality alerts:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={isValid ? "" : "error"}
          placeholder="Your Email"
        />
        {!isValid && (
          <p className="error-msg">Please enter a valid email address.</p>
        )}
        <button type="submit" disabled={!isValid}>
          Let&apos;s swim!
        </button>
      </form>
    </>
  );
}
