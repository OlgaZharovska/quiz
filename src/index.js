import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './components/Quiz';
import './index.css';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

const quizData = [
    {
      question: 'What is the capital of the Falkland Islands?',
      answers: {
          'Banksy': false,
          'Stanley': true,
          'Ollie': false,
          'Hugh': false
      }
    }, {
        question: 'Panama is famous for what waterway??',
        answers: {
            'Panama Lake': false,
            'Panama Canal': true,
            'Panama Puddle': false,
            'The River Wild': false
        }
    }, {
        question: 'What is the human population of Peru?',
        answers: {
            'Nearly six million': false,
            'Nearly ten million': true,
            'Nearly one million': false,
            '100 thousand': false
        }
     }
  ];

function reducer(
    state={ quizData, turnData: quizData[0], answerNumbers: {}, currentQuestionNum: 0, highlight: '', isEnd: false, score: 0 },
    action) {
    switch(action.type){
        case 'ANSWER_SELECTED':
            const answers = state.turnData.answers;
            const isCorrect = state.turnData.answers[action.answer];
            const answerNumbers = {
                correctNum: Object.keys(answers).map(answer => answers[answer]).indexOf(true),
                wrongNum: isCorrect ? null : action.dataset
            }
            return Object.assign({}, 
                state, { 
                  highlight: isCorrect ? 'correct' : 'wrong',
                  answerNumbers,
                  score: isCorrect ? state.score + 1 : state.score
                  });
        case 'CONTINUE':
            const isEnd = state.currentQuestionNum === state.quizData.length - 1 ? true : false
            return Object.assign({}, 
                state, { 
                    turnData: quizData[state.currentQuestionNum + 1],
                    currentQuestionNum: state.currentQuestionNum + 1,
                    highlight: '',
                    isEnd
                });
        default:
            return state;
    }
}

let store = Redux.createStore(
    reducer
);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
      <React.Fragment>
        <Quiz store={store}/>
      </React.Fragment>
    </ReactRedux.Provider>, document.getElementById('root'));
