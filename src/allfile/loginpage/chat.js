import React, { useEffect, useState } from "react";
import ph from "./search-interface-symbol.png";
import axios from "axios";
import "reactjs-popup/dist/index.css";

function Chat(props) {
  const [userlist, setUserlist] = useState();
  const [listarray, setListarray] = useState([]);

  const list = JSON.parse(localStorage.getItem("user_details")).email;

  useEffect(() => {
    axios
      .get("https://api.chatengine.io/users/", {
        headers: { "PRIVATE-KEY": "09b33678-28ea-45d2-806d-1935554db565" },
      })
      .then((e) => {
        setUserlist(e);

        setListarray(e.data.filter((a) => a.username !== list));
        props.searchlist(e.data.filter((a) => a.username !== list));
        props.setSearchtextarry2funtion(
          e.data.filter((a) => a.username !== list)
        );
      });
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        width: "100%",
        maxWidth: "35%",
        height: "100vh",
        overflow: "scroll",
      }}
    >
      <div
        style={{
          padding: "8px 13px",
          background: "#f0f2f5",
          border: "1px solid rgb(201 215 237)",
          position: "sticky",
          top: "0%",
        }}
        className="d-flex align-items-center "
      >
        <div
          style={{
            width: "30px",
            height: "30px",
            background: "#fff",
            borderRadius: "15px",
            boxShadow: "#ffc107a8 0px 0px 7px 2px",
          }}
        ></div>
        <div
          className="ms-4"
          style={{
            fontFamily: "Josefin Sans,sans-serif",
            color: "#ffc107fa",
            textShadow: "2px 2px 2px #000000c4",
          }}
        >
          {list}
        </div>
      </div>
      <div style={{ position: "sticky", top: "47.99px" }}>
        <div
          className="position-relative"
          style={{
            width: "100%",
            borderBottom: "1px solid rgb(201 215 237)",

            background: "#fff",
          }}
        >
          <input
            value={props.searchtext1}
            onChange={(e) => {
              props.searchattextfunction1(e.target.value);
              // props.filterchatlist1();
            }}
            placeholder="Search or start new chat"
            type="text"
            style={{
              width: "20.4rem",
              fontSize: "14px",
              color: "#667781",
              fontFamily: "Geomanist,sans-serif",
              padding: "4px 50px",
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
      </div>
      <div>
        {props.chatlist.map((a, b) => {
          return (
            a?.otherUser !== undefined && (
              <div
                key={b}
                onClick={() => {
                  props.section();
                  props.userdata(a);
                  // props.postchat({
                  //   username: a?.otherUser?.person?.username,
                  // });
                  props.chatidd(a?.id);
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
                  {a?.otherUser?.person?.username}
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default Chat;
