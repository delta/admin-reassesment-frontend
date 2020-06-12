import React, { useContext } from 'react';
import { Table, Form, Button } from "react-bootstrap";
import { SubjectListContext } from "../../context/SubjectListContext";

export const SubjectList = () => {
    const { subjectById, subjectAllId, handleAddSubject, handleSubjectChange } = useContext(SubjectListContext);

    return (
        <>
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
                        subjectAllId.map((id, idx) => {
                            return (
                                <tr key={id}>
                                    <td>{idx + 1}</td>
                                    <td><Form.Control type="text" placeholder="CSE" value={subjectById[id].dept} onChange={(e) => handleSubjectChange(id, 'dept', e.target.value)} /></td>
                                    <td><Form.Control type="text" placeholder="CSPC32" value={subjectById[id].subjectCode} onChange={(e) => handleSubjectChange(id, 'subjectCode', e.target.value)} /></td>
                                    <td><Form.Control type="text" placeholder="Social Network Analysis" value={subjectById[id].subjectName} onChange={(e) => handleSubjectChange(id, 'subjectName', e.target.value)} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}