import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
import StatefulRoute from "./components/StatefulRoute"
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import Diagnose from "./views/Diagnose";
import Learner from "./views/Learner";
import { useAuth0 } from "./react-auth0-spa";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
// styles
import "./App.css";


// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import  TheApp  from "./views/TheApp";
initFontAwesome();

const App = () => {

  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile" component={Profile}  />
            <PrivateRoute path="/external-api" component={ExternalApi} />          
            <PrivateRoute path="/theapp" component={TheApp} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
