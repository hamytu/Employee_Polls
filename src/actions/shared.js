import { getInitialData } from '../utils/api';
import { setUsers } from './users';
import { setQuestions } from './questions';

export const handleInitialData = () => async (dispatch) => {
  try {
    const { users, questions } = await getInitialData();
    dispatch(setUsers(users));
    dispatch(setQuestions(questions));
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }
};
