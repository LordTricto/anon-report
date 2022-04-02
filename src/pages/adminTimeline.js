import "../styles/timeline.css";

import React, { useEffect, useLayoutEffect, useState } from "react";

import DashboardLayout from "../components/dashboardLayout";
import ReportCard from "../components/reportCard/reportCard";
import { TailSpin } from "react-loader-spinner";
import { apiInstance } from "../utils/utils";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminTimeline = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigate();
  const admin = useSelector((state) => state.admin);
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    if (admin) return;
    navigation("/");
  }, [admin]); // eslint-disable-line react-hooks/exhaustive-deps

  const getContent = useCallback(() => {
    setLoading(true);
    apiInstance
      .get("/posts")
      .then((resp) => {
        setLoading(false);

        const {
          data: { data },
        } = resp;
        setPosts();
        setPosts(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data.error);
      });
  }, []);
  const getFeedback = useCallback(() => {
    setLoading(true);

    apiInstance
      .get("/feedbacks", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setLoading(false);
        const {
          data: { data },
        } = resp;

        setFeedback(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data.error);
      });
  }, [token]);

  useLayoutEffect(() => {
    getContent();
    getFeedback();
  }, [getContent, getFeedback]);

  return (
    <>
      <DashboardLayout admin>
        <div className="timeline__body">
          <div className="timeline__reports">
            {loading ? (
              <>
                <div className="loading">
                  <TailSpin color="#00b0ff" height={20} width={20} />
                </div>
              </>
            ) : posts && posts.length === 0 ? (
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

export default AdminTimeline;
