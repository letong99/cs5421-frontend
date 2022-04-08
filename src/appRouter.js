import React from "react";
import { Route, Switch } from "react-router-dom";
import { ChallengeDetail } from "./pages";
import ChallengesBoard from "./pages/challengesBoard/ChallengesBoard.js";
import { Login } from "./pages";
import ProfileContent from "./pages/userProfile/ProfileContent";
import NavigatorBar from "./components/NavigatorBar";
import { useCurrentUser } from "./components/CurrentUserContext";
import NotFoundPage from "./components/NotFoundPage";

const AppRouter = (props) => {
  const { currentUser, currentUserRole } = useCurrentUser();

  return (
    <Switch>
      <Route path="/details/:id">
        {currentUser === "null" ||
        currentUser === "" ||
        currentUser === null ? (
          <NotFoundPage errorText={"Please login first"} />
        ) : (
          <NavigatorBar component={<ChallengeDetail />} />
        )}
      </Route>
      <Route path="/profile">
        {currentUser === "null" ||
        currentUser === "" ||
        currentUser === null ? (
          <NotFoundPage errorText={"Please login first"} />
        ) : (
          <NavigatorBar component={<ProfileContent />} />
        )}
      </Route>
      <Route path="/challenges">
        {currentUser === "null" ||
        currentUser === "" ||
        currentUser === null ? (
          <NotFoundPage errorText={"Please login first"} />
        ) : (
          <NavigatorBar component={<ChallengesBoard />} />
        )}
      </Route>

      <Route path="/login">
        {currentUser === "null" ||
        currentUser === "" ||
        currentUser === null ? (
          <Login />
        ) : (
          <NotFoundPage errorText={"Please logout first"} />
        )}
      </Route>
      <Route path="/">
        {currentUser === "null" ||
        currentUser === "" ||
        currentUser === null ? (
          <Login />
        ) : (
          <NotFoundPage errorText={"Please logout first"} />
        )}
      </Route>
    </Switch>
  );
};

export default AppRouter;
