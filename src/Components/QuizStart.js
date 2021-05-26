import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/styles'
import { styles } from '../helper'
import StartStep from '../Components/StartSetup'
import Questions from '../Components/Questions'

const useStyles = makeStyles((theme) => {
  return styles
})

const QuizStart = () => {
  const classes = useStyles()
  const [step, setStep] = useState('start')
  const [questions, setQuestions] = useState([])

  return (
    <Container>
      <Paper className={classes.paper}>
        {step === 'start' ? (
          <StartStep setStep={setStep} setQuestions={setQuestions} />
        ) : (
          <Questions
            questions={questions}
            step={step}
            setStep={setStep}
            setQuestions={setQuestions}
          />
        )}
      </Paper>
    </Container>
  )
}
export default QuizStart
