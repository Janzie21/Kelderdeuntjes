import React from "react";
import { useState } from "react";

const Bookingform = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending");

    const data = {
      firstname,
      lastname,
      email,
      phone,
      message,
    };
    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log("Response received");
        if (res.status === 200) {
          console.log("Response succeeded!");
          setSubmitted(true);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form className="callback-form">
      <div className="form-control">
        <label htmlFor="firstname"></label>
        <input
          type="text"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          name="firstname"
        />
      </div>
      <div className="form-control">
        <label htmlFor="lasttname"></label>
        <input
          type="text"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          name="lasttname"
        />
      </div>
      <div className="form-control">
        <label htmlFor="email"></label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
        />
      </div>
      <div className="form-control">
        <label htmlFor="phone"></label>
        <input
          type="tel"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          name="phone"
        />
      </div>
      <div className="form-control">
        <label htmlFor="message"></label>
        <input
          type="text"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          name="message"
        />
      </div>
      <div className="form-control">
        <label htmlFor="submit"></label>
        <input
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        />
      </div>
    </form>
  );
};

export default Bookingform;
