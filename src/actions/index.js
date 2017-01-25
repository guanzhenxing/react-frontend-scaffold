import {CALL_API, Schemas} from '../middlewares/api'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'


const fetchUser = login => ({
    [CALL_API]: {
        types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
        endpoint: `users/${login}`,
        schema: Schemas.USER
    }
})


export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
    const user = getState().entities.users[login]
    if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
        return null
    }

    return dispatch(fetchUser(login))
}

export const REPO_REQUEST = 'REPO_REQUEST'
export const REPO_SUCCESS = 'REPO_SUCCESS'
export const REPO_FAILURE = 'REPO_FAILURE'

const fetchRepo = fullName => ({
    [CALL_API]: {
        types: [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE],
        endpoint: `repos/${fullName}`,
        schema: Schemas.REPO
    }
})


export const loadRepo = (fullName, requiredFields = []) => (dispatch, getState) => {
    const repo = getState().entities.repos[fullName]
    if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
        return null
    }

    return dispatch(fetchRepo(fullName))
}

export const STARRED_REQUEST = 'STARRED_REQUEST'
export const STARRED_SUCCESS = 'STARRED_SUCCESS'
export const STARRED_FAILURE = 'STARRED_FAILURE'


const fetchStarred = (login, nextPageUrl) => ({
    login,
    [CALL_API]: {
        types: [STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE],
        endpoint: nextPageUrl,
        schema: Schemas.REPO_ARRAY
    }
})


export const loadStarred = (login, nextPage) => (dispatch, getState) => {
    const {
        nextPageUrl = `users/${login}/starred`,
        pageCount = 0
    } = getState().pagination.starredByUser[login] || {}

    if (pageCount > 0 && !nextPage) {
        return null
    }

    return dispatch(fetchStarred(login, nextPageUrl))
}

export const STARGAZERS_REQUEST = 'STARGAZERS_REQUEST'
export const STARGAZERS_SUCCESS = 'STARGAZERS_SUCCESS'
export const STARGAZERS_FAILURE = 'STARGAZERS_FAILURE'


const fetchStargazers = (fullName, nextPageUrl) => ({
    fullName,
    [CALL_API]: {
        types: [STARGAZERS_REQUEST, STARGAZERS_SUCCESS, STARGAZERS_FAILURE],
        endpoint: nextPageUrl,
        schema: Schemas.USER_ARRAY
    }
})


export const loadStargazers = (fullName, nextPage) => (dispatch, getState) => {
    const {
        nextPageUrl = `repos/${fullName}/stargazers`,
        pageCount = 0
    } = getState().pagination.stargazersByRepo[fullName] || {}

    if (pageCount > 0 && !nextPage) {
        return null
    }

    return dispatch(fetchStargazers(fullName, nextPageUrl))
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'


export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})
