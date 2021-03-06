import "../styles/interactions.css";

import React, { useEffect, useLayoutEffect, useState } from "react";

import ArrowDownIcon from "../assests/ArrowDownIcon";
import ChartCanva from "../components/chart/Chart";
import DashboardLayout from "../components/dashboardLayout";
import ReportCard from "../components/reportCard/reportCard";
import { TailSpin } from "react-loader-spinner";
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
	const [clicks, setClicks] = useState([]);
	const [clicksData, setClicksData] = useState([]);
	const [type, setType] = useState("rape");
	const [showDropdown, setShowDropdown] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingData, setLoadingData] = useState(false);

	useLayoutEffect(() => {
		getThreatLocations(type);
	}, [type]);

	useLayoutEffect(() => {
		getHighestAndLowestComments();
		getMostReported();
		getHighestAndLowestLikes();
		getClicks();
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
		setLoadingData(true);
		apiInstance
			.get("/posts/threat-locations", {
				params: {
					type,
				},
			})
			.then((resp) => {
				setLoadingData(false);
				const {
					data: { data },
				} = resp;
				setData(data);
			})
			.catch((err) => {
				setLoadingData(false);
				console.log(err.response.data.error);
			});
	};

	const getHighestAndLowestComments = () => {
		setLoading(true);
		apiInstance
			.get("/posts/comments")
			.then((resp) => {
				setLoading(false);
				const { data } = resp;
				setHighestComment(data.mostCommentedPost);
				setLowestComment(data.minCommentedPost);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	const getMostReported = () => {
		setLoading(true);
		apiInstance
			.get("/feedbacks/interactions")
			.then((resp) => {
				setLoading(false);
				const { data } = resp;
				setMostReportedData(data.data);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err.response.data.error);
			});
	};

	const getHighestAndLowestLikes = () => {
		setLoading(true);
		apiInstance
			.get("/posts/likes")
			.then((resp) => {
				setLoading(false);
				const { data } = resp;
				setHighestLikes(data?.mostLikedPost);
				setLowestLikes(data?.minLikedPost);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err.response.data.error);
			});
	};

	const getClicks = () => {
		setLoading(true);
		apiInstance
			.get("/clicks")
			.then((resp) => {
				setLoading(false);
				const { data } = resp;
				setClicks(data.data.map((el) => el.linkName));
				setClicksData(data.data.map((el) => el.NoOfClicks));
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	return (
		<DashboardLayout admin>
			<div className="interactions__container">
				<h1 className="interactions__header">User Interactions</h1>

				{loading ? (
					<>
						<div className="loading">
							<TailSpin color="#00b0ff" height={20} width={20} />
						</div>
					</>
				) : (
					<>
						<div className="interactions__div">
							<div className="interactions__header">
								Highest Threat Location
								<div
									className="interactions__dropdown"
									onClick={() => setShowDropdown((prev) => !prev)}
								>
									<span>{type} </span>
									<span
										className={`interactions__arrow ${
											showDropdown && "active"
										}`}
									>
										<ArrowDownIcon />
									</span>
									<div
										className={`interactions__items ${
											showDropdown && "active"
										}`}
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
								{loadingData ? (
									<>
										<div className="loading">
											<TailSpin color="#00b0ff" height={20} width={20} />
										</div>
									</>
								) : dataArray.length < 1 ? (
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
							<div className="interactions__header">Button Clicked</div>
							<div className="interactions__body">
								{clicks.length < 1 ? (
									<div className="interactions__body --noCase">
										There are no cases
									</div>
								) : (
									<div className="interactions__body --chart">
										<ChartCanva dataArray={clicksData} keyArray={clicks} />
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
					</>
				)}
			</div>
		</DashboardLayout>
	);
};

export default Interactions;
