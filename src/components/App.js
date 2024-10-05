import { useEffect } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Container from '@mui/material/Container'
import Nav from './Nav'
import { Routes, Route } from 'react-router-dom'
import Home from './home/Home'
import Login from './Login'
import Leaderboard from './leaderboard/Leaderboard'
import NewQuestion from './create/NewQuestion'
import { useNavigate } from 'react-router-dom'
import QuestionDetail from './home/QuestionDetail'
import NotFound from './error/NotFound'

const App = ({ dispatch, authedUser }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (authedUser === null || authedUser === '') {
      dispatch(handleInitialData())
    }
  }, [navigate, authedUser, dispatch])

  const validAuthedUser = authedUser !== null && authedUser !== ''

  return (
    <Container fixed>
      {validAuthedUser && <Nav />}
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/leaderboard' exact element={<Leaderboard />} />
          <Route path='/questions/:question_id' exact element={<QuestionDetail />} />
          <Route path='/add' exact element={<NewQuestion />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/not-found' element={<NotFound />} />
        </Routes>
    </Container>
  )
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser
})

export default connect(mapStateToProps)(App)
