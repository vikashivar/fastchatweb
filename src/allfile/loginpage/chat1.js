import React from "react";

function Chat1(props) {
  return (
    <div style={{ background: "#f0f2f5", width: "100%", height: "100vh" }}>
      <div
        className="d-flex flex-column align-items-center justify-content-center position-relative"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <div style={{ fontSize: "32px" }} className="">
          Fastchat Web
        </div>
        <div style={{ fontSize: "12px" }} className="mt-4">
          Send and receive messages without keeping your phone online.
          <br />
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </div>
      </div>
    </div>
  );
}

export default Chat1;
