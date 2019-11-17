import React from 'react'
import AnswersList from './AnswersList/AnswersList'
import classes from './ActiveQuiz.css'

const ActiveQuiz = (props) => {
   return (
        <div className={classes.ActiveQuiz} onClick={props.clickAnswer}>
            <p className={classes.Question}>
                <span>
                    <strong>2 | </strong>
                    {props.question}
                </span>
                 <small>{props.answerNumber} из {props.quizLength}</small>
            </p>
            <AnswersList
                state={props.state}
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
            />
        </div>
   )
}

export default ActiveQuiz