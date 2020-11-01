import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'

const useStyles = makeStyles(theme => ({
  sectionPadding: {
    padding: theme.custom.setSpace()
  },
  section1: {
    backgroundColor: theme.palette.grey[50]
  },
  heading1: {
    width: '100%',
    color: theme.palette.grey.main
  }
}))

export const Error = () => {
  const classes = useStyles()
  return (
    <Grid item xs={12}>
      <Grid
        container
        component="section"
        className={clsx(classes.sectionPadding, classes.section1)}>
        <Grid item xs={12}>
          <FadeIn direction="x" position={-100}>
            <Typography variant="h1" className={classes.heading1}>
              Error
            </Typography>
          </FadeIn>
          <Typography variant="body1">Sorry, something went wrong</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}