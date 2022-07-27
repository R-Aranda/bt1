import React, { useState, useEffect } from "react";

const PostsContainer = (props) => {
  const [posts, setPosts] = useState([]);
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  const fetchData = async () => {
    try {
      const response = await fetch("/api/v1/posts");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const postData = await response.json();
      console.log("postData:", postData);
      setPosts(postData);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let postTiles = posts.map((post) => {
    return <li key={post.id}>{post.title}</li>;
  });

  const handleChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/v1/posts", {
      method: "POST",
      body: JSON.stringify({ ...inputs }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const parsedResponse = await response.json();
    setPosts(posts.concat(parsedResponse));
  };

  return (
    <div>
      <h3> Post Index Container </h3>
      {postTiles}

      <h3>Submit New Post</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          value={inputs.title}
          placeholder="Title"
        />
        <input
          type="text"
          onChange={handleChange}
          name="body"
          value={inputs.body}
          placeholder="Post Description"
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default PostsContainer;
