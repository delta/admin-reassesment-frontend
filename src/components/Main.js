import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { FormList } from './FormList';
import { Arrears } from './forms/Arrears';

export const Main = () => {
    let { path } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route exact path={`${path}/`}>
                    <FormList />
                </Route>
                <Route exact path={`${path}/(redo|reassesment|formative-assesment)`}>
                    <Arrears />
                </Route>
            </Switch>
        </div>
    )
}