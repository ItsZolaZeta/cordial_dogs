import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import BlogPost from "./components/blogpost";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/blogpost" component={BlogPost} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;