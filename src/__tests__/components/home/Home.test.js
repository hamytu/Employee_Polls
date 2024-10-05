import { render, fireEvent, screen, prettyDOM } from '@testing-library/react'
import Home from '../../../components/home/Home'
import { MemoryRouter } from 'react-router-dom'
import { createStore } from 'redux'
import reducer from '../../../reducers'
import { Provider } from 'react-redux'
describe('Home page test', () => {
    let questions = [{ "id": "loxhs1bqm25b708cmbf3g", "author": "tylermcginnis", "timestamp": 1482579767190, "optionOne": { "votes": [], "text": "be a front-end developer" }, "optionTwo": { "votes": ["sarahedo"], "text": "be a back-end developer" }, "isDone": false }]
    let users = {
        tylermcginnis: {
            id: 'tylermcginnis',
            name: 'Tyler McGinnis',
            avatarURL: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Tyler',
            answers: {},
            questions: [],
        }
    }
    it('Home page has ANSWER NOW button on a question', () => {
        render(
            <Provider store={createStore(reducer, { authedUser: "tylermcginnis", users, questions })}>
                <MemoryRouter>
                    <Home /></MemoryRouter>
            </Provider>
        );
        expect(screen.getByText('ANSWER NOW')).toBeInTheDocument();
    });

    it('On HomePage, default is Unanswered Tab', () => {
        let con = render(
            <Provider store={createStore(reducer, { authedUser: "tylermcginnis", users, questions })}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByText("Unanswered").tabIndex).toBe(0) // 0 mean active tab
    });

    it('On HomePage, click Answered Tab', () => {
        let con = render(
            <Provider store={createStore(reducer, { authedUser: "tylermcginnis", users, questions })}>
                <MemoryRouter>
                    <Home /></MemoryRouter>
            </Provider>
        );
        fireEvent.click(screen.getByText('Answered'));
        expect(screen.getByText("Answered").tabIndex).toBe(0) // 0 mean active tab
        expect(screen.getByText("Unanswered").tabIndex).toBe(-1) // 0 mean inActive tab
    });
});