import "../styles/report.css";

import ChatbotModal from "../components/modal/ChatbotModal";
import DashboardLayout from "../components/dashboardLayout";
import PostCard from "../components/postCard/postCard";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Report = () => {
  const [showChat, setShowChat] = useState(false);
  const [feedbackId, setFeedbackId] = useState("");
  let navigation = useNavigate();

  return (
    <>
      <DashboardLayout>
        <div className="reportForm__body">
          <PostCard
            nextFunc={(e) => {
              setShowChat(true);
              setFeedbackId(e);
            }}
          />
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
