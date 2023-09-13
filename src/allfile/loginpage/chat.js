import React from "react";

function Chat(props) {
  const list = [
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object1",
    "object2",
  ];
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
          USER NAME
        </div>
      </div>
      <div
        style={{
          width: "100%",
          borderBottom: "1px solid rgb(201 215 237)",
          position: "sticky",
          top: "47.99px",
          background: "#fff",
        }}
      >
        <input
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
      </div>
      <div>
        {list.map((a, b) => {
          return (
            <div
              onClick={props.section}
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
                Contect name
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Chat;
