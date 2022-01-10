import "../styles/report.css";

import DashboardLayout from "../components/dashboardLayout";
import PostCard from "../components/postCard/postCard";
import React from "react";

const Report = () => {
  return (
    <>
      <DashboardLayout>
        <div className="reportForm__body">
          <PostCard />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Report;
