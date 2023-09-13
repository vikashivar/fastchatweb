import React, { useState } from "react";
import photo from "./chat (1).png";
import Loginsection1 from "./loginsection1";

function Login() {
  const [sign, setSign] = useState(true);

  return (
    <div className="" style={{ background: "#ea8feb1c", height: "100%" }}>
      <div
        style={{
          background: "#fd083314",
          height: "11rem",
        }}
      >
        <div
          className="d-flex align-items-center py-4"
          style={{
            margin: "0rem 6rem",
          }}
        >
          <img src={photo} alt="" style={{ width: "35px", height: "35px" }} />
          <div
            className="ms-4"
            style={{ fontFamily: "roboto,sans-serif", color: "#fff" }}
          >
            FASTCHAT
          </div>
        </div>
        <div
          style={{
            borderRadius: "3px",
            background: "#fff",
            boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
            margin: "0rem 6rem",
          }}
        >
          <Loginsection1></Loginsection1>
        </div>
      </div>

      <div style={{ background: "#fff" }}></div>
    </div>
  );
}

export default Login;
