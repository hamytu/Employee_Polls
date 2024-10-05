import { render, fireEvent, screen } from '@testing-library/react'
import QuestionCard from '../../../components/home/QuestionCard';
import { MemoryRouter } from 'react-router-dom'
import { getDatetimeFromUnix } from '../../../utils/appUtils';
describe('Question Card test', () => {
    let question = { "id": "loxhs1bqm25b708cmbf3g", "author": "tylermcginnis", "timestamp": 1482579767190, "optionOne": { "votes": [], "text": "be a front-end developer" }, "optionTwo": { "votes": ["sarahedo"], "text": "be a back-end developer" }, "isDone": false }
    it('Question Card has ANSWER NOW button', () => {
        render(
            <MemoryRouter>
                <QuestionCard content={question
                } /></MemoryRouter>
        );
        expect(screen.getByText('ANSWER NOW')).toBeInTheDocument();
    });

    it('Question card has correct time converted', () => {
        render(
            <MemoryRouter>
                <QuestionCard content={question
                } /></MemoryRouter>
        );
        expect(screen.getByText(getDatetimeFromUnix(1482579767190))).toBeInTheDocument();
    });
});