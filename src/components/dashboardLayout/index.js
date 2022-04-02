import "./style.css";

import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";

import { setUser } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Index = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const admin = useSelector((state) => state.admin);
  const [openNav, setOpenNav] = useState(false);
  return (
    <div className="dashboard__container">
      <div className="dashboard__header">
        <div className="dashboard__logo">
          <span className="dashboard__logo--desktop">
            Anonymous Reporting system
          </span>
          <span className="dashboard__logo---mobile">
            Anonymous
            <br /> Reporting <br />
            system
          </span>
          <div
            className="dashboard__hamburger"
            onClick={() => setOpenNav((prev) => !prev)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="dashboard__profile">
          <Link to="/">
            <span className="dashboard__link">Home</span>
          </Link>
          {admin ? (
            <>
              <Link to="/admintimeline">
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

            <div className="dashboard__profile--mobile">
              <Link to="/">
                <span className="dashboard__link--mobile">Home</span>
              </Link>
              {admin ? (
                <>
                  <Link to="/admintimeline">
                    <span className="dashboard__link--mobile">Dashboard</span>
                  </Link>
                  <Link to="/">
                    <span
                      className="dashboard__link--mobile"
                      onClick={() => dispatch(setUser())}
                    >
                      Logout
                    </span>
                  </Link>
                </>
              ) : (
                <Link to="/login">
                  <span className="dashboard__link--mobile">Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
        {/* mobile aside */}

        {props.admin && (
          <div
            className={`dashboard__aside--mobile
          ${openNav && "show"}`}
          >
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

            <div className="dashboard__profile--mobile">
              <Link to="/">
                <span className="dashboard__link--mobile">Home</span>
              </Link>
              {admin ? (
                <>
                  <Link to="/admintimeline">
                    <span className="dashboard__link--mobile">Dashboard</span>
                  </Link>
                  <Link to="/">
                    <span
                      className="dashboard__link--mobile"
                      onClick={() => dispatch(setUser())}
                    >
                      Logout
                    </span>
                  </Link>
                </>
              ) : (
                <Link to="/login">
                  <span className="dashboard__link--mobile">Login</span>
                </Link>
              )}
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
