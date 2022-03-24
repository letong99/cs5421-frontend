import React from 'react';
import { Route, Switch } from "react-router-dom";
import { ChallengeDetail } from './pages';
import UserProfile from './pages/userProfile/UserProfile.js';
import ChallengesBoard from './pages/challengesBoard/ChallengesBoard.js';
import { Login } from './pages';
import ChallengeCreate from './pages/challengeCreate/ChallengeCreate.js';


const AppRouter = (props) => {
    return (
        <Switch>
            <Route path="/details" component={ChallengeDetail}/> 
            <Route path="/profile" component={UserProfile}/>
            <Route path="/challenges" component={ChallengesBoard}/>
            <Route path="/login" component={Login}/>
            <Route path='/create' component = {ChallengeCreate}/>
        </Switch>
    )
}

export default AppRouter;