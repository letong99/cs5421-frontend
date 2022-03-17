import React from 'react';
import { Route, Switch } from "react-router-dom";
import { ChallengeDetail } from './pages';

const AppRouter = (props) => {
    return (
        <Switch>
            <Route path="/details" component={ChallengeDetail}/>
        </Switch>
    )
}

export default AppRouter;