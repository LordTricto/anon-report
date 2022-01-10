import "./App.css";

import { Route, Routes } from "react-router-dom";

import AdminTimeline from "./pages/adminTimeline";
import Login from "./pages/login";
import Nonverified from "./pages/nonverified";
import Report from "./pages/report";
import Timeline from "./pages/timeline";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Timeline />} />
        <Route exact path="/report" element={<Report />} />
        <Route exact path="/nonverified" element={<Nonverified />} />
        <Route exact path="/adminTimeline" element={<AdminTimeline />} />
      </Routes>
    </div>
  );
};
export default App;
