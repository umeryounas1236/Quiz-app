import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

import { styles, difficulties } from '../helper'
import { shuffle } from 'lodash'

const useStyles = makeStyles((theme) => {
  return styles
})

const StartStep = ({ setStep, setQuestions }) => {
  const classes = useStyles()
  const [categories, setCategories] = useState([])
  const [difficulty, setDifficulty] = useState([])

  const [category, setCategory] = useState({
    categoryId: 0,
    difficulty: '',
    Questions: 0,
  })

  const FetchCategories = async () => {
    const resp = await fetch('https://opentdb.com/api_category.php')
    const { trivia_categories } = await resp.json()
    setCategories(trivia_categories)
    setDifficulty(difficulties)
  }
  const FetchQuestions = async (url) => {
    const resp = await fetch(url)
    const { results } = await resp.json()
    const formattedquestions = results.map((q) => {
      return {
        ...q,
        ans: shuffle([...q.incorrect_answers, q.correct_answer]),
      }
    })
    setQuestions(formattedquestions)
    setStep('quiz')
  }
  const HandleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setCategory({ ...category, [name]: value })
    return
  }

  const HandleSubmit = (e) => {
    e.preventDefault()
    if (category.categoryId && category.difficulty && category.Questions) {
      const url = `https://opentdb.com/api.php?amount=${category.Questions}&category=${category.categoryId}&difficulty=${category.difficulty}`
      FetchQuestions(url)
    }
  }

  useEffect(() => {
    FetchCategories()
  }, [])
  return (
    <>
      <Typography variant='h1' className={classes.mainTitle}>
        Get Questions:
      </Typography>
      <form onSubmit={HandleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <FormControl fullWidth variant='outlined'>
              <InputLabel id='category-select-label'>
                Select category:
              </InputLabel>
              <Select
                required
                name='categoryId'
                id='category-select'
                label='Select category'
                labelId='category-select-label'
                value={category.categoryId === 0 ? '' : category.categoryId}
                onChange={HandleChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    <span>{category.name}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant='outlined'>
              <InputLabel id='difficulty-select-label'>
                Select Difficulty:
              </InputLabel>
              <Select
                required
                name='difficulty'
                id='difficulty-select'
                label='Select Difficulty'
                labelId='difficulty-select-label'
                value={category.difficulty}
                onChange={HandleChange}
              >
                {difficulty.map((difficulty) => (
                  <MenuItem key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputProps={{ min: 1, max: 10 }}
              required
              fullWidth
              type='number'
              id='quiz-number'
              variant='outlined'
              name='Questions'
              label={`Number of Questions`}
              value={category.Questions === 0 ? '' : category.Questions}
              onChange={HandleChange}
            />
          </Grid>
        </Grid>
        <Button
          className={classes.submitButton}
          type='submit'
          variant='contained'
          color='primary'
        >
          Submit
        </Button>
      </form>
    </>
  )
}

export default StartStep
