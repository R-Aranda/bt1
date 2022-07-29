import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PostsForm from "./PostsForm";

const PostsIndexContainer = (props) => {
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/v1/posts");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw new Error(errorMessage);
      }
      const postData = await response.json();
      console.log("postData:", postData);
      setPosts(postData);
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (formInput) => {
    try {
      const response = await fetch("/api/v1/posts", {
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
      const newPost = await response.json();
      setPosts(posts.concat(newPost));
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
    addPost(inputs);
    setInputs({
      title: "",
      body: "",
    });
  };

  const postsList = posts.map((post) => {
    let postPath = `/posts/${post.id}`;

    return (
      <li key={post.id}>
        <Link to={postPath}>{post.title}</Link>
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
      <h1>List of posts:</h1>
      <ul>{postsList}</ul>
      {errorList}
      <PostsForm
        inputs={inputs}
        setInputs={setInputs}
        handleChange={handleChange}
        addPost={addPost}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PostsIndexContainer;
