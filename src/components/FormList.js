import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/formList.css';
import { Link } from 'react-router-dom';

export const FormList = ({formStatus}) => {
    let formTypes = [ 'redo'];
    return (
        <div className="formListContainer">
            <h2>FORMS</h2>
            {
                formTypes.map((form, idx) => (
                    <Link to={`/forms/${form}`} className={formStatus[form] ? "formElement disabled": "formElement"} key={idx}>{form.toUpperCase()}</Link>
                ))
            }
        </div>
    )
}