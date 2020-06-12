export default (state, action) => {
    switch (action.type) {
        case 'ADD_SUBJECT':
            {
                let { id } = action;
                return {
                    ...state,
                    subjectById: {
                        ...state.subjectById,
                        [id]: {
                            dept: '',
                            subjectCode: '',
                            subjectName: ''
                        }
                    },
                    subjectAllId: [...state.subjectAllId, id]
                }
            }
        case 'CHANGE_SUBJECT':
            {
                let { id, field, value } = action;
                return {
                    ...state,
                    subjectById: {
                        ...state.subjectById,
                        [id]: {
                            ...state.subjectById[id],
                            [field]: value
                        }
                    }
                }
            }
        default:
            return state;
    }
}