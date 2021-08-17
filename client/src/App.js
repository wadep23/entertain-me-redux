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
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import Movie from "./pages/Movie";
import Tv from "./pages/Tv";

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
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/profile/:username?" component={Profile} />
            <Route exact path="/tv" component={Tv} />
            <Route exact path="/movie" component={Movie} />
            <Route exact path="/game" component={Game} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
