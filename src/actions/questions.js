import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
export const SET_QUESTIONS = 'SET_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export const handleAddQuestion = (question) => async (dispatch) => {
  dispatch(showLoading('create'))
  await saveQuestion(question)
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading('create')))
}

export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    questions,
  }
}

function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    qid,
    authedUser,
    answer,
  }
}

export function handleAnswerQuestion(info) {
  return (dispatch) => {
    dispatch(answerQuestion(info))
    return saveQuestionAnswer(info).catch((e) => {
      console.warn('Error in handleAnswerQuestion: ', e)
      dispatch(answerQuestion(info))
      alert('The was an error answering the question. Try again.')
    })
  }
}
