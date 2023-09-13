import React from "react";

function Chat2() {
  return (
    <div
      style={{ background: "#f0f2f5", width: "100%", height: "100vh" }}
      className="d-flex flex-column justify-content-between"
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
          USER NAME
        </div>
      </div>
      {/* ======================================================= */}
      <div
        style={{
          width: "100%",
          borderBottom: "1px solid rgb(201 215 237)",
          position: "sticky",
          bottom: "0%",
          background: "#fff",
        }}
      >
        <input
          placeholder="Search or start new chat"
          type="text"
          style={{
            width: "96%",
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
    </div>
  );
}

export default Chat2;
