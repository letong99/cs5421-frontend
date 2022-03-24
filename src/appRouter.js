import React from "react";
import { Route, Switch } from "react-router-dom";
import { ChallengeDetail } from "./pages";
import ChallengesBoard from "./pages/challengesBoard/ChallengesBoard.js";
import { Login } from "./pages";
import ChallengeCreate from "./pages/challengeCreate/ChallengeCreate.js";
import ProfileContent from "./pages/userProfile/ProfileContent";
import NavigatorBar from "./components/NavigatorBar";

const AppRouter = (props) => {
  return (
    <Switch>
      <Route path="/details/:id">
          <NavigatorBar component={<ChallengeDetail />} />
      </Route>
      <Route path="/profile">
          <NavigatorBar component={<ProfileContent />} />
      </Route>
      <Route path="/challenges" >
          <NavigatorBar component={<ChallengesBoard />} />
      </Route>
      <Route path="/create" >
          <NavigatorBar component={<ChallengeCreate />} />
      </Route>
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default AppRouter;
