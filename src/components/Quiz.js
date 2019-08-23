import React from 'react';
import { connect } from 'react-redux';
import '../App.css';


function Question({ answer, onClick, dataset, className }) {
  return (<li className={`answer ${className}`} onClick={() => { onClick(answer, dataset); }}>
    <p>{answer}</p>
  </li>);
}

function Turn({ question, answers, highlight, isEnd, answerNumbers, score, noq, onAnswerSelected }) {

  return (
    <div className="row">
      {isEnd
        ? <div className="end">
          <h1>You've answered correctly {score} questions out of {noq}</h1>
        </div>
        :
        <div className="col-lg-10 offset-lg-1" id="container">
          <div id="question">{question}</div>
          <div id="answers">
            <ul>
              {highlight == ''
                ? Object.keys(answers).map((answer, i) => <Question dataset={i} answer={answer} key={answer} onClick={onAnswerSelected} />)
                : highlight == 'correct'
                  ? Object.keys(answers).map((answer, i) => i == answerNumbers.correctNum
                    ? <Question dataset={i} answer={answer} key={answer} className="correct" onClick={onAnswerSelected} />
                    : <Question dataset={i} answer={answer} key={answer} onClick={onAnswerSelected} />)
                  : Object.keys(answers).map((answer, i) => i == answerNumbers.wrongNum
                    ? <Question dataset={i} answer={answer} key={answer} className="wrong" onClick={onAnswerSelected} />
                    : i == answerNumbers.correctNum
                      ? <Question dataset={i} answer={answer} key={answer} className="correct" onClick={onAnswerSelected} />
                      : <Question dataset={i} answer={answer} key={answer} onClick={onAnswerSelected} />)
              }
            </ul>
          </div>
        </div>
      }
    </div>
  );
}

function Continue({ show, onContinue }) {
  return (
    <div className="row continue">
      {show
        ? <div className="col-11">
          <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
        </div>
        : null}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    noq: state.quizData.length,
    highlight: state.highlight,
    isEnd: state.isEnd,
    answerNumbers: state.answerNumbers,
    score: state.score
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: (answer, dataset) => {
      dispatch({ type: 'ANSWER_SELECTED', answer, dataset });
    },
    onContinue: () => {
      dispatch({ type: 'CONTINUE' });
    }
  };
}

const Quiz = connect(mapStateToProps, mapDispatchToProps)(
  function ({ turnData, noq, highlight, isEnd, answerNumbers, score, onAnswerSelected, onContinue }) {
    return (
      <div className="container-fluid">
        <Turn {...turnData} highlight={highlight} isEnd={isEnd} answerNumbers={answerNumbers} onAnswerSelected={onAnswerSelected} score={score} noq={noq} />
        <Continue show={highlight === 'correct' || highlight === 'wrong'} onContinue={onContinue} />
      </div>
    );
  });

export default Quiz;
