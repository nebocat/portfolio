import PropTypes from 'prop-types'
import React from 'react'

import { mergeSort } from '@cjo3/shared/general/sorting'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'
import { defaultPadding } from '@cjo3/shared/react/themes/theming'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { TrialCard } from './TrialCard'

const useStyles = makeStyles(theme => ({
  trialsSection: {
    backgroundColor: theme.palette.secondary[200],
    ...defaultPadding(theme.breakpoints, theme.custom.setSpace)
  },
  trialsContainer: {
    marginTop: theme.custom.setSpace('sm'),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.custom.setSpace()
    }
  },
  mainHeading: {
    ...theme.typography.mainHeading,
    marginBottom: 0
  },
  subHeading: theme.typography.subHeading
}))

export const TrialCardsContainer = ({ trials }) => {
  const classes = useStyles()

  const { items, shown } = trials

  const sortedItems = mergeSort(items, 'timestampUpdated', 'down')
  return (
    <Grid container component="section" className={classes.trialsSection}>
      <Grid item xs={12}>
        <Grid
          container
          direction="column"
          wrap="nowrap"
          alignItems="flex-start"
          justify="flex-start">
          <FadeIn direction="y" position={-100}>
            <Typography component="h4" className={classes.subHeading}>
              &#8230;And the Results are In
            </Typography>
          </FadeIn>
          <FadeIn direction="x" position={-100}>
            <Typography component="h3" className={classes.mainHeading}>
              Keyword Variation Trial Cards
            </Typography>
          </FadeIn>
        </Grid>
      </Grid>
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        direction="row"
        wrap="wrap"
        spacing={3}
        className={classes.trialsContainer}>
        {sortedItems.map(trial => (
          <Grid item xs={12} md={6} lg={4} key={trial.id}>
            <TrialCard
              trial={trial}
              isShown={shown.includes(trial.id)}
              isLastShown={shown.length === 1}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

TrialCardsContainer.propTypes = {
  trials: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    shown: PropTypes.arrayOf(PropTypes.string).isRequired
  })
}
