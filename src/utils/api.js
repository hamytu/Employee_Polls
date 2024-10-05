import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
    _login,
    _logout
} from './_DATA.js'

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveQuestion(info) {
    return _saveQuestion(info)
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info)
}

export function login(username) {
    return _login(username)
}
export function logout(){
    return _logout()
}