import "./style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import React, { useEffect, useState } from "react";
import { faCommentAlt, faHeart } from "@fortawesome/free-regular-svg-icons";

import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiInstance } from "../../utils/utils";
import { useSelector } from "react-redux";

const ReportCard = ({ data, key, admin, success, ai = null, min }) => {
	const token = useSelector((state) => state.token);
	const [info, setInfo] = useState({});
	const [images, setImages] = useState([]);
	const [date, setDate] = useState("");
	const [comment, setComment] = useState();
	const [comments, setComments] = useState([]);
	const [showComment, setShowComment] = useState(false);
	const [showAll, setShowAll] = useState(false);
	const [hideQuestion, setHideQuestion] = useState(true);

	useEffect(() => {
		if (!data || data.length < 1) return;
		setInfo(data);
		setImages(data.media);
		setDate(data.createdAt);
		if (min) return;
		setComments(data.comments);
	}, [data, min]);

	const onSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("comment", comment);
		async function uploadData() {
			apiInstance
				.post(`/comments/${info.id}`, {
					comment: comment,
				})
				.then((resp) => {
					success(resp.data.message);
				})
				.catch((err) => {
					console.log(err.response.data.error);
				});
		}

		uploadData();
	};
	const handleDeleteComment = (id) => {
		async function deleteComment() {
			apiInstance
				.delete(`/comments/${id}`, {
					headers: {
						authorization: `Bearer ${token}`,
					},
				})
				.then((resp) => {
					success(resp.data.message);
				})
				.catch((err) => {
					console.log(err.response.data.error);
				});
		}
		deleteComment();
	};
	const handleDelete = () => {
		async function deletePost() {
			apiInstance
				.delete(`/posts/${info.id}`, {
					headers: {
						authorization: `Bearer ${token}`,
					},
				})
				.then((resp) => {
					success(resp.data.message);
				})
				.catch((err) => {
					// console.log(err.response.data.error);
				});
		}
		deletePost();
	};
	const handleVerify = () => {
		async function verifyPost() {
			apiInstance
				.patch(
					`/posts/${info.id}/`,
					{},
					{
						headers: {
							authorization: `Bearer ${token}`,
						},
					}
				)
				.then((resp) => {
					success(resp.data.message);
				})
				.catch((err) => {
					console.log(err.response.data.error);
				});
		}

		verifyPost();
	};

	const recordLikeClick = () => {
		apiInstance
			.post("/clicks/", { linkName: "like" })
			.then((resp) => {
				console.log(resp.data);
			})
			.catch((err) => {
				console.log(err.response.data.error);
			});
	};

	const likeContent = () => {
		apiInstance
			.patch(`/posts/like-post/${info.id}`)
			.then((resp) => {
				success(resp.data.message);
			})
			.catch((err) => {
				console.log(err);
			});

		recordLikeClick();
	};

	const recordCommentClick = () => {
		apiInstance
			.post("/clicks/", { linkName: "comment" })
			.then((resp) => {
				console.log(resp.data);
			})
			.catch((err) => {
				console.log(err.response.data.error);
			});
	};
	return (
		<>
			<div className="report__post" key={key}>
				<div className="report__header">
					<span className="report__postHeader">{info.post}</span>
					<span className="report__date">{date && date.slice(0, 10)}</span>
				</div>
				<div className="report__details">
					<div className="report__images">
						{images && (
							<Carousel>
								{images &&
									images.length > 0 &&
									images.map((imag, index) => {
										return (
											<div key={index}>
												<img src={imag} className="img" alt="pic" />
											</div>
										);
									})}
							</Carousel>
						)}
					</div>
					<div className={`report__text ${showAll && "--showAll"}`}>
						{info.description}
					</div>
					{info?.description?.length > 200 && (
						<div
							className="report__showAll"
							onClick={() => setShowAll((prev) => !prev)}
						>
							{showAll ? "hide all" : "show all"}
						</div>
					)}
				</div>
				{!admin && (
					<div className="report__bottom">
						<div className="reports__actions">
							<div className="reports__likes">
								{" "}
								<div
									className={`reports__likes ${min && "noClick"} `}
									onClick={likeContent}
								>
									<FontAwesomeIcon icon={faHeart} />
								</div>
								<span className="reports__number">{info.likes}</span>
							</div>
							<div
								className={`reports__messages ${min && "noClick"}`}
								onClick={() => {
									setShowComment(!showComment);
									if (!showComment) return recordCommentClick();
								}}
							>
								<FontAwesomeIcon icon={faCommentAlt} />
								<span className="reports__number">
									{min ? data?.commentCount : comments?.length}
								</span>
							</div>
						</div>
						{info && info?.verified ? (
							<div className="reports__verified">verified</div>
						) : (
							<div className="reports__nonverified">non-verified</div>
						)}
					</div>
				)}

				{admin && (
					<>
						<div className="report__control">
							{ai && ai.valid && (
								<div className="report__ai">
									Note AI has determined that this post is
									<span className="ai">
										{ai?.valid ? " Valid" : " not Valid"}
									</span>
								</div>
							)}
							<div className="report__controls --question">
								<span>Questions</span>
								<span
									className="--span"
									onClick={() => setHideQuestion((prev) => !prev)}
								>
									{hideQuestion ? "show" : "hide"}
								</span>
							</div>
							<div
								className={`report__controls --questionContainer ${
									hideQuestion && "--hideQuestion"
								}`}
							>
								<div className="report__controls --small">
									<span>{ai?.questions?.question1}</span>
									<span>{ai?.answer1}</span>
								</div>
								<div className="report__controls --small">
									<span>{ai?.questions?.question2}</span>
									<span>{ai?.answer2}</span>
								</div>
								<div className="report__controls --small">
									<span>{ai?.questions?.question3}</span>
									<span>{ai?.answer3}</span>
								</div>
								<div className="report__controls --small">
									<span>{ai?.questions?.question4}</span>
									<span>{ai?.answer4}</span>
								</div>
							</div>

							<div className="report__controls">
								{info && !info?.verified ? (
									<div
										className="report__button --control"
										onClick={handleVerify}
									>
										<button type="button">Verify Post</button>
									</div>
								) : (
									<div className="report__button --control --disabled">
										<button type="button">Verified!</button>
									</div>
								)}

								<div className="report__button control" onClick={handleDelete}>
									<button type="button">Delete Post</button>
								</div>
							</div>
						</div>
					</>
				)}

				{!admin && (
					<div
						className={`report__comment ${showComment ? "--show" : "--hide"}`}
					>
						{!admin && (
							<form onSubmit={onSubmit} className="report__form">
								<span>Comment</span>
								<textarea
									className="report__textarea Bottom"
									name="reportDescription"
									onChange={(event) => {
										const { value } = event.target;
										setComment(value);
									}}
								></textarea>
								<div className="report__button">
									<button type="submit">Post</button>
								</div>
							</form>
						)}
					</div>
				)}

				{comments?.length > 0 && (
					<div className="report__comments">
						{comments &&
							comments?.map((com, index) => {
								return (
									<div className="report__commenter" key={index}>
										<span>- {com.comment}</span>
										{admin && (
											<span
												className="report__delete"
												onClick={() => handleDeleteComment(com.id)}
											>
												Delete
											</span>
										)}
									</div>
								);
							})}
					</div>
				)}
			</div>
		</>
	);
};

export default ReportCard;
