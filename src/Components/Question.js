import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { styles, createMarkup } from '../helper'

const useStyles = makeStyles((theme) => {
  return styles
})

const Question = ({
  question,
  ans,
  correct_answer,
  setScore,
  setAttemtedQuestions,
  attemtedquestions,
  score,
  index,
  setIndex,
  questions,
  setStep,
  setQuestion,
}) => {
  const classes = useStyles()
  const [counter, setCounter] = useState(15)
  const [selectedvalue, setSelectedValue] = useState('')

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const HandleAnswers = () => {
    if (selectedvalue === question.correct_answer) {
      const newAnswer = {
        ...question,
        isCorrect: true,
        selectedAns: selectedvalue,
      }
      setAttemtedQuestions([...attemtedquestions, newAnswer])
      setScore(score + 1)
    } else {
      const newAnswer = {
        ...question,
        isCorrect: false,
        selectedAns: selectedvalue,
      }
      setAttemtedQuestions([...attemtedquestions, newAnswer])
    }
  }

  const HandleClick = () => {
    HandleAnswers()
    console.log('HandleAnswers fires')
    console.log(attemtedquestions)
    if (index < questions.length - 1) {
      setIndex(index + 1)
      setQuestion(questions[index + 1])
      setCounter(15)
    } else {
      setStep('result')
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter === 0) {
        HandleClick()
        setCounter(15)
        return
      }
      setCounter(counter - 1)
    }, 1000)

    // if (index > questions.length - 1) {
    //   clearInterval(interval)
    //   return
    // }
    return () => clearInterval(interval)
  })

  return (
    <div>
      <div style={{ textAlign: 'right', fontSize: '2rem' }}>
        <p style={{ marginRight: '25px', color: 'red' }}>{counter}</p>
      </div>
      <Typography
        variant='h5'
        style={{ fontSize: '1.5rem' }}
        className={classes.mainTitle}
      >
        <span dangerouslySetInnerHTML={createMarkup(question.question)} />
      </Typography>
      <div className={classes.root}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Select Right Answer</FormLabel>
          <RadioGroup
            aria-label='gender'
            name='gender1'
            value={selectedvalue}
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
          >
            {question.ans.map((ans) => (
              <FormControlLabel
                key={ans}
                value={ans}
                control={<Radio />}
                label={
                  <span dangerouslySetInnerHTML={createMarkup(ans)}></span>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      <Button
        style={{ marginTop: '1rem' }}
        color='primary'
        variant='contained'
        onClick={() => HandleClick()}
      >
        {index === questions.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </div>
  )
}

export default Question
