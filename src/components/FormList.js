import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const FormList = () => {
    const [formStatus, setformStatus] = useState({});
    let data = {}
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

    let formTypes = ['reassesment', 'redo', 'formattive-assesment'];
    return (
        <div>
            {
                formTypes.map(form => (
                    formStatus[form] ?
                    <li>{form}</li>:
                    <li><b>{form}</b></li>
                ))
            }
        </div>
    )
}