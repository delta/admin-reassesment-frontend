import React from 'react';
import { Redo } from './forms/Redo';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { FormList } from './FormList';
import { FormattiveAssesment } from './forms/FormativeAssesment';
import { ReAssesment } from './forms/ReAssesment';

export const Main = () => {
    let { path } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route exact path={`${path}/`}>
                    <FormList />
                </Route>
                <Route exact path={`${path}/redo`}>
                    <Redo />
                </Route>
                <Route exact path={`${path}/reassesment`}>
                    <ReAssesment />
                </Route>
                <Route exact path={`${path}/formative-assesment`}>
                    <FormattiveAssesment />
                </Route>
            </Switch>
        </div>
    )
}