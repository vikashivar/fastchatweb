import React, { useEffect, useState } from "react";
import photo from "./peakpx.jpg";
import ph from "./send.png";
import axios from "axios";

function Chat2(props) {
  const list1 = JSON.parse(localStorage.getItem("user_details"));

  return (
    <div
      style={{
        // background: "#f0f2f5",
        width: "100%",
        height: "100vh",
        backgroundSize: "97% 100%",

        background: `#fff url(${photo}) no-repeat center`,
      }}
      className="d-flex flex-column justify-content-between "
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
          }}
        ></div>
        <div
          className="ms-4"
          style={{
            fontFamily: "Josefin Sans,sans-serif",
            color: "#fff",
            textShadow: "2px 2px 2px #000000c4",
          }}
        >
          {props.detail?.otherUser?.person?.first_name}
          {` `}
          {props.detail?.otherUser?.person?.last_name}
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            height: "365px",
          }}
          className="px-3 pb-3"
        >
          {props.chatdata &&
            props.chatdata.map((a, b) => {
              return (
                <div
                  key={b}
                  className="px-2 mt-1"
                  style={{
                    paddingBottom: "8px",
                    paddingTop: "6px",
                    color: "#111b21",
                    borderRadius: "5px",
                    background:
                      a.sender_username == list1?.email ? "#F3CFC6" : "#fff",
                    alignSelf:
                      a.sender_username == list1?.email ? "end" : "start",
                  }}
                >
                  {a?.text}
                </div>
              );
            })}
        </div>
      </div>
      {/* ======================================================= */}
      <div style={{ position: "sticky", bottom: "0%" }}>
        <div
          style={{
            width: "100%",
            borderBottom: "1px solid rgb(201 215 237)",

            background: "#f0f2f5",
            padding: "3px 40px",
          }}
        >
          <input
            value={props.chatsend}
            onChange={(e) => {
              props.chatmsend(e.target.value);
            }}
            placeholder="Type a massage"
            type="text"
            style={{
              width: "96%",
              fontSize: "14px",
              color: "#667781",
              fontFamily: "Geomanist,sans-serif",
              padding: "7px 20px",
              margin: "5px 13px",
              background: "#fff",

              borderRadius: "6px",
            }}
            className="searchlist"
          />

          <img
            onClick={props.chatmessagesend}
            onMouseOver={(e) => {
              e.target.style.background = "blue";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#fff";
            }}
            src={ph}
            style={{
              position: "absolute",
              width: "22px",
              height: "auto",
              right: "3%",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Chat2;
