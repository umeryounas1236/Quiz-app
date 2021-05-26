import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { styles } from '../helper'
import Button from '@material-ui/core/Button'
import Result from '../Components/Result'
import Review from '../Components/Review'
import Question from '../Components/Question'

const useStyles = makeStyles((theme) => {
  return styles
})

const Questions = ({ questions, step, setStep, setQuestions }) => {
  const classes = useStyles()
  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState(questions[index])
  const [attemtedquestions, setAttemtedQuestions] = useState([])
  const [score, setScore] = useState(0)
  const totalquestions = questions.length

  const HandleReset = () => {
    setStep('start')
    setQuestions([])
    setIndex(0)
    setQuestion({})
    setAttemtedQuestions([])
    setScore(0)
  }

  return step === 'quiz' ? (
    <Question
      question={question}
      setScore={setScore}
      setAttemtedQuestions={setAttemtedQuestions}
      attemtedquestions={attemtedquestions}
      score={score}
      index={index}
      setIndex={setIndex}
      questions={questions}
      setQuestion={setQuestion}
      setStep={setStep}
    />
  ) : (
    <>
      <Result
        total={totalquestions}
        score={score}
        classes={classes}
        attemtedquestions={attemtedquestions}
      />
      <Review classes={classes} attemtedquestions={attemtedquestions} />
      <Button onClick={HandleReset} variant='contained' color='primary'>
        Reset
      </Button>
    </>
  )
}

export default Questions
