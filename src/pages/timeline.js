import "../styles/timeline.css";

import React, { useEffect, useState } from "react";

import DashboardLayout from "../components/dashboardLayout";
import { Link } from "react-router-dom";
import ReportCard from "../components/reportCard/reportCard";
import { apiInstance } from "../utils/utils";
import image1 from "../assests/kat-j-NPmR0RblyhQ-unsplash.jpg";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    getContent();
  }, []);

  const getContent = () => {
    apiInstance
      .get("/posts/verified")
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
      <DashboardLayout>
        <div className="timeline__hero">
          <img src={image1} className="timeline__img" alt="" />
          <div className="timeline__heroDiv">
            <div className="timeline__heroHead">Save a life Today</div>
            <div className="timeline__heroBody">100% anonymous reports </div>
            <Link to="/report">
              <div className="timeline__cta">
                <span>Submit threat</span>
              </div>
            </Link>

            {/* <div className="timeline__cta">Submit a threat</div> */}
          </div>
        </div>

        <div className="timeline__body">
          <div className="timeline__bodyTitle">Threats</div>

          <div className="timeline__reports">
            {posts && posts.length === 0 ? (
              <div className="timeline__none">There are no posts</div>
            ) : (
              posts?.map((data, index) => {
                return (
                  <div key={index}>
                    <ReportCard
                      data={data}
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

export default Timeline;
