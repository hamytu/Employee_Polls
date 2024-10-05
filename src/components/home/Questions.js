import { connect } from 'react-redux'
import QuestionCard from './QuestionCard'
import Grid from '@mui/material/Grid'
const Questions = ({ users, authedUser, isDone, questions }) => {
    let questionsFiltered = []

    let questionsAnswered = []
    let questionsIdsAnswered
    if (authedUser !== null && authedUser !== '') {
        questionsIdsAnswered = Object.keys(users[authedUser].answers)
        questionsAnswered = questionsIdsAnswered.map((id) => Object.assign(questions[id], { isDone: true }))

        if (isDone) {
            questionsFiltered = questionsAnswered
        } else {
            questionsFiltered =
                Object.entries(questions)
                    .filter(
                        (qE) => !questionsIdsAnswered.includes(qE[1].id)
                    )
                    .map(q => Object.assign(q[1], { isDone: false }))
        }
        questionsFiltered = questionsFiltered.sort((a, b) => b.timestamp - a.timestamp)
    }
    return (
        <Grid container alignItems='center'>
            {questionsFiltered.map((content) =>
                <QuestionCard key={content.id} content={content} />
            )}
        </Grid>
    )
}

const mapStateToProps = ({ authedUser, users, questions }) => ({
    authedUser,
    users,
    questions
})

export default connect(mapStateToProps)(Questions)
