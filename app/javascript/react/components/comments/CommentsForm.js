import React from "react";

const CommentsForm = ({ inputs, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2>Submit a new Comment</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="body"
          value={inputs.body}
          placeholder="Your comment..."
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default CommentsForm;
