import "./style.css";

import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiInstance } from "../../utils/utils";
import { faImage } from "@fortawesome/free-regular-svg-icons";

// const FILE_SIZE = 160 * 1024;
// const SUPPORTED_FORMATS = [
//   "image/jpg",
//   "image/jpeg",
//   "image/gif",
//   "image/png",
//   "video/mp4",
//   "audio/mp3",
// ];

const PostCard = ({ nextFunc }) => {
	const [title, setTitle] = useState([]);
	const [file, setFile] = useState();
	const [video, setVideo] = useState([]);
	const [audio, setAudio] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [description, setDescription] = useState();
	const [location, setLocation] = useState();
	const [happening, setHappening] = useState();
	const [by, setBy] = useState();
	const [id, setId] = useState("");
	// let time = new Date().toLocaleTimeString();
	// const [displayTime, setDisplayTime] = useState(time);

	// const updateTime = () => {
	//   time = new Date().toLocaleTimeString();
	//   setDisplayTime(time);
	// };

	// setInterval(updateTime, 1000);

	// useEffect(() => {
	//   if (id === "") return;
	//   apiInstance
	//     .post(`/posts/verify/${id}`, {
	//       input: location,
	//       input1: happening,
	//       input2: by,
	//     })
	//     .then((resp) => {})
	//     .catch((err) => {
	//       console.log(err.response.data.error);
	//     });
	// }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (id === "") return;
		apiInstance
			.post(`/feedbacks/${id}`)
			.then((resp) => {
				// console.log(resp.data);
				nextFunc(resp.data.feedback.id);
			})
			.catch((err) => {
				alert(err.response.data.error);
			});
	}, [id, nextFunc]);

	const onSubmit = async (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append("post", title);
		// data.append("media", file);
		file.map((el) => data.append("media", el));
		data.append("description", description);
		data.append("location", location);
		data.append("happening", happening);
		data.append("by", by);

		async function uploadData() {
			apiInstance
				.post(`/posts`, data)
				.then((resp) => {
					setId(resp.data.data.id);
				})
				.catch((err) => {
					alert(err.response.data.error);
				});
		}
		uploadData();
	};

	const recordImageClick = () => {
		apiInstance
			.post("/clicks", { linkName: "image" })
			.then((resp) => {
				console.log(resp.data);
			})
			.catch((err) => {
				console.log(err.response.data.error);
			});
	};

	const handleImageChange = (e) => {
		console.log(e.target.files);
		if (e.target.files) {
			setFile([...e.target.files]);
			const filesArray = Array.from(e.target.files)
				.filter((file) => file.type.includes("image"))
				.map((file) => URL.createObjectURL(file));
			const videoArray = Array.from(e.target.files)
				.filter((file) => file.type.includes("video"))
				.map((el) => URL.createObjectURL(el));
			setVideo((prev) => prev.concat(videoArray));
			const audioArray = Array.from(e.target.files)
				.filter((file) => file.type.includes("audio"))
				.map((el) => URL.createObjectURL(el));
			setAudio((prev) => prev.concat(audioArray));
			setSelectedFiles((prevImages) => prevImages.concat(filesArray));
			Array.from(e.target.files).map(
				(file) => URL.revokeObjectURL(file) // avoid memory leak
			);
		}
		recordImageClick();
	};

	const renderPhotos = (source) => {
		// console.log("source: ", source);
		return source.map((photo) => {
			return <img src={photo} alt="" key={photo} />;
		});
	};
	const renderVideos = (source) => {
		return source.map((video) => {
			return (
				<video width="400" controls>
					<source src={video} type="video/mp4" />
					Your browser does not support HTML video.
				</video>
			);
		});
	};
	const renderAudio = (source) => {
		return source.map((audio) => {
			return <audio src={audio}></audio>;
		});
	};
	console.log(file);
	return (
		<>
			<div className="post__card">
				<form onSubmit={onSubmit} className="post__form">
					<div className="post__header">
						<span>Report A Case</span>
						{/* <span className="post__date">{displayTime}</span> */}
					</div>
					<div className="post__details">
						<div className="post__inputs">
							<div>
								<span>Title</span>
								<textarea
									className="post__textarea Top"
									name="reportTitle"
									onChange={(event) => {
										const { value } = event.target;
										setTitle(value);
									}}
								></textarea>
							</div>
							<div>
								<span>Description</span>
								<textarea
									className="post__textarea Bottom"
									name="reportDescription"
									maxLength="10000"
									onChange={(event) => {
										const { value } = event.target;
										setDescription(value);
									}}
								></textarea>
							</div>
							<div>
								<span>Location</span>
								<textarea
									className="post__textarea Top"
									name="reportDescription"
									onChange={(event) => {
										const { value } = event.target;
										setLocation(value);
									}}
								></textarea>
							</div>
							<div>
								<span>Is it happening right now ?</span>
								<textarea
									className="post__textarea Top"
									name="reportDescription"
									onChange={(event) => {
										const { value } = event.target;
										setHappening(value);
									}}
								></textarea>
							</div>
							<div>
								<span>Did you record the video or take the picture ?</span>
								<textarea
									className="post__textarea Top"
									name="reportDescription"
									onChange={(event) => {
										const { value } = event.target;
										setBy(value);
									}}
								></textarea>
							</div>
						</div>
					</div>
					<div className="post__bottom">
						<div className="post__button">
							<button type="submit">Post Report</button>
						</div>

						<div className="post__img">
							<span>Click to add image</span>
							<FontAwesomeIcon className="icon" icon={faImage} />
							<input
								type="file"
								multiple
								id="file"
								className="input"
								onChange={handleImageChange}
							/>
						</div>
					</div>
				</form>
				<div className="post__preview">
					{selectedFiles.length > 0 && renderPhotos(selectedFiles)}
					{video.length > 0 && renderVideos(video)}
					{audio.length > 0 && renderAudio(audio)}
				</div>
			</div>
		</>
	);
};

export default PostCard;
