import React, { useState, useContext, useEffect } from 'react';
import { Form, Alert, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';
import { SubjectListContext } from '../../context/SubjectListContext';
import { SubjectList } from './SubjectList';
import { useRouteMatch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { getUserRoll } from '../../utils/authUtils'
import {
    departmentList, statusList, degreeList, masterSemesterOptions, ugBatchOptions, semesterOptions,
    specialisations, masterBatchOptions
} from './constants'

export const Arrears = ({ formStatus }) => {

    const isPg = String(getUserRoll())[0] === '2';
    let batchOptions = isPg ? masterBatchOptions : ugBatchOptions;

    const [name, setName] = useState('');
    const [roll, setRoll] = useState(getUserRoll());
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState(departmentList[0]);
    const [batch, setBatch] = useState(batchOptions[0]);
    const [status, setStatus] = useState(statusList[0]);
    const [semester, setSemester] = useState(1);
    const [feeDetails, setFeeDetails] = useState('');
    const [feeSubjectNo, setFeeSubjectNo] = useState(0);
    const [feeTotal, setFeeTotal] = useState(0);
    const [feeSbiRef, setFeeSbiRef] = useState('');
    const [feeBankRef, setFeeBankRef] = useState('');
    const [errors, setErrors] = useState([]);

    const { loading, toggleLoading } = useContext(GlobalContext);
    const { subjectById, subjectAllId } = useContext(SubjectListContext);

    /* for masters course */
    const [degree, setDegree] = useState(degreeList[0]);
    const [specialisation, setSpecialisation] = useState(null);

    let { url } = useRouteMatch();
    let formType = url.split('/').slice(-1)[0];

    const addRedoForm = async (redoFormData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        toggleLoading();
        try {
            const res = await axios.post('/api/v1/forms/arrear', redoFormData, config);
            console.log(res);
            window.location.href = '/forms';
        } catch (err) {
            console.log(err);
            setErrors(["Internal Server Error"])
        }
        toggleLoading();
    }

    const validateForm = (data) => {
        let err = [];
        if (!data.name) err.push('Please fill Name');
        if (!data.roll) err.push('Please fill Roll No');
        if (!data.batch) err.push('Please fill batch');
        if (!data.status) err.push('Please fill status');
        if (!data.examType) err.push('Please fill exam type');
        if (!data.feeDetails) err.push('Please fill fee details');
        if (!data.feeSubjectNo) err.push('Please fill fee subject No');
        if (!data.feeTotal) err.push('Please fill fee total');
        if (!data.feeSbiRef) err.push('Please fill fee SBI ref');
        if (!data.subject.length) err.push('Please fill atleast 1 subject');
        data.subject.forEach((sub, idx) => {
            Object.keys(sub).forEach(key => {
                if (!sub[key]) err.push(`${key.toUpperCase()} not filled for subject ${idx + 1}`);
            })
        })

        setErrors([...err]);

        if (err.length === 0)
            return true;
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {};
        data.name = name;
        data.roll = roll;
        data.department = department;
        data.batch = batch;
        data.status = status;
        data.semester = semester;
        data.examType = formType;
        data.feeDetails = feeDetails;
        data.feeSubjectNo = feeSubjectNo;
        data.feeTotal = feeTotal;
        data.feeSbiRef = feeSbiRef;
        data.feeBankRef = feeBankRef;
        data.phone = phone;
        console.log(data);
        if (String(roll)[0] === '2') {
            data.degree = degree;
            data.course = "PG";
            data.department = "";
            if (specialisation !== null) data.specialisation = specialisation;
        }

        let subjects = [];
        subjectAllId.forEach(sub => subjects.push(subjectById[sub]));
        data.subject = subjects;

        if (validateForm(data))
            addRedoForm(data);
        else window.scrollTo(0, 0);
    }
    useEffect(() => {
        if ((degree === "MCA" || degree === 'MBA') && specialisation === null) setSpecialisation(null);
        else setSpecialisation(specialisations[degree][0]);
    }, [degree])

    const LoadingComponent =
        <Button variant="primary" disabled style={{
            top: '45%',
            left: '45%',
            marginRight: '-50%', position: 'absolute'
        }}>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Loading...
        </Button>

    const getFormName = (formType) => {
        switch (formType) {
            case 'reassesment':
                return 'Re Assesment Form'
            case 'redo':
                return 'Redo Form'
            case 'formative-assesment':
                return 'Formative Assesment'
            default:
                return 'Redo Form'
        }
    }

    const getRegLink = (formType) => {
        if (formType === 'redo') {
            if (String(roll)[0] !== '2')
                return [
                    {
                        link: "https://delta.nitt.edu/~nimish/redo-barch.pdf",
                        name: "NIT-T/DA/B.Arch./Summer Term/2020"
                    },
                    {
                        link: "https://delta.nitt.edu/~nimish/redo-btech.pdf",
                        name: "NIT-T/DA/ B. Tech./Summer Term/2020"
                    }];
            else return [{ link: "https://delta.nitt.edu/~nimish/redo_mtech.pdf", name: "NITT/AO/PG-Summer Term/ 2020/91 " }]
        }
        else return [];
    }



    if (loading) return LoadingComponent;
    return (
        <>
            {
                formStatus[formType] ? <Redirect to='/forms' /> : ''
            }
            {
                formType !== 'redo' ? <Redirect to='/forms' /> : ''
            }
            {
                errors.length ?
                    <Alert variant={"danger"}>
                        {
                            errors.map((err, idx) => (
                                <li key={idx}>{err}</li>
                            ))
                        }
                    </Alert> : ''
            }
            <Form>
                <h1 className="header">{getFormName(formType)}</h1>
                <Form.Group >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Roll No.</Form.Label>
                    <Form.Control type="number" placeholder="" value={roll} onChange={(e) => setRoll(e.target.value)} disabled />
                </Form.Group>
                {
                    String(roll)[0] === '2' ? (
                        <>
                            <Form.Group >
                                <Form.Label>Degree</Form.Label>
                                <Form.Control as="select" value={degree} onChange={(e) => setDegree(e.target.value)}>
                                    {degreeList.map((dept, idx) => <option key={idx}>{dept}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Semester</Form.Label>
                                <Form.Control as="select" value={semester} onChange={(e) => setSemester(e.target.value)}>
                                    {Array(masterSemesterOptions[degree]).fill().map((_, idx) => <option key={idx}>{idx + 1}</option>)}
                                </Form.Control>
                            </Form.Group>
                            {specialisations[degree].length > 0 && (
                                <Form.Group>
                                    <Form.Label>Specialisation</Form.Label>
                                    <Form.Control as="select" value={specialisation} onChange={(e) => setSpecialisation(e.target.value)}>
                                        {specialisations[degree].map((sp, idx) => <option key={idx}>{sp}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            )}
                        </>
                    ) : (
                            <Form.Group >
                                <Form.Label>Department</Form.Label>
                                <Form.Control as="select" value={department} onChange={(e) => setDepartment(e.target.value)}>
                                    {departmentList.map((dept, idx) => <option key={idx}>{dept}</option>)}
                                </Form.Control>
                            </Form.Group>
                        )
                }
                <Form.Group >
                    <Form.Label>Phone No.</Form.Label>
                    <Form.Control type="number" placeholder="9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Batch</Form.Label>
                    <Form.Control as="select" value={batch} onChange={(e) => setBatch(e.target.value)}>
                        {batchOptions.map((batch, idx) => <option key={idx}>{batch}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        {statusList.map((status, idx) => <option key={idx}>{status}</option>)}
                    </Form.Control>
                </Form.Group>
                {
                    status === 'Regular' ? (
                        <Form.Group >
                            <Form.Label>Semester Presently Studying in</Form.Label>
                            <Form.Control as="select" value={semester} onChange={(e) => setSemester(e.target.value)}>
                                {semesterOptions.map((status, idx) => <option key={idx}>{status}</option>)}
                            </Form.Control>
                        </Form.Group>) : null
                }
                <SubjectList />
                <Form.Group >
                    <Form.Label>Fee Details</Form.Label>
                    <Form.Control as="textarea" value={feeDetails} onChange={(e) => setFeeDetails(e.target.value)} />
                </Form.Group>
                <h3>Notices</h3>
                <p>
                    {
                        getRegLink(formType).map((linkObj, idx) => (
                            <li key={idx}><a href={linkObj.link}>{linkObj.name}</a></li>
                        ))
                    }
                </p>
                <hr />
                <h4>Payment Details</h4>
                <h5>Fee Paid Details of {formType} 2020</h5>
                <Form.Group >
                    <Form.Label>Number of Subject fees paid</Form.Label>
                    <Form.Control type="number" placeholder="4" value={feeSubjectNo} onChange={(e) => setFeeSubjectNo(e.target.value)} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Total Amount (in ₹)</Form.Label>
                    <Form.Control type="number" placeholder="2000" value={feeTotal} onChange={(e) => setFeeTotal(e.target.value)} />
                </Form.Group>
                {
                    formType !== 'redo' ?
                        <Form.Group >
                            <Form.Label>Mark Sheet</Form.Label>
                            <Form.Control type="text" value={"₹ 30"} disabled />
                        </Form.Group> : ''
                }
                <Form.Group >
                    <Form.Label>SBI Collect Reference Number</Form.Label>
                    <Form.Control type="text" placeholder="" value={feeSbiRef} onChange={(e) => setFeeSbiRef(e.target.value)} />
                </Form.Group>
                {
                    formType !== 'redo' ?
                        <Form.Group >
                            <Form.Label>Bank Reference Number</Form.Label>
                            <Form.Control type="text" placeholder="" value={feeBankRef} onChange={(e) => setFeeBankRef(e.target.value)} />
                        </Form.Group>:''
                }
                <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                    SUBMIT
        </Button>

            </Form>
        </>
    )
}