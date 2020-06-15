import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/formList.css';
import { Link } from 'react-router-dom';

export const FormList = ({formStatus}) => {
    let formTypes = ['reassesment', 'redo', 'formative-assesment'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(2020, 5, 15);
    const endDate = new Date(2020, 5, 22);

    const checkStatus = form => {
        const temp = new Date(startDate);
        if (form != 'redo') {
            temp.setDate(temp.getDate() + 2);
            return formStatus[form] && (temp > today || today > endDate)
        }
        return formStatus[form] && (temp > today || today > endDate)
    }
    return (
        <div className="formListContainer">
            <h2>FORMS</h2>
            {
                formTypes.map((form, idx) => (
                    <Link to={`/forms/${form}`} className={checkStatus(form) ? "formElement disabled": "formElement"} key={idx}>{form.toUpperCase()}</Link>
                ))
            }
        </div>
    )
}