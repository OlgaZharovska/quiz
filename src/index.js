import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './components/Quiz';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

const quizData = [
    {
      question: 'Політ нормальний?',
      answers: {
          'sdlfjd': false,
          'єп': true,
          'oiji': false,
          'oijisdf': false
      }
    }, {
        question: 'А якшо найду?',
        answers: {
            'sdlfjd': false,
            'нікогдє': true,
            'oiji': false,
            'oijisdf': false
        }
    }, {
        question: 'Ну нєєєє?',
        answers: {
            'sdlfjd': false,
            'воістину нє': true,
            'oiji': false,
            'oijisdf': false
        }
     }
  ];

function reducer(
    state={ quizData, turnData: quizData[0], currentQuestionNum: 0, highlight: '' },
    action) {
    switch(action.type){
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.answers[action.answer];
            return Object.assign({}, 
                state, { 
                  highlight: isCorrect ? 'correct' : 'wrong'
                });
        case 'CONTINUE':
            return Object.assign({}, 
                state, { 
                    turnData: quizData[state.currentQuestionNum + 1],
                    currentQuestionNum: state.currentQuestionNum + 1,
                    highlight: ''
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
