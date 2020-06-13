import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { FormList } from './FormList';
import { Arrears } from './forms/Arrears';
import axios from 'axios';

export const Main = () => {
    let { path } = useRouteMatch();

    const [formStatus, setformStatus] = useState({});
    useEffect(() => {
        try {
            const getFormStatus = async () => {
                let formFilled = await axios.get('/api/v1/forms/arrear');
                formFilled = formFilled.data.data;
                setformStatus({
                    ...formFilled
                })
            }
            getFormStatus();
        } catch (err) {
            console.log(err)
        }
    }, [])

    return (
        <div>
            <Switch>
                <Route exact path={`${path}/`}>
                    <FormList formStatus={formStatus} />
                </Route>
                <Route exact path={`${path}/(redo|reassesment|formative-assesment)`}>
                    <Arrears formStatus={formStatus} />
                </Route>
            </Switch>
        </div>
    )
}