import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Loginsection1() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState({});
  const [error1, setError1] = useState({});
  const [sign, setSign] = useState(true);
  const [lastname, setLastname] = useState("");
  let navigate = useNavigate();

  // ------------------------------------------------------------------------------
  // sign-up

  const onSignup = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(async (userCredential) => {
        // 1Signed in
        const user = userCredential.user;

        navigate("/user");
        axios
          .post(
            "https://api.chatengine.io/users/",
            {
              username: email,
              first_name: firstname,
              last_name: lastname,
              secret: user.uid,
            },
            {
              headers: {
                "PRIVATE-KEY": "369d4be9-9dbe-4f13-9c7f-9ed37f749215",
              },
            }
          )
          .then((res) => {
            console.log("res", res);
          })
          .catch((err) => {
            console.log("error", err);
          });
        localStorage.setItem("user_details", JSON.stringify(user));

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const onSignin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/user");

        localStorage.setItem("user_details", JSON.stringify(user));

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  // -------------------------------------------------------------------------------
  function validfunction() {
    const object1 = {};
    let formvalid = true;

    if (!email) {
      object1.email = "Fill email is required.";
      formvalid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      object1.email = "Valid email is required.";
      formvalid = false;
    }

    if (!pass) {
      object1.pass = "Fill password is required.";
      formvalid = false;
    } else if (pass.length < 8) {
      object1.pass = "Valid password is required.";
      formvalid = false;
    }

    if (!firstname) {
      object1.firstname = "Fill user firstname is required";
      formvalid = false;
    } else if (firstname.length < 3) {
      object1.firstname = "Valid user firstname is required";
      formvalid = false;
    }
    if (!lastname) {
      object1.lastname = "Fill user lastname is required";
      formvalid = false;
    } else if (lastname.length < 3) {
      object1.lastname = "Valid user lastname is required";
      formvalid = false;
    }
    setError(object1);

    if (formvalid) {
      onSignup();
      setPass("");
      setEmail("");
      setFirstname("");
      setLastname("");
    }
  }

  function validfunction1() {
    const object1 = {};
    let formvalid = true;

    if (!email) {
      object1.email = "Fill email is required.";
      formvalid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      object1.email = "Valid email is required.";
      formvalid = false;
    }

    if (!pass) {
      object1.pass = "Fill password is required.";
      formvalid = false;
    } else if (pass.length < 8) {
      object1.pass = "Valid password is required.";
      formvalid = false;
    }

    setError1(object1);

    if (formvalid) {
      onSignin();
      setPass("");
      setEmail("");
      // setFirstname("");
      // setLastname("");
    }
  }

  return sign ? (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        padding: "5rem 0rem",
      }}
    >
      <div
        className="mb-1"
        style={{
          fontSize: "28px",
          fontWeight: 300,
          color: "#41525d",
          fontFamily: "Josefin Sans, sans-serif",
        }}
      >
        Welcome ! Login
      </div>
      <div
        className="mb-4"
        style={{
          color: "#8696a0",
          fontSize: "14px",
          fontFamily: "Geomanist,sans-serif",
        }}
      >
        JOIN THE FRIENDLY FASTCHAT WEB
      </div>
      <div className="d-flex flex-column">
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          className="logininput mb-3 px-3"
          placeholder="Gmail.com"
        />
        <span
          className="pb-2"
          style={{
            fontSize: "13px",
            color: "#ea0038",
            fontFamily: "ui-sans-serif,sans-serif",
          }}
        >
          {error?.email}
        </span>
        <input
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
          type="password"
          className="logininput px-4 mb-3"
          placeholder="Password"
        />

        <span
          className="pb-2"
          style={{
            fontSize: "13px",
            color: "#ea0038",
            fontFamily: "ui-sans-serif,sans-serif",
          }}
        >
          {error?.pass}
        </span>
      </div>
      <div
        onClick={() => {
          validfunction1();
        }}
        className="px-4 py-2 mt-2"
        style={{
          // boxShadow: "0px 20px 50px 0px rgba(78,89,231.0.3)",
          boxShadow: "0px 0px 20px  1px rgba(253,8,51,0.3)",
          fontFamily: "ui-sans-serif,sans-serif",
          background: "rgba(253, 8, 51, 0.5)",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        LOGIN
      </div>
      <div
        onClick={() => {
          setSign(false);
          setError({});
        }}
        className="mt-3"
        style={{
          fontFamily: "ui-sans-serif,sans-serif",
          color: "rgb(253, 8, 51)",
          cursor: "pointer",
        }}
      >
        sign-up
      </div>
    </div>
  ) : (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        padding: "5rem 0rem",
      }}
    >
      <div
        className="mb-1"
        style={{
          fontSize: "28px",
          fontWeight: 300,
          color: "#41525d",
          fontFamily: "Josefin Sans, sans-serif",
        }}
      >
        Welcome ! Sign-up
      </div>
      <div
        className="mb-4"
        style={{
          color: "#8696a0",
          fontSize: "14px",
          fontFamily: "Geomanist,sans-serif",
        }}
      >
        JOIN THE FRIENDLY FASTCHAT WEB
      </div>
      <div className="d-flex flex-column">
        <input
          value={firstname}
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          type="text"
          className="logininput mb-3 px-3"
          placeholder="First name"
        />
        <span
          className="pb-2"
          style={{
            fontSize: "13px",
            color: "#ea0038",
            fontFamily: "ui-sans-serif,sans-serif",
          }}
        >
          {error?.firstname}
        </span>
        <input
          value={lastname}
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          type="text"
          className="logininput mb-3 px-3"
          placeholder="Last name"
        />
        <span
          className="pb-2"
          style={{
            fontSize: "13px",
            color: "#ea0038",
            fontFamily: "ui-sans-serif,sans-serif",
          }}
        >
          {error?.lastname}
        </span>

        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          className="logininput mb-3 px-3"
          placeholder="Gmail.com"
        />
        <span
          className="pb-2"
          style={{
            fontSize: "13px",
            color: "#ea0038",
            fontFamily: "ui-sans-serif,sans-serif",
          }}
        >
          {error?.email}
        </span>
        <input
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
          type="password"
          className="logininput px-4 mb-3"
          placeholder="Password"
        />

        <span
          className="pb-2"
          style={{
            fontSize: "13px",
            color: "#ea0038",
            fontFamily: "ui-sans-serif,sans-serif",
          }}
        >
          {error?.pass}
        </span>
      </div>
      <div
        onClick={() => {
          validfunction();
        }}
        className="px-4 py-2 mt-2"
        style={{
          // boxShadow: "0px 20px 50px 0px rgba(78,89,231.0.3)",
          boxShadow: "0px 0px 20px  1px rgba(253,8,51,0.3)",
          fontFamily: "ui-sans-serif,sans-serif",
          background: "rgba(253, 8, 51, 0.5)",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        SIGN-UPdf
      </div>
      <div
        onClick={() => {
          setSign(true);
          setError({});
        }}
        className="mt-3"
        style={{
          fontFamily: "ui-sans-serif,sans-serif",
          color: "rgb(253, 8, 51)",
          cursor: "pointer",
        }}
      >
        Login
      </div>
    </div>
  );
}

export default Loginsection1;
