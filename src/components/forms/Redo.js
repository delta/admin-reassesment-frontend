import React, { useState } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import './forms.css';


let subjectId = 0;

export const Redo = () => {

	const departmentList = ['CSE', 'ECE', 'ICE', 'Mech', 'Meta'];
	const statusList = ['Regular', 'Passed Out']
	const startBatch = 2012;
	const endBatch = 2019;

	let batchOptions = [];
	for (let i = startBatch; i <= endBatch; ++i) batchOptions.push(i);


	const [name, setName] = useState('');
	const [roll, setRoll] = useState('');
	const [department, setDepartment] = useState(departmentList[0]);
	const [batch, setBatch] = useState(batchOptions[0]);
	const [status, setStatus] = useState(statusList[0]);
	const [subject, setSubject] = useState({ subjectById: {}, subjectAllId: [] });




	const handleAddSubject = () => {
		let id = `subject${subjectId}`;
		setSubject({
			subjectById: {
				...subject.subjectById,
				[id]: {
					dept: '',
					subjectCode: '',
					subjectName: ''
				},
			},
			subjectAllId: [...subject.subjectAllId, id]
		})
		subjectId += 1;
	}

	const handleSubjectChange = (id, field, value) => {
		setSubject({
			...subject,
			subjectById: {
				...subject.subjectById,
				[id]: {
					...subject.subjectById[id],
					[field]: value
				}
			}
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(name, roll, department, status, subject)
	}

	return (
		<Form>
			<Form.Group >
				<Form.Label>Name</Form.Label>
				<Form.Control type="text" placeholder="Shivasis Padhi" value={name} onChange={(e) => setName(e.target.value)} />
			</Form.Group>
			<Form.Group >
				<Form.Label>Roll No.</Form.Label>
				<Form.Control type="number" placeholder="107116121" value={roll} onChange={(e) => setRoll(e.target.value)} />
			</Form.Group>
			<Form.Group >
				<Form.Label>Department</Form.Label>
				<Form.Control as="select" value={department} onChange={(e) => setDepartment(e.target.value)}>
					{departmentList.map((dept, idx) => <option key={idx}>{dept}</option>)}
				</Form.Control>
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
			<h4 style={{ display: 'inline' }}>Subject Details</h4>
			<Button style={{ float: 'right', padding: 5, marginBottom: 5 }} onClick={handleAddSubject}>Add Subject</Button>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Dept</th>
						<th>Subject Code</th>
						<th>Name of the Subject</th>
					</tr>
				</thead>
				<tbody>
					{
						subject.subjectAllId.map((id, idx) => {
							console.log("iddas", id)
							return (
								<tr key={id}>
									<td>{idx + 1}</td>
									<td><Form.Control type="text" placeholder="CSE" value={subject.subjectById[id].dept} onChange={(e) => handleSubjectChange(id, 'dept', e.target.value)} /></td>
									<td><Form.Control type="text" placeholder="CSPC32" value={subject.subjectById[id].subjectCode} onChange={(e) => handleSubjectChange(id, 'subjectCode', e.target.value)} /></td>
									<td><Form.Control type="text" placeholder="Social Network Analysis" value={subject.subjectById[id].subjectName} onChange={(e) => handleSubjectChange(id, 'subjectName', e.target.value)} /></td>
								</tr>
							)
						})
					}
				</tbody>
			</Table>
			<h4>Fee Paid Details of Re Do</h4>
			<Form.Group >
				<Form.Label>Number of Subject fees paid</Form.Label>
				<Form.Control type="number" placeholder="4" />
			</Form.Group>
			<Form.Group >
				<Form.Label>Total Amount (in ₹)</Form.Label>
				<Form.Control type="number" placeholder="2000" />
			</Form.Group>
			<Form.Group >
				<Form.Label>Mark Sheet</Form.Label>
				<Form.Control type="text" value={"₹ 30"} disabled />
			</Form.Group>
			<Form.Group >
				<Form.Label>SBI Collect Reference Number</Form.Label>
				<Form.Control type="text" placeholder="" />
			</Form.Group>
			<Form.Group >
				<Form.Label>Bank Reference Number</Form.Label>
				<Form.Control type="text" placeholder="" />
			</Form.Group>
			<Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
				SUBMIT
  		</Button>

		</Form>
	)
}