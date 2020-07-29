import classNames from 'classnames'
import { Form } from 'formik'
import React from 'react'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { FadeIn } from '@colin30/shared/react/components/FadeIn'
import { VolumeFormCardInfo } from './VolumeFormCardInfo'
import { VolumeFormKEOptions } from './VolumeFormKEOptions'
import { VolumeFormPricing } from './VolumeFormPricing'
import { VolumeFormTrialReview } from './VolumeFormTrialReview'
import { VolumeFormTerms } from './VolumeFormTerms'

const useStyles = makeStyles(theme => ({
  form: {
    ...theme.custom.setGrid(12, 'auto', theme.custom.setSpace('sm')),
    maxWidth: theme.custom.setSpace() * 85,
    marginTop: theme.custom.setSpace('sm'),
    [theme.breakpoints.down('xs')]: {
      marginTop: 0
    }
  },
  gridPosition1: {
    gridColumn: '1 / 9',
    gridRow: 1,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 1
    }
  },
  gridPosition2: {
    gridColumn: '1 / 9',
    gridRow: 2,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 2
    }
  },
  gridPosition3: {
    gridColumn: '1 / 9',
    gridRow: 3,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 3
    }
  },
  gridPosition4: {
    gridColumn: '9 / 13',
    gridRow: '1 / 6',
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 4
    }
  },
  gridPosition5: {
    gridColumn: '1 / 9',
    gridRow: 4,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 5
    }
  },
  gridPosition6: {
    gridColumn: '1 / 9',
    gridRow: 5,
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 13',
      gridRow: 6
    }
  },
  formSection: {
    padding: theme.custom.setSpace('sm'),
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      padding: theme.custom.setSpace()
    }
  },
  pricingSection: {
    backgroundColor: theme.palette.grey[700],
    overflow: 'unset'
  },
  pricingSticky: {
    width: '100%',
    position: 'sticky',
    top: 0
  },
  formSectionTitle: {
    color: theme.palette.primary[200],
    marginBottom: theme.custom.setSpace()
  },
  pricingTitle: {
    color: theme.palette.secondary[50]
  },
  formActionButtons: {
    ...theme.custom.setFlex('row nowrap', 'flex-start')
  },
  formActionButton: {
    ...theme.custom.formButton,
    'margin': `0 ${theme.custom.setSpace()}px 0 0`,
    '&:last-of-type': {
      margin: 0
    }
  },
  formActionButtonSubmit: {
    'backgroundColor': theme.palette.pass[500],
    '&:hover': {
      backgroundColor: theme.palette.pass[400]
    }
  },
  formActionButtonReset: {
    'backgroundColor': theme.palette.fail[500],
    '&:hover': {
      backgroundColor: theme.palette.fail[400]
    }
  },
  formActionButtonClose: {
    'backgroundColor': theme.palette.primary[200],
    '&:hover': {
      backgroundColor: theme.palette.primary[300]
    }
  }
}))

export const VolumeForm = ({ formikProps, closeDialogHandler, trialId }) => {
  // console.log('%c formikProps', 'color: yellow; font-size: large', formikProps)
  const classes = useStyles()

  const checkIfPristine = touchedFields => Object.keys(touchedFields).length < 1

  return (
    <Form className={classes.form}>
      <Paper className={classNames(classes.gridPosition1, classes.formSection)}>
        <Typography variant="h3" className={classes.formSectionTitle}>
          Trial Review
        </Typography>
        <VolumeFormTrialReview trialId={trialId} />
      </Paper>
      <Paper className={classNames(classes.gridPosition2, classes.formSection)}>
        <Typography variant="h3" className={classes.formSectionTitle}>
          Keyword Metric Options
        </Typography>
        <VolumeFormKEOptions />
      </Paper>
      <Paper className={classNames(classes.gridPosition3, classes.formSection)}>
        <Typography variant="h3" className={classes.formSectionTitle}>
          Credit Card Info
        </Typography>
        <VolumeFormCardInfo />
      </Paper>
      <Paper
        className={classNames(
          classes.gridPosition4,
          classes.formSection,
          classes.pricingSection
        )}>
        <div className={classes.pricingSticky}>
          <Typography
            variant="h3"
            className={classNames(
              classes.formSectionTitle,
              classes.pricingTitle
            )}>
            Pricing
          </Typography>
          <VolumeFormPricing
            trialId={trialId}
            billingCountry={formikProps.values.billingCountry}
          />
        </div>
      </Paper>
      <Paper className={classNames(classes.gridPosition5, classes.formSection)}>
        <Typography variant="h3" className={classes.formSectionTitle}>
          Terms and Conditions
        </Typography>
        <VolumeFormTerms />
      </Paper>
      <div className={classes.gridPosition6}>
        <FadeIn
          direction="y"
          position={100}
          className={classes.formActionButtons}>
          <Button
            type="submit"
            variant="contained"
            disabled={
              !formikProps.isValid || checkIfPristine(formikProps.touched)
            }
            className={classNames(
              classes.formActionButton,
              classes.formActionButtonSubmit
            )}>
            Order
          </Button>
          <Button
            type="reset"
            variant="contained"
            className={classNames(
              classes.formActionButton,
              classes.formActionButtonReset
            )}
            disabled={checkIfPristine(formikProps.touched)}>
            Reset
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={closeDialogHandler}
            className={classNames(
              classes.formActionButton,
              classes.formActionButtonClose
            )}>
            Close
          </Button>
        </FadeIn>
      </div>
    </Form>
  )
}
