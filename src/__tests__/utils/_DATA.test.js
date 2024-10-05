import { _saveQuestion, _saveQuestionAnswer } from '../../utils/_DATA'

describe('Test _saveQuestion & _saveQuestionAnswer', () => {
    it('_saveQuestion success', async () => {
        const result = await _saveQuestion({
            optionOneText: 'Opt 1',
            optionTwoText: 'Opt 2',
            author: 'sarahedo',
        })
        expect(result.author).toBe('sarahedo')
        expect(result.optionOne.text).toBe('Opt 1')
        expect(result.optionTwo.text).toBe('Opt 2')
    })
    
    it('_saveQuestion fail', async () => {
        expect(async () => await _saveQuestion({
            optionOneText: 'Opt 1',
            optionTwoText: 'Opt 2',
            author: 'randomName',
        })).rejects.toThrow()
    })

    it('_saveQuestionAnswer success', async () => {
        let isSuccess = await _saveQuestionAnswer({ authedUser: 'sarahedo', qid: 'vthrdm985a262al8qx3do', answer: 'optionOne' })
        expect(isSuccess).toBe(true)
    })

    it('_saveQuestionAnswer fail', async () => {
        expect(async () => await _saveQuestionAnswer({
            authedUser: 'sarahe', qid: 'vthrdm985a262al8qx3do', answer: 'optionOne'
        })).rejects.toThrow()
    })
})