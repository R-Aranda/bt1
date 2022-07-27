import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostsContainer from "./posts/PostsContainer";

export const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/posts" component={PostsContainer} />
      </Switch>
    </Router>
  );
};

export default App;
