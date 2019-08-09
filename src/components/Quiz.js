import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import '../App.css';
import '../bootstrap.min.css';


function Hero () {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by author shown</p>
      </div>
    </div>
  );
}

function Question({answer, onClick, dataset}) {
  return (<div className="answer" onClick={() => {onClick(answer);}}>
    <h4>{dataset}</h4>
  </div>
  );
}

function Turn({question, answers, highlight, onAnswerSelected}) {

  // function highlightToBgColor(highlight){
  //   return {
  //     wrongAnswerTitle: 'lkfjssd',
  //     highlightCorrect: true
  //   }
  // }

  function highlightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }

  return (<div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
    <div className="col-6">
    <h4>{question}</h4>
      {Object.keys(answers).map((answer, i) => <Question dataset={i} answer={answer} key={answer} 
      validation={answers[answer]} onClick={onAnswerSelected} />)}
    </div>
  </div>);
}

//кожному елементу присвоюється prop true, компонент з таким prop підсвічується.
// в залежності чи відповідь коректна підсвічується червоним компонент з title, що передається з onAnswerSelected

//  1. Передати title вибраного компонента з onAnswerSelected
//  2. Check if answer is true
//  3. change bg-color with prop = true to green
//     if(false){
  //      change bg-color with title={selected} to red
  //   

// }
// 4. Func highlight should return a value green for component with valid prop equal to true
// also value red for component with selected incorrect answer
// дає сигнал підсвітити зеленим true, якщо 

// function Continue () {
//   return(<div/>);
// }
function Continue({ show, onContinue }) {
  return (
    <div className="row continue">
    { show 
      ? <div className="col-11">
          <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
        </div>
      : null }
    </div>
  );
}

function Footer () {
  return (<div id="footer" className="row">
    <div className="col-12">
      <p className="text-muted credit">All images are from Wikimedia Commons and are in the public domain.
      </p>
    </div>
  </div>);
}

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: (answer) => {
      dispatch({ type: 'ANSWER_SELECTED', answer });
    },
    onContinue: () => {
      dispatch({ type: 'CONTINUE' });
    }
  };
}

const Quiz = connect(mapStateToProps, mapDispatchToProps)(
  function ({turnData, highlight, onAnswerSelected, onContinue}) {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
        <Continue show={highlight === 'correct'} onContinue={onContinue}/>
        <Footer />
      </div>
    );
  });

export default Quiz;
