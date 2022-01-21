import "../styles/timeline.css";

import React, { useEffect, useState } from "react";

import DashboardLayout from "../components/dashboardLayout";
import ReportCard from "../components/reportCard/reportCard";
import { apiInstance } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Nonverified = () => {
  const token = useSelector((state) => state.token);
  const navigation = useNavigate();
  const admin = useSelector((state) => state.admin);

  const [posts, setPosts] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    getContent();
    getFeedback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (admin) return;
    navigation("/");
  }, [admin]); // eslint-disable-line react-hooks/exhaustive-deps

  const getContent = () => {
    apiInstance
      .get("/posts/nonverified")
      .then((resp) => {
        const {
          data: { data },
        } = resp;
        setPosts(data);
      })
      .catch((err) => {
        console.log(err?.response?.data?.error);
      });
  };
  const getFeedback = () => {
    apiInstance
      .get("/feedbacks", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        const {
          data: { data },
        } = resp;

        setFeedback(data);
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
                      ai={feedback.find((el) => el.postId === data.id)}
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
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Nonverified;
