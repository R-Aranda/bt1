import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CommentsForm from "./CommentsForm";

const CommentsIndexContainer = (props) => {
  const [comments, setComments] = useState([]);
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState("");

  const addComment = async (formInput) => {
    try {
      const response = await fetch("/api/v1/comments", {
        method: "POST",
        body: JSON.stringify(formInput),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        if (response.status == "400") {
          const errorsData = await response.json();
          setErrors(errorsData);
        }
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const newComment = await response.json();
      setComments(comments.concat(newComment));
    } catch (err) {
      console.error(`Error in fetch ${err.message}`);
    }
  };

  const handleChange = (event) => {
    setInputs({
      ...inputs,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addComment(inputs);
    setInputs("");
  };

  const commentsList = comments.map((comment) => {
    let commentPath = `/comments/${comment.id}`;

    return (
      <li key={comment.id}>
        <Link to={commentPath}>{comment.title}</Link>
      </li>
    );
  });

  let errorList;
  if (errors.error) {
    errorList = errors.error.map((err) => {
      return (
        <ul>
          <li>{err}</li>
        </ul>
      );
    });
  }

  return (
    <div>
      <h1>List of commentss:</h1>
      <ul>{commentsList}</ul>
      {errorList}
      <CommentsForm
        inputs={inputs}
        setInputs={setInputs}
        handleChange={handleChange}
        addComment={addComment}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CommentsIndexContainer;
