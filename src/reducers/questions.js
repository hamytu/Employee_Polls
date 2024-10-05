import { SET_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      }
    case ANSWER_QUESTION:
      let anotherOption = action.answer === 'optionOne' ? 'optionTwo' : 'optionOne'
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
          ,
          [anotherOption]: {
            ...state[action.qid][anotherOption],
            votes: state[action.qid][anotherOption].votes.filter((user) => user !== action.authedUser)
          },
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      }
    default:
      return state
  }
}
