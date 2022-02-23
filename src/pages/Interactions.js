import "../styles/interactions.css";

import React, { useEffect, useState } from "react";

import ArrowDownIcon from "../assests/ArrowDownIcon";
import ChartCanva from "../components/chart/Chart";
import DashboardLayout from "../components/dashboardLayout";
import ReportCard from "../components/reportCard/reportCard";
import { apiInstance } from "../utils/utils";

const Interactions = () => {
  const [data, setData] = useState("");
  const [mostReportedData, setMostReportedData] = useState("");
  const [dataArray, setDataArray] = useState("");
  const [threatArray, setThreatArray] = useState("");
  const [mostReportedDataArray, setMostReportedDataArray] = useState("");
  const [mostReportedThreatArray, setMostReportedThreatArray] = useState("");
  const [highestComment, setHighestComment] = useState("");
  const [lowestComment, setLowestComment] = useState("");
  const [highestLikes, setHighestLikes] = useState("");
  const [lowestLikes, setLowestLikes] = useState("");
  const [type, setType] = useState("rape");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getThreatLocations(type);
  }, [type]);

  useEffect(() => {
    getHighestAndLowestComments();
    getMostReported();
    getHighestAndLowestLikes();
  }, []);

  useEffect(() => {
    if (data === "") return;
    const firstArray = [];
    const secondArray = [];

    Object.keys(data).map((el) => firstArray.push(el));
    Object.values(data).map((el) => secondArray.push(el));

    setDataArray(secondArray);
    setThreatArray(firstArray);
  }, [data]);

  useEffect(() => {
    if (mostReportedData === "") return;
    const firstArray = [];
    const secondArray = [];

    Object.keys(mostReportedData).map((el) => firstArray.push(el));
    Object.values(mostReportedData).map((el) => secondArray.push(el));

    setMostReportedDataArray(secondArray);
    setMostReportedThreatArray(firstArray);
  }, [mostReportedData]);

  const getThreatLocations = (type) => {
    apiInstance
      .get("/posts/threat-locations", {
        params: {
          type,
        },
      })
      .then((resp) => {
        const {
          data: { data },
        } = resp;
        setData(data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const getHighestAndLowestComments = () => {
    apiInstance
      .get("/posts/comments")
      .then((resp) => {
        const { data } = resp;
        setHighestComment(data.mostCommentedPost);
        setLowestComment(data.minCommentedPost);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMostReported = () => {
    apiInstance
      .get("/feedbacks/interactions")
      .then((resp) => {
        const { data } = resp;
        setMostReportedData(data.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const getHighestAndLowestLikes = () => {
    apiInstance
      .get("/posts/likes")
      .then((resp) => {
        const { data } = resp;
        setHighestLikes(data?.mostLikedPost);
        setLowestLikes(data?.minLikedPost);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  return (
    <DashboardLayout admin>
      <div className="interactions__container">
        <h1 className="interactions__header">User Interactions</h1>

        <div className="interactions__div">
          <div className="interactions__header">
            Highest Threat Location
            <div
              className="interactions__dropdown"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <span>{type} </span>
              <span
                className={`interactions__arrow ${showDropdown && "active"}`}
              >
                <ArrowDownIcon />
              </span>
              <div
                className={`interactions__items ${showDropdown && "active"}`}
              >
                <div
                  className="interactions__Item"
                  onClick={() => setType("rape")}
                >
                  Rape
                </div>
                <div
                  className="interactions__Item"
                  onClick={() => setType("robbery")}
                >
                  Robbery
                </div>
                <div
                  className="interactions__Item"
                  onClick={() => setType("corruption")}
                >
                  Corruption
                </div>
              </div>
            </div>
          </div>
          <div className="interactions__body">
            {dataArray.length < 1 ? (
              <div className="interactions__body --noCase">
                There are no cases
              </div>
            ) : (
              <div className="interactions__body --chart">
                <ChartCanva dataArray={dataArray} keyArray={threatArray} />
              </div>
            )}
          </div>
        </div>
        <div className="interactions__div">
          <div className="interactions__header">Highest Comment</div>
          <div className="interactions__body --card">
            <ReportCard data={highestComment} min />
          </div>
        </div>
        <div className="interactions__div">
          <div className="interactions__header">Lowest Comment</div>
          <div className="interactions__body --card">
            <ReportCard data={lowestComment} min />
          </div>
        </div>
        <div className="interactions__div">
          <div className="interactions__header">Most Reported Cases</div>
          <div className="interactions__body">
            {mostReportedDataArray.length < 1 ? (
              <div className="interactions__body --noCase">
                There are no cases
              </div>
            ) : (
              <div className="interactions__body --chart">
                <ChartCanva
                  dataArray={mostReportedDataArray}
                  keyArray={mostReportedThreatArray}
                />
              </div>
            )}
          </div>
        </div>
        <div className="interactions__div">
          <div className="interactions__header">Highest Likes</div>
          <div className="interactions__body --card">
            <ReportCard data={highestLikes} min />
          </div>
        </div>
        <div className="interactions__div">
          <div className="interactions__header">Lowest Likes</div>
          <div className="interactions__body --card">
            <ReportCard data={lowestLikes} min />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Interactions;
