import React, { useState } from "react";

const PostsForm = ({ inputs, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2>Submit a new Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          value={inputs.title}
          placeholder="Post Title"
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

export default PostsForm;
