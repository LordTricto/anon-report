import "./style.css";

import React, { useState } from "react";

import { apiInstance } from "../../utils/utils";

const ChatbotModal = ({ closeFunc, feedbackId }) => {
  const [stage, setStage] = useState(1);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const getQuestion = (number, stage) => {
    console.log(number);
    // console.log(stage);
    apiInstance
      .get(`/feedbacks/questions/${feedbackId}`, {
        params: {
          number,
        },
      })
      .then((resp) => {
        const {
          data: { data },
        } = resp;
        setQuestion(data);
        setStage(stage);
        setAnswer(() => "");
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const saveAnswer = (answer, number, question, stage) => {
    // console.log(question);
    apiInstance
      .patch(
        `/feedbacks/answers/${feedbackId}`,
        {
          answer,
        },
        {
          params: {
            number,
          },
        }
      )
      .then((resp) => {
        const {
          data: { data },
        } = resp;
        console.log(data);
        setAnswer(() => "");
        question === null ? setStage(6) : getQuestion(question, stage);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };
  // console.log(answer);
  return (
    <div className="modal__container">
      <div className="modal__content">
        {stage === 1 ? (
          <>
            <div className="modal__top">
              <h2>Thank you for reporting a case</h2>
              <span>We would like to ask you a few questions </span>
            </div>
            <div
              className="modal__button"
              onClick={() => {
                getQuestion(1, 2);
              }}
            >
              Next
            </div>
          </>
        ) : stage === 2 ? (
          <>
            <div className="modal__top">
              <h2>Question 1</h2>
              <span> {question} </span>
              <div>
                <textarea
                  className="modal__textarea Top"
                  name="Answer"
                  value={answer}
                  onChange={(event) => {
                    const { value } = event.target;
                    setAnswer(value);
                  }}
                ></textarea>
              </div>
            </div>
            <div
              className="modal__button"
              onClick={() => {
                saveAnswer(answer, 1, 2, 3);
              }}
            >
              Next
            </div>
          </>
        ) : stage === 3 ? (
          <>
            <div className="modal__top">
              <h2>Question 2</h2>
              <span> {question} </span>
              <textarea
                className="modal__textarea Top"
                name="Answer"
                value={answer}
                onChange={(event) => {
                  const { value } = event.target;
                  setAnswer(value);
                }}
              ></textarea>
            </div>
            <div
              className="modal__button"
              onClick={() => saveAnswer(answer, 2, 3, 4)}
            >
              Next
            </div>
          </>
        ) : stage === 4 ? (
          <>
            <div className="modal__top">
              <h2>Question 3</h2>
              <span> {question} </span>
              <textarea
                className="modal__textarea Top"
                name="Answer"
                value={answer}
                onChange={(event) => {
                  const { value } = event.target;
                  setAnswer(value);
                }}
              ></textarea>
            </div>
            <div
              className="modal__button"
              onClick={() => saveAnswer(answer, 3, 4, 5)}
            >
              Next
            </div>
          </>
        ) : stage === 5 ? (
          <>
            <div className="modal__top">
              <h2>Question 4</h2>
              <span> {question} </span>
              <textarea
                className="modal__textarea Top"
                name="Answer"
                value={answer}
                onChange={(event) => {
                  const { value } = event.target;
                  setAnswer(value);
                }}
              ></textarea>
            </div>
            <div
              className="modal__button"
              onClick={() => saveAnswer(answer, 4, null, null)}
            >
              Next
            </div>
          </>
        ) : (
          <>
            <div className="modal__top">
              <h2>Thank you!</h2>
            </div>
            <div className="modal__button" onClick={closeFunc}>
              Close
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatbotModal;
