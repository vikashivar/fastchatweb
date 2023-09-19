import React, { useEffect, useState } from "react";
import Chat from "./chat";
import photo from "./chat (1).png";
import Chat1 from "./chat1";
import Chat2 from "./chat2";
import axios from "axios";
import ph from "./search-interface-symbol.png";
import Popup from "reactjs-popup";

function Mainpage(props) {
  const [section, setSection] = useState(false);
  const [userlist, setUserlist] = useState();
  const [detail, setDetail] = useState({});

  const [postchat, setPostchat] = useState({});
  const [getchat, setGetchat] = useState();
  console.log("post", postchat);
  console.log(getchat);
  const [list, setList] = useState([]);

  console.log("list", list);

  function searchlist(e) {
    setList(e);
  }

  function postgetchat(e) {
    setPostchat(e);
  }

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
          className="d-flex align-items-center position-sticky justify-content-between"
          style={{ padding: "10px 10px 5px 10px" }}
        >
          {" "}
          <div className="d-flex align-items-center">
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
          <Popup
            modal
            trigger={
              <div
                className="d-flex align-items-center me-1"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={ph}
                  style={{
                    width: "12px",
                    height: "auto",
                    left: "25px",
                  }}
                  alt=""
                />
                <div
                  className="ms-1"
                  style={{
                    fontSize: "14px",
                    color: "#667781",
                    fontFamily: "Geomanist,sans-serif",
                  }}
                >
                  Search...
                </div>
              </div>
            }
            position="top left"
          >
            {(close) => (
              <div>
                <div
                  className="position-relative"
                  style={{
                    width: "100%",
                    borderBottom: "1px solid rgb(201 215 237)",

                    background: "#fff",
                  }}
                >
                  <input
                    placeholder="Search Contect"
                    type="text"
                    style={{
                      width: "20.4rem",
                      fontSize: "14px",
                      color: "#667781",
                      fontFamily: "Geomanist,sans-serif",
                      padding: "4px 35px",
                      margin: "5px 13px",
                      background: "#f0f2f5",
                      borderRadius: "6px",
                    }}
                    className="searchlist"
                  />
                  <img
                    src={ph}
                    style={{
                      position: "absolute",
                      width: "12px",
                      height: "auto",
                      left: "25px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    alt=""
                  />
                </div>

                {list.map((a, b) => {
                  return (
                    <div
                      key={b}
                      onClick={() => {
                        close();
                        setSection(true);
                        setDetail(a);
                        setPostchat({
                          "User-Name": a?.username,
                          "User-Secret": a?.secret,
                        });
                      }}
                      className="d-flex align-items-center username"
                      style={{
                        borderBottom: "1px solid rgb(201 215 237)",
                        padding: "5px 13px",
                      }}
                    >
                      <div
                        style={{
                          width: "35px",
                          height: "35px",
                          background: "green",
                          borderRadius: "17px",
                        }}
                      ></div>
                      <div
                        className="ms-4"
                        style={{
                          fontFamily: "Josefin Sans,sans-serif",
                          color: "#ffc107fa",
                        }}
                      >
                        {a?.username}
                      </div>
                    </div>
                  );
                })}

                <a className="close" onClick={close}></a>
              </div>
            )}
          </Popup>
        </div>
        <div className="d-flex ">
          <Chat
            section={sectiontrue}
            userdata={userdata}
            postchat={postgetchat}
            searchlist={searchlist}
          ></Chat>
          {section ? <Chat2 detail={detail}></Chat2> : <Chat1></Chat1>}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
