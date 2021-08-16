import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
// import SignUpForm from "./components/SignUpForm";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Media from "./components/Media";
require("dotenv").config();

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("user_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          {/* <Navbar />
          <Switch>
            <Login />
          </Switch>
          <Profile /> */}
        <Media />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
