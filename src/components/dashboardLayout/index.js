import "./style.css";

import { Link, useLocation } from "react-router-dom";

import React from "react";
import { setUser } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Index = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const admin = useSelector((state) => state.admin);
  return (
    <div className="dashboard__container">
      <div className="dashboard__header">
        <div className="dashboard__logo">
          <span>Anonymous Reporting system</span>
        </div>
        <div className="dashboard__profile">
          {/* <div className="dashboard__image">A</div> */}
          <Link to="/">
            <span className="dashboard__link">Home</span>
          </Link>
          {admin ? (
            <>
              <Link to="/adminTimeline">
                <span className="dashboard__link">Dashboard</span>
              </Link>
              <Link to="/">
                <span
                  className="dashboard__link"
                  onClick={() => dispatch(setUser())}
                >
                  Logout
                </span>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <span className="dashboard__link">Login</span>
            </Link>
          )}

          <Link to="/report">
            <div className="dashboard__cta">
              <span className="dashboard__link cta">Submit threat</span>
            </div>
          </Link>
        </div>
      </div>
      <div
        className={`${
          props.admin ? "dashboard__body admin" : "dashboard__body"
        } `}
      >
        {props.admin && (
          <div className="dashboard__aside">
            <div className="dashboard__links">
              <Link to="/admintimeline">
                <span
                  className={` ${
                    location.pathname.includes("/admintimeline")
                      ? "dashboard__link dashboard__linkEffect"
                      : "dashboard__link"
                  }`}
                >
                  Timeline ( Admin )
                </span>
              </Link>
              <Link to="/nonverified">
                <span
                  className={` ${
                    location.pathname.includes("/nonverified")
                      ? "dashboard__link dashboard__linkEffect"
                      : "dashboard__link"
                  }`}
                >
                  Non-Verified Posts
                </span>
              </Link>
              <Link to="/interactions">
                <span
                  className={` ${
                    location.pathname.includes("/interactions")
                      ? "dashboard__link dashboard__linkEffect"
                      : "dashboard__link"
                  }`}
                >
                  Interactions
                </span>
              </Link>
            </div>
          </div>
        )}
        <div className="dashboard__main">{props.children}</div>
      </div>
      <div className="dashboard__footer">&copy; 2021 Chidera</div>
    </div>
  );
};

export default Index;
