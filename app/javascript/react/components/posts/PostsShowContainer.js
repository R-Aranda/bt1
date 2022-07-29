import React, { useEffect, useState } from "react";
import CommentsForm from "../comments/CommentsForm";

const PostsShowContainer = (props) => {
  let postId = props.match.params.id;
  // debugger;
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const [inputs, setInputs] = useState({
    body: "",
    postId: postId,
  });

  const [errors, setErrors] = useState({});

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/v1/posts/${postId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw new Error(errorMessage);
      }
      const currentPost = await response.json();
      setPost(currentPost.post);
      setComments(currentPost.comments);
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const addComment = async (formInput) => {
    try {
      const response = await fetch(`/api/v1/posts/${postId}/comments`, {
        credentials: "same-origin",
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
        debugger;
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
    setInputs({
      body: "",
    });
  };

  const commentsList = comments.map((comment) => {
    return <li key={comment.id}>{comment.body}</li>;
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
      {errorList}
      <CommentsForm
        inputs={inputs}
        setInputs={setInputs}
        handleChange={handleChange}
        addComment={addComment}
        handleSubmit={handleSubmit}
      />
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <h4>Comments:</h4>
      <ul>{commentsList}</ul>
    </div>
  );
};

export default PostsShowContainer;
