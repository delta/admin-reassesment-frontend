import React, { createContext, useReducer } from 'react';
import SubjectListReducer from './reducers/SubjectListReducer';

let subjectId = 0;
const initialState = {
    subjectById: {},
    subjectAllId: []
}

export const SubjectListContext = createContext(initialState);

export const SubjectListProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SubjectListReducer, initialState);

    const handleAddSubject = () => {
        let id = `subject${subjectId}`;
        dispatch({
            id,
            type: 'ADD_SUBJECT'
        })
        subjectId += 1;
    };

    const handleSubjectChange = (id, field, value) => {
        dispatch({
            type: 'CHANGE_SUBJECT',
            id,
            field,
            value
        })
    }
    
    return (
        <SubjectListContext.Provider value={{
            subjectById: state.subjectById,
            subjectAllId: state.subjectAllId,
            handleAddSubject,
            handleSubjectChange
        }}>
            {children}
        </SubjectListContext.Provider>
    )
}