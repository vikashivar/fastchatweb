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
  const [chatlist, setChatlist] = useState([]);
  const list1 = JSON.parse(localStorage.getItem("user_details"));

  const [list, setList] = useState([]);
  const [chatid, setChatid] = useState();
  const [chatsend, setChatsend] = useState("");
  function searchlist(e) {
    setList(e);
  }
  console.log("object,", list);

  function postgetchat(e) {
    setPostchat(e);
  }

  function userdata(e) {
    setDetail(e);
  }

  function sectiontrue() {
    setSection(true);
  }
  function chatidd(e) {
    setChatid(e);
  }
  function chatmsend(e) {
    setChatsend(e);
  }
  useEffect(() => {
    axios
      .put(
        "https://api.chatengine.io/chats/",
        {
          usernames: [list1?.email, postchat?.username],
          // title: "Another Surprise Party!",
          is_direct_chat: true,
        },
        {
          headers: {
            "Project-ID": "5d479425-5e0d-44c0-949f-640752939a58",
            "User-Name": list1?.email,
            "User-Secret": list1?.uid,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", { err });
      });
  }, [postchat]);
  // see after------------------------------------------------------------
  useEffect(() => {
    axios
      .get("https://api.chatengine.io/chats/", {
        headers: {
          "Project-ID": "5d479425-5e0d-44c0-949f-640752939a58",
          "User-Name": list1?.email,
          "User-Secret": list1?.uid,
        },
      })
      .then((res) => {
        console.log("res1", res);
        let list = [];
        res.data?.map((item) => {
          // list.push(item);
          // if (item?.last_message?.text) {
          //   list.push(item);
          // }
          const otherUser = item.people?.find(
            (o) => o.person.username !== list1?.email
          );
          const currentUser = item.people?.find(
            (o) => o?.person?.username == list1?.email
          );
          list.push({ ...item, otherUser, currentUser });
        });
        setChatlist(list);
      })
      .catch((err) => {
        console.log("err1", { err });
      });
  }, [postchat]);

  useEffect(() => {
    axios
      .get("https://api.chatengine.io/users/", {
        headers: { "PRIVATE-KEY": "09b33678-28ea-45d2-806d-1935554db565" },
      })
      .then((e) => {
        setUserlist(e);
      });
  }, []);

  const [chatdata, setChatdata] = useState("");

  useEffect(() => {
    if (chatid) {
      getMessages();
    }
  }, [chatid]);

  const getMessages = () => {
    axios
      .get(`https://api.chatengine.io/chats/${chatid}/messages/`, {
        headers: {
          "Project-ID": "5d479425-5e0d-44c0-949f-640752939a58",
          "User-Name": list1?.email,
          "User-Secret": list1?.uid,
        },
      })
      .then((e) => {
        setChatdata(e);
      })
      .catch((e) => {
        setChatdata(e);
      });
  };
  console.log("chatdata", chatdata);
  console.log("chatid", chatid);

  function chatmessagesend() {
    axios
      .post(
        `https://api.chatengine.io/chats/${chatid}/messages/`,
        {
          text: chatsend,
          attachment_urls: [
            "https://chat-engine-assets.s3.amazonaws.com/arrow-min.png",
            "https://chat-engine-assets.s3.amazonaws.com/click.mp3",
          ],
          custom_json: "mm",
        },
        {
          headers: {
            "Project-ID": "5d479425-5e0d-44c0-949f-640752939a58",
            "User-Name": list1?.email,
            "User-Secret": list1?.uid,
          },
        }
      )
      .then((e) => {
        console.log("right", e);
        getMessages();
      })
      .catch((e) => {
        console.log("wrong", e);
      });
  }

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
                          username: a?.username,
                        });
                        // setChatid(a?.id);
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
            chatlist={chatlist}
            chatidd={chatidd}
          ></Chat>
          {section ? (
            <Chat2
              detail={detail}
              chatmsend={chatmsend}
              chatsend={chatsend}
              chatmessagesend={chatmessagesend}
              chatdata={chatdata}
            ></Chat2>
          ) : (
            <Chat1></Chat1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
