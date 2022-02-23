import "../styles/report.css";

import React, { useCallback } from "react";

import ChatbotModal from "../components/modal/ChatbotModal";
import DashboardLayout from "../components/dashboardLayout";
import PostCard from "../components/postCard/postCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Report = () => {
  const [showChat, setShowChat] = useState(false);
  const [feedbackId, setFeedbackId] = useState("");
  let navigation = useNavigate();

  const reportFunc = useCallback((e) => {
    setShowChat(true);
    setFeedbackId(e);
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className="reportForm__body">
          <PostCard nextFunc={reportFunc} />
        </div>
        {showChat && (
          <ChatbotModal
            closeFunc={() => {
              setShowChat(false);
              navigation("/");
            }}
            feedbackId={feedbackId}
          />
        )}
      </DashboardLayout>
    </>
  );
};

export default Report;
