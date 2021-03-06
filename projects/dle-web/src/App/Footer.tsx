import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { LoadFail } from '@cjo3/shared/react/components/LoadFail'
import { ImageHandler } from '@cjo3/shared/react/components/ImageHandler'
import { switchLinkRoutePath } from '@cjo3/shared/react/helpers'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GavelIcon from '@material-ui/icons/Gavel'
import VpnLockIcon from '@material-ui/icons/VpnLock'
import WebIcon from '@material-ui/icons/Web'
import clsx from 'clsx'
import React, { useState } from 'react'
import Loadable from 'react-loadable'
import { useDispatch, useSelector } from 'react-redux'
import { ProfilePic } from '../assets'
import { toggleTc } from '../store/app/actions'
import { tcOpenSelector } from '../store/selectors'

const TCLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-TermsAndConditions" */
      '@cjo3/shared/react/components/TermsAndConditions'
    ),
  loading: ({ error, pastDelay, timedOut }) => {
    if (error) return <LoadFail message="Load Failed" />
    if (timedOut) return <LoadFail message="Timed Out" />
    if (pastDelay) return <BackDropScreen isOpen spinner />
    return null
  },
  delay: 250,
  timeout: 5000,
  render: (loaded, props) => {
    const Component = loaded.TermsAndConditions
    return <Component {...props} />
  }
})

const PPLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-PrivacyPolicy" */
      '@cjo3/shared/react/components/PrivacyPolicy'
    ),
  loading: ({ error, pastDelay, timedOut }) => {
    if (error) return <LoadFail message="Load Failed" />
    if (timedOut) return <LoadFail message="Timed Out" />
    if (pastDelay) return <BackDropScreen isOpen spinner />
    return null
  },
  delay: 250,
  timeout: 5000,
  render: (loaded, props) => {
    const Component = loaded.PrivacyPolicy
    return <Component {...props} />
  }
})

const useStyles = makeStyles(
  theme => ({
    Footer_container: {
      background: theme.custom.setLinearGradient(
        180,
        theme.palette.grey[900],
        theme.palette.grey[800]
      )
    },
    Footer_contentContainer: {
      ...theme.custom.contentContainer,
      padding: theme.custom.setSpace('sm')
    },
    Footer_linkButton: {
      ...theme.custom.setFlex('row', 'flext-start', 'center'),
      'marginTop': theme.custom.setSpace(),
      '&:first-child': {
        marginTop: 0
      }
    },
    Footer_linkButtonIcon: {
      fontSize: theme.typography.fontSize * 1.5,
      marginRight: theme.custom.setSpace() / 2,
      position: 'relative',
      top: -2
    },
    Footer_badgeTitleImageContainer: {
      ...theme.custom.setFlex('row', 'flex-end'),
      [theme.breakpoints.down('xs')]: {
        ...theme.custom.setFlex('row', 'flex-start'),
        margin: `${theme.custom.setSpace('sm')}px 0 0 0`
      },
      '&:hover': {
        cursor: 'pointer'
      }
    },
    Footer_badgeProfilePic: {
      'borderRadius': theme.custom.setSpace() / 4,
      'transition': 'all 250ms ease-out',
      '&:hover': {
        boxShadow: theme.custom.boxShadow
      },
      [theme.breakpoints.down('xs')]: {
        order: 1
      }
    },
    Footer_badgeTitle: {
      'textAlign': 'right',
      'marginRight': theme.custom.setSpace(),
      'transition': 'all 250ms ease-out',
      '&:hover': {
        color: theme.palette.primary[400]
      },
      [theme.breakpoints.down('xs')]: {
        order: 2,
        textAlign: 'left',
        marginLeft: theme.custom.setSpace(),
        marginRight: 0
      }
    },
    Footer_badgeSubtitle: {
      color: theme.palette.grey[400],
      textAlign: 'right',
      [theme.breakpoints.down('xs')]: {
        textAlign: 'left'
      }
    },
    Footer_copyright: {
      marginTop: theme.custom.setSpace('sm'),
      textAlign: 'right',
      [theme.breakpoints.down('xs')]: {
        textAlign: 'left'
      }
    }
  }),
  {
    name: 'Footer'
  }
)

interface Props {
  style: string
}

export const Footer: React.FC<Props> = ({ style }): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const tcOpen = useSelector(tcOpenSelector)

  const [PPOpen, setPPOpen] = useState<boolean>(false)

  const openTAndCHandler = (): void => {
    dispatch(toggleTc(true))
  }

  const closeTAndCHandler = (): void => {
    dispatch(toggleTc(false))
  }

  const openPPHandler = (): void => setPPOpen(true)

  const closePPHandler = (): void => setPPOpen(false)

  const badgeClickHandler = (): void => {
    if (window)
      window.open(process.env.SITE_URL, '_blank') ||
        window.location.replace(process.env.SITE_URL)
  }

  const homeLinkHandler = (): void => {
    if (window) window.location.replace(switchLinkRoutePath('/'))
  }

  return (
    <Grid
      container
      component="footer"
      justify="center"
      className={clsx(style, classes.Footer_container)}>
      <Grid container className={classes.Footer_contentContainer}>
        <Grid item xs={12} sm={6}>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            direction="column">
            <Button
              type="button"
              color="primary"
              onClick={homeLinkHandler}
              className={classes.Footer_linkButton}>
              <WebIcon className={classes.Footer_linkButtonIcon} />
              Home
            </Button>
            <Button
              type="button"
              color="primary"
              className={classes.Footer_linkButton}
              onClick={openTAndCHandler}>
              <GavelIcon className={classes.Footer_linkButtonIcon} />
              Terms &amp; Conditions
            </Button>
            <Button
              type="button"
              color="primary"
              className={classes.Footer_linkButton}
              onClick={openPPHandler}>
              <VpnLockIcon className={classes.Footer_linkButtonIcon} />
              Privacy Policy
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid
            container
            className={classes.Footer_badgeTitleImageContainer}
            onClick={badgeClickHandler}>
            <Typography
              variant="h5"
              color="primary"
              className={classes.Footer_badgeTitle}>
              Need Help with JavaScript
              <br />
              App Development?
            </Typography>
            <ImageHandler
              asset={ProfilePic}
              outerClass={classes.Footer_badgeProfilePic}
            />
          </Grid>
          <Typography variant="body1" className={classes.Footer_badgeSubtitle}>
            Available for Hire!
          </Typography>
          <Typography
            variant="body1"
            color="primary"
            className={classes.Footer_copyright}>
            &copy; 2020 {process.env.SITE_NAME}. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
      {tcOpen && (
        <TCLoadable
          open={tcOpen}
          closeHandler={closeTAndCHandler}
          siteName={process.env.SITE_NAME}
          siteUrl={process.env.SITE_URL}
          siteContactEmail={process.env.SITE_CONTACT_EMAIL}
        />
      )}
      {PPOpen && (
        <PPLoadable
          open={PPOpen}
          closeHandler={closePPHandler}
          siteName={process.env.SITE_NAME}
          siteUrl={process.env.SITE_URL}
          siteContactEmail={process.env.SITE_CONTACT_EMAIL}
        />
      )}
    </Grid>
  )
}
