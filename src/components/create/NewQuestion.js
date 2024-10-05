import { connect } from 'react-redux'
import { useLocation, Navigate, useNavigate } from 'react-router'
import { useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { handleAddQuestion } from '../../actions/questions'
import LoadingBar from 'react-redux-loading-bar'
const NewQuestion = ({ authedUser, loading, dispatch }) => {
    const location = useLocation()
    const [optionOne, setOptionOne] = useState('Option 1')
    const [optionTwo, setOptionTwo] = useState('Option 2')
    const navigate = useNavigate()
    const createNew = (e) => {
        const question = { optionOneText: optionOne, optionTwoText: optionTwo, author: authedUser }
        dispatch(handleAddQuestion(question)).then(() => {
            navigate('/')
        })
    }
    return (
        loading ? (<Navigate to="/login" replace state={{ path: location.pathname }} />) :
            <Card sx={{ width: '100%', backgroundColor: `#F8F8F8` }}>
                <LoadingBar scope='create' />
                <CardContent>
                    <Typography variant='h5' component='div'>Would You Rather</Typography>
                    <Grid container spacing={4} direction='row'
                        justifyContent='center'
                        marginTop={0}
                        alignItems='center'>
                        <Grid item xs={6}>
                            <TextField
                                sx={{ width: '100%' }}
                                id='op-1'
                                label='Option 1'
                                multiline
                                rows={2}
                                value={optionOne}
                                onInput={e => setOptionOne(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                sx={{ width: '100%' }}
                                id='op-2'
                                label='Option 2'
                                multiline
                                rows={2}
                                value={optionTwo}
                                onInput={e => setOptionTwo(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button size='small' type='submit' onClick={createNew}>CREATE</Button>
                </CardActions>
            </Card >
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

export default connect(mapStateToProps)(NewQuestion)
