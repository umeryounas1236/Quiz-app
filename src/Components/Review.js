import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Check, Close } from '@material-ui/icons'
import { createMarkup } from '../helper'

const Review = ({ attemtedquestions, classes }) => {
  return (
    <>
      <Typography
        variant='h1'
        style={{ textAlign: 'center' }}
        className={classes.mainTitle}
      >
        Answers review:
      </Typography>
      {attemtedquestions.map((ques) => {
        const { question, isCorrect, correct_answer, ans, selectedAns } = ques
        return (
          <Paper key={question} className={classes.paper}>
            <Typography variant='h2' className={classes.question}>
              <span dangerouslySetInnerHTML={createMarkup(question)} />
            </Typography>

            {isCorrect ? (
              <>
                {ans.map((ans) => {
                  if (ans === correct_answer) {
                    return (
                      <Typography
                        key={ans}
                        variant='h2'
                        className={`${classes.answer} ${classes.correctAnswer}`}
                      >
                        <span
                          className={classes.answer}
                          dangerouslySetInnerHTML={createMarkup(ans)}
                        />
                        <Check style={{ color: 'green', marginLeft: '25px' }} />
                      </Typography>
                    )
                  }
                  return (
                    <Typography
                      key={ans}
                      variant='h2'
                      className={`${classes.answer} ${classes.answer}`}
                    >
                      <span
                        className={classes.answer}
                        dangerouslySetInnerHTML={createMarkup(ans)}
                      />
                    </Typography>
                  )
                })}
              </>
            ) : (
              <>
                {ans.map((ans) => {
                  if (ans === correct_answer) {
                    return (
                      <Typography
                        key={ans}
                        variant='h2'
                        className={`${classes.answer} ${classes.correctAnswer}`}
                      >
                        <span
                          className={classes.answer}
                          dangerouslySetInnerHTML={createMarkup(ans)}
                        />
                        <Check style={{ color: 'green', marginLeft: '25px' }} />
                      </Typography>
                    )
                  }
                  if (ans === selectedAns) {
                    return (
                      <Typography
                        key={ans}
                        variant='h2'
                        className={`${classes.answer} ${classes.wrongAnswer}`}
                      >
                        <span
                          className={classes.answer}
                          dangerouslySetInnerHTML={createMarkup(ans)}
                        />
                        <Close style={{ marginLeft: '25px' }} />
                      </Typography>
                    )
                  }
                  return (
                    <Typography
                      variant='h2'
                      key={ans}
                      className={`${classes.answer} ${classes.answer}`}
                    >
                      <span
                        className={classes.answer}
                        dangerouslySetInnerHTML={createMarkup(ans)}
                      />
                    </Typography>
                  )
                })}
              </>
            )}
          </Paper>
        )
      })}
    </>
  )
}

export default Review
