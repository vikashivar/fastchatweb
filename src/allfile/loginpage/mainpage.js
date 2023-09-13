import React, { useState } from "react";
import Chat from "./chat";
import photo from "./chat (1).png";
import Chat1 from "./chat1";
import Chat2 from "./chat2";

function Mainpage() {
  const [section, setSection] = useState(false);

  function sectiontrue() {
    setSection(true);
  }

  return (
    <div>
      <div style={{ width: "100%", height: "100vh", background: "#ffc0cb" }}>
        <div
          className="d-flex align-items-center position-sticky"
          style={{ padding: "10px 10px 5px 10px" }}
        >
          {" "}
          <img src={photo} alt="" style={{ width: "25px", hight: "25px" }} />
          <div
            className="ms-3"
            style={{
              fontFamily: "roboto,sans-serif",
              color: "#fff",
              fontSize: "12px",
            }}
          >
            FASTCHAT
          </div>
        </div>
        <div className="d-flex ">
          <Chat section={sectiontrue}></Chat>
          {section ? <Chat2></Chat2> : <Chat1></Chat1>}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
