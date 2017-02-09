import {createAction} from 'redux-actions'

export const fetchData = createAction('FETCH_DATA', data => {
    return Promise.resolve(data).then(data => {
        return {
            data: data
        }
    })
})