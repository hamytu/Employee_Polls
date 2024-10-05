import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Badge from '@mui/material/Badge'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useLocation, Navigate } from 'react-router'
import { handleAnswerQuestion } from '../../actions/questions'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import * as utils from '../../utils/appUtils'
const QuestionDetail = ({ authedUser, questions, users, loading, dispatch }) => {
    const location = useLocation();
    const { question_id } = useParams();
    let questionDetail, isDone, isSelectedOptionOne, numOfUsersOnOne, numOfUsersOnTwo, percentageOnOne
    questionDetail = questions[question_id]
    if (authedUser && questionDetail) {
        isDone = Object.keys(users[authedUser]?.answers).includes(question_id) ? true : false
        if (isDone) {
            isSelectedOptionOne = questionDetail.optionOne.votes.includes(authedUser) ? true : false
        }
        numOfUsersOnOne = questionDetail.optionOne.votes.length
        numOfUsersOnTwo = questionDetail.optionTwo.votes.length
        percentageOnOne = numOfUsersOnOne / (numOfUsersOnOne + numOfUsersOnTwo) * 100
    }
    
    const optionClick = (event, qid, answer) => {
        event.preventDefault()
        const info = { authedUser, qid, answer }
        dispatch(handleAnswerQuestion(info))
    }

    return (
        loading ? (<Navigate to="/login" replace state={{ path: location.pathname }} />) :
            questionDetail ? <Card sx={{ width: '100%', backgroundColor: `${isDone ? '#91f1c0' : '#dfc4df'}` }}>
                <CardHeader
                    avatar={
                        <Avatar src={users[questionDetail.author].avatarURL} />
                    }
                    title={questionDetail.author}
                    subheader={utils.getDatetimeFromUnix(questionDetail.timestamp)}
                />
                <CardContent>
                    {!isDone && <Typography variant='h5' component='div'>Would You Rather</Typography>}
                    <Grid container spacing={4} direction='row'
                        justifyContent='center'
                        marginTop={0}
                        alignItems='center'>
                        <Grid item xs={6}>
                            <Badge sx={{ width: '90%' }} badgeContent={`vote: ${numOfUsersOnOne}`} color='info' invisible={!isDone} showZero={true}>
                                <Card sx={{ width: '100%', background: `${isSelectedOptionOne ? '#A8CD9F' : 'white'}` }}>
                                    <CardHeader
                                        title={questionDetail.optionOne.text}
                                    />
                                    <CardContent>
                                        {isDone ? `${percentageOnOne}%` : <Button size='large' onClick={(e) => optionClick(e, questionDetail.id, 'optionOne')}>CLICK</Button>}
                                    </CardContent>
                                </Card>
                            </Badge>
                        </Grid>
                        <Grid item xs={6}>
                            <Badge sx={{ width: '90%' }} badgeContent={`vote: ${numOfUsersOnTwo}`} color='info' invisible={!isDone} showZero={true}>
                                <Card sx={{ width: '100%', background: `${isSelectedOptionOne === false ? '#A8CD9F' : 'white'}` }}>
                                    <CardHeader
                                        title={questionDetail.optionTwo.text}
                                    />
                                    <CardContent>
                                        {isDone ? `${100 - percentageOnOne}%` : <Button size='large' onClick={(e) => optionClick(e, questionDetail.id, 'optionTwo')}>CLICK</Button>}
                                    </CardContent>
                                </Card>
                            </Badge>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card > : <Navigate to="/not-found" replace state={{ path: location.pathname }} />
    )
}

const mapStateToProps = ({ authedUser, questions, users }) => {
    return {
        authedUser,
        questions,
        users,
        loading: authedUser === null || authedUser === ''
    }
}

export default connect(mapStateToProps)(QuestionDetail)
