import React from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
class Quiz extends React.Component{

    state = {
        results: {}, // {[id]: 'succes || error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'succes || 'error'}
        quiz: [
            {   
                id: 1,
                question: 'В каком году основали Питер? ',
                rightAnswerId: 3,
                    answers: [
                        {text: '1700', id:1},
                        {text: '1802', id:2},
                        {text: '1703', id:3},
                        {text: '1803', id:4},
                    ]
            },
            {   
                id: 2,
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                    answers: [
                        {text: 'Черный', id:1},
                        {text: 'Синий', id:2},
                        {text: 'Красный', id:3},
                        {text: 'Зеленый', id:4},
                    ]
                }
        ],
    }
    onAnswerClickHandler = (answerId) => {

        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key]==='success'){
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if(question.rightAnswerId === answerId){
            if(!results[question.id]){
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })
            const timeout = window.setTimeout(()=>{
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true,
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1, 
                        answerState: null 
                    })
                }
                window.clearTimeout(timeout)
            },1000 )
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results,
            })
        }
    }
    onRetryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }
    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {this.state.isFinished 
                    ? 
                        <FinishedQuiz 
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.onRetryHandler}
                        />
                    : 
                        <ActiveQuiz 
                            answerNumber={this.state.activeQuestion + 1}
                            quizLength={this.state.quiz.length}
                            onAnswerClick={this.onAnswerClickHandler}
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            state={this.state.answerState}
                        />
                    }
                   
                </div>
            </div>
        )
    }
}

export default Quiz