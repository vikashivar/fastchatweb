import React, { useEffect, useState } from "react";
import Chat from "./chat";
import photo from "./chat (1).png";
import Chat1 from "./chat1";
import Chat2 from "./chat2";
import axios from "axios";

function Mainpage(props) {
  const [section, setSection] = useState(false);
  const [userlist, setUserlist] = useState();
  const [detail, setDetail] = useState({});
  console.log(detail);

  function userdata(e) {
    setDetail(e);
  }

  function sectiontrue() {
    setSection(true);
  }

  useEffect(() => {
    axios
      .get("https://api.chatengine.io/users/", {
        headers: { "PRIVATE-KEY": "369d4be9-9dbe-4f13-9c7f-9ed37f749215" },
      })
      .then((e) => {
        setUserlist(e);
      });
  }, []);
  // console.log(userlist?.data);

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
          <Chat section={sectiontrue} userdata={userdata}></Chat>
          {section ? <Chat2 detail={detail}></Chat2> : <Chat1></Chat1>}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
