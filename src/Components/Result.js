import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { styles } from '../helper'

const useStyles = makeStyles((theme) => {
  return styles
})

const Result = ({ total, score, attemtedquestions }) => {
  const classes = useStyles()

  return (
    <div className={classes.results}>
      <Typography
        variant='h1'
        style={{ background: 'pink' }}
        className={classes.mainTitle}
      >
        Results : Your Score is {score} out of {total}
      </Typography>
    </div>
  )
}

export default Result
