import React, { useEffect, useState } from "react";
import Chat from "./chat";
import photo from "./chat (1).png";
import Chat1 from "./chat1";
import Chat2 from "./chat2";
import axios from "axios";
import ph from "./search-interface-symbol.png";
import Popup from "reactjs-popup";

let socket;

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
  const [searchtext1, setSearchtext1] = useState("");
  const [searchtextarry1, setSearchtextarry1] = useState([]);
  const [searchtext2, setSearchtext2] = useState("");
  const [searchtextarry2, setSearchtextarry2] = useState([]);
  const [chatdata, setChatdata] = useState([]);
  const [apicall, setapicall] = useState("");

  useEffect(() => {
    const zz = searchtextarry2.filter((a) => {
      if (a.username.includes(searchtext2.trim())) {
        return true;
      }
      return false;
    });
    searchlist(zz);
  }, [searchtextarry2, searchtext2]);

  useEffect(() => {
    filterchatlist1();
  }, [searchtext1, searchtextarry1]);

  function filterchatlist1() {
    const zz = searchtextarry1.filter((a) => {
      if (a?.otherUser?.person?.username.includes(searchtext1.trim())) {
        return true;
      }
      return false;
    });

    setChatlist(zz);
  }

  function setSearchtextarry2funtion(e) {
    setSearchtextarry2(e);
  }

  function searchattextfunction1(e) {
    setSearchtext1(e);
  }
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
  function chatidd(e) {
    setChatid(e);
  }
  function chatmsend(e) {
    setChatsend(e);
  }

  useEffect(() => {
    connctToSocket();

    return () => {
      socket?.close();
    };
  }, []);

  const createOrGetChat = async (username) => {
    await axios
      .put(
        "https://api.chatengine.io/chats/",
        {
          usernames: [list1?.email, username],
          // title: "Another Surprise Party!",
          is_direct_chat: true,
        },
        {
          headers: {
            "Project-ID": "7371435b-94b2-48b3-81cf-f076ed500900",
            "User-Name": list1?.email,
            "User-Secret": list1?.uid,
          },
        }
      )
      .then((res) => {
        const otherUser = res.data?.people?.find(
          (o) => o.person.username !== list1?.email
        );
        const currentUser = res.data?.people?.find(
          (o) => o?.person?.username == list1?.email
        );
        setChatid(res.data?.id);
        setSection(true);
        setDetail({ otherUser, currentUser, ...res.data });
        getMessages(res.data?.id);
        const isAlready = chatlist.find((o) => o.id == res.data?.id);
        if (isAlready) return;
        setChatlist([{ otherUser, currentUser, ...res.data }, ...chatlist]);
      })
      .catch((err) => {});
  };

  const connctToSocket = () => {
    socket = new WebSocket(
      `wss://api.chatengine.io/person/?publicKey=${"7371435b-94b2-48b3-81cf-f076ed500900"}&username=${
        list1?.email
      }&secret=${list1?.uid}`
    );

    socket.onopen = (event) => console.log(event);
    socket.onclose = (event) => console.log(event);
    socket.onmessage = (event) => {
      console.log("event", JSON.parse(event.data));
      const data = JSON.parse(event.data);
      if (data.action == "new_message") {
        setChatdata([...chatdata, data?.data?.message]);
      }

      if (data.action == "new_chat") {
        chatdataapifunction();
      }
      apicallfunction();
    };
    socket.onerror = (error) => console.log(error);
  };

  // see after------------------------------------------------------------
  function apicallfunction(e) {
    setapicall(e);
  }
  useEffect(() => {
    chatdataapifunction();
  }, [apicall]);

  function chatdataapifunction() {
    axios
      .get("https://api.chatengine.io/chats/", {
        headers: {
          "Project-ID": "7371435b-94b2-48b3-81cf-f076ed500900",
          "User-Name": list1?.email,
          "User-Secret": list1?.uid,
        },
      })
      .then((res) => {
        let list = [];
        res.data?.map((item) => {
          let isRead = true;
          const otherUser = item.people?.find(
            (o) => o.person.username !== list1?.email
          );
          const currentUser = item.people?.find(
            (o) => o?.person?.username == list1?.email
          );
          if (
            currentUser?.person?.username !==
            item?.last_message?.sender_username
          ) {
            if (
              item?.last_message?.id &&
              item?.last_message?.id !== currentUser?.last_read
            ) {
              isRead = false;
            }
          }
          list.push({ ...item, isRead, otherUser, currentUser });
        });
        const aa = list.filter((a) => {
          return a.last_message.text;
        });

        setChatlist([...aa]);
        setSearchtextarry1([...aa]);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    axios
      .get("https://api.chatengine.io/users/", {
        headers: { "PRIVATE-KEY": "18c3277d-921a-440f-b8b2-b5b3dab4ff99" },
      })
      .then((e) => {
        setUserlist(e);
      });
  }, []);

  useEffect(() => {
    if (chatid) {
      getMessages(chatid);
    }
  }, [chatid]);

  const getMessages = (id) => {
    axios
      .get(`https://api.chatengine.io/chats/${id}/messages/`, {
        headers: {
          "Project-ID": "7371435b-94b2-48b3-81cf-f076ed500900",
          "User-Name": list1?.email,
          "User-Secret": list1?.uid,
        },
      })
      .then((e) => {
        setChatdata(e.data);
      })
      .catch((e) => {});
  };

  function chatmessagesend() {
    chatsend.trim() &&
      axios
        .post(
          `https://api.chatengine.io/chats/${chatid}/messages/`,
          {
            text: chatsend,
            attachment_urls: [],
            custom_json: "mm",
          },
          {
            headers: {
              "Project-ID": "7371435b-94b2-48b3-81cf-f076ed500900",
              "User-Name": list1?.email,
              "User-Secret": list1?.uid,
            },
          }
        )
        .then((e) => {
          // getMessages();
          setChatdata([...chatdata, e.data]);
          setChatsend("");
        })
        .catch((e) => {
          setChatsend("");
        });
  }

  function readmesssage(id) {
    axios.patch(
      `https://api.chatengine.io/chats/${chatid}/people/`,
      { last_read: detail?.last_message?.id },
      {
        headers: {
          "Project-ID": "7371435b-94b2-48b3-81cf-f076ed500900",
          "User-Name": list1?.email,
          "User-Secret": list1?.uid,
        },
      }
    );
  }

  useEffect(() => {
    if (
      detail.last_message?.sender_username !==
      detail.currentUser?.person?.username
    ) {
      if (detail?.last_message?.id !== detail?.currentUser?.last_read) {
        readmesssage();
      }
    }
  }, [detail]);

  return (
    <div style={{ overflow: "hiddne" }}>
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
                    value={searchtext2}
                    onChange={(e) => {
                      setSearchtext2(e.target.value);
                    }}
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

                {list?.map((a, b) => {
                  return (
                    <div
                      key={b}
                      onClick={() => {
                        close();

                        createOrGetChat(a?.username);
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
            // postchat={postgetchat}
            searchlist={searchlist}
            chatlist={chatlist}
            chatidd={chatidd}
            searchtext1={searchtext1}
            searchattextfunction1={searchattextfunction1}
            filterchatlist1={filterchatlist1}
            setSearchtextarry2funtion={setSearchtextarry2funtion}
            apicallfunction={apicallfunction}
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
