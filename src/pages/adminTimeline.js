import "../styles/timeline.css";

import React, { useEffect, useState } from "react";

import DashboardLayout from "../components/dashboardLayout";
import ReportCard from "../components/reportCard/reportCard";
import { apiInstance } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminTimeline = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigate();
  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    if (admin) return;
    navigation("/");
  }, [admin]); // eslint-disable-line react-hooks/exhaustive-deps

  const getContent = () => {
    apiInstance
      .get("/posts")
      .then((resp) => {
        const {
          data: { data },
        } = resp;
        setPosts();
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  return (
    <>
      <DashboardLayout admin>
        <div className="timeline__body">
          <div className="timeline__reports">
            {posts && posts.length === 0 ? (
              <div className="timeline__none">There are no posts</div>
            ) : (
              posts?.map((data, index) => {
                return (
                  <div key={index}>
                    <ReportCard
                      data={data}
                      admin={true}
                      success={(resp) => {
                        alert(resp);
                        getContent();
                      }}
                    />
                  </div>
                );
              })
            )}
            {/* <ReportCard /> */}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminTimeline;
