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

function Question({answer, onClick}) {
  return (<div className="answer" onClick={() => {onClick(answer);}}>
    <h4>{answer}</h4>
  </div>
  );
}

function Turn({question, answers, highlight, onAnswerSelected}) {
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
      {Object.keys(answers).map((answer) => <Question answer={answer} key={answer} onClick={onAnswerSelected} />)}
    </div>
  </div>);
}

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
