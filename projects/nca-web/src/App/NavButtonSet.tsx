import { clickWindowLink } from '@cjo3/shared/react/helpers'
import { Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import HomeIcon from '@material-ui/icons/Home'
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import React from 'react'
import clsx from 'clsx'
import { menuItems } from './constants'

interface Props {
  slice?: number
  color: string
  direction?: string
  justification?: string
  alignment?: string
  noLastChildMargin?: boolean
  midNav?: boolean
}

const useStyles = makeStyles(
  theme => ({
    container: ({ direction, justification, alignment }) => ({
      ...theme.custom.setFlex(direction, justification, alignment)
    }),
    buttonRoot: {
      padding: theme.custom.setSpace() / 2
    },
    menuItem: ({ direction, color }) => ({
      ...theme.typography.shareTechMono,
      'color': eval(color),
      'transition': 'color 250ms ease-out',
      'margin':
        direction === 'row'
          ? `0 ${theme.custom.setSpace() / 2}px 0 0`
          : `0 0 ${theme.custom.setSpace() / 2}px 0`,
      '&:hover': {
        color: 'white'
      },
      '&:last-child': ({ noLastChildMargin }) => ({
        margin: noLastChildMargin ? 0 : ''
      })
    }),
    midNavContainer: {
      marginTop: theme.custom.setSpace('md'),
      ...theme.custom.setGrid(1, 3),
      [theme.breakpoints.only('sm')]: {
        ...theme.custom.setGrid(3, 1, theme.custom.setSpace('sm'))
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.custom.setSpace()
      }
    },
    midNavLink: {
      filter: 'drop-shadow(0.5rem 0.5rem  0.5rem rgba(0, 0, 0, 0.33))'
    },
    midNavSpan: {
      ...theme.custom.setFlex(),
      ...theme.typography.shareTechMono,
      'textTransform': 'uppercase',
      'height': theme.custom.setSpace('lg'),
      'color': theme.palette.grey[400],
      'textAlign': 'center',
      'fontSize': theme.typography.fontSize * 1.5,
      'backgroundColor': theme.palette.grey[800],
      'transition': 'all 250ms ease-out',
      '&:hover': {
        color: 'white',
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.main
      }
    },
    midNavLeft: {
      clipPath: 'polygon(0 0, 100% 20%, 100% 80%, 0 100%)'
    },
    midNavRight: {
      clipPath: 'polygon(0 20%, 100% 0%, 100% 100%, 0 80%)'
    }
  }),
  {
    name: 'NavButtonSet'
  }
)

const iconMap: { [key: string]: JSX.Element } = {
  home: <HomeIcon />,
  resume: <BusinessCenterIcon />,
  apps: <ImportantDevicesIcon />,
  contact: <MailOutlineIcon />
}

export const NavButtonSet: React.FC<Props> = ({
  slice,
  color,
  direction,
  justification,
  alignment,
  noLastChildMargin,
  midNav
}): JSX.Element => {
  const classes = useStyles({
    color,
    direction,
    justification,
    alignment,
    noLastChildMargin
  })
  const menuItemClickHandler = (linkTo: string) => (
    event: React.MouseEvent
  ): void => {
    clickWindowLink(linkTo)
  }
  if (midNav) {
    return (
      <Grid className={classes.midNavContainer}>
        {menuItems.slice(slice).map(item => (
          <a
            href={item.to}
            className={classes.midNavLink}
            key={`mid-nav-${item.key}`}>
            <span className={clsx(classes.midNavSpan, classes[item.midNavDir])}>
              {iconMap[item.icon]}
              &ensp;{item.label}
            </span>
          </a>
        ))}
      </Grid>
    )
  }
  return (
    <Grid className={classes.container}>
      {menuItems.slice(slice).map(item => (
        <Button
          key={item.key}
          type="button"
          onClick={menuItemClickHandler(item.to)}
          className={classes.menuItem}
          classes={{ root: classes.buttonRoot }}>
          {iconMap[item.icon]}
          &emsp;
          {item.label}
        </Button>
      ))}
    </Grid>
  )
}