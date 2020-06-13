import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/formList.css';

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

    let formTypes = ['reassesment', 'redo', 'formative-assesment'];
    return (
        <div className="formListContainer">
            <h2>FORMS</h2>
            {
                formTypes.map((form, idx) => (
                    <a href={`/forms/${form}`} className={formStatus[form] ? "formElement disabled": "formElement"} key={idx}>{form.toUpperCase()}</a>
                ))
            }
        </div>
    )
}