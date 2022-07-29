import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PostsIndexContainer from "../components/posts/PostsIndexContainer";
import PostsForm from "../components/posts/PostsForm";
import PostsShowContainer from "../components/posts/PostsShowContainer";

export const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/posts" component={PostsIndexContainer} />
        <Route exact path="/posts/new" component={PostsForm} />
        <Route exact path="/posts/:id" component={PostsShowContainer} />
        <Route exact path="/" component={PostsIndexContainer} />
      </Switch>
    </Router>
  );
};

export default App;
