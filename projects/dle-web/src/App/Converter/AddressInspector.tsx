import { setTransformStyle } from '@cjo3/shared/logic/dle'
import { Drawer, Grid, List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import React from 'react'
import {
  TransformResultCellCollection,
  TransformSummary
} from '../../store/converter/interfaces'

const useStyles = makeStyles(
  theme => ({
    AddressInspector_sideDrawer: {
      ...theme.custom.setFlex('column'),
      padding: theme.custom.setSpace(),
      backgroundColor: theme.palette.grey[900]
    },
    AddressInspector_innerList: {
      height: '100%'
    },
    AddressInspector_addressListItem: {
      'marginTop': theme.custom.setSpace(),
      ...theme.custom.noSelect,
      ...theme.custom.setFlex('column'),
      'transition': 'all 250ms linear',
      'color': theme.palette.grey[400],
      '&:hover': {
        color: theme.palette.grey[50]
      }
    },
    AddressInspector_transformRow: {
      marginTop: theme.custom.setSpace()
    },
    AddressInspector_doubleArrow: {
      fontSize: theme.typography.fontSize * 1.5,
      color: theme.palette.grey[800]
    }
  }),
  {
    name: 'AddressInspector'
  }
)

interface Props {
  drawerOpen: boolean
  closeDrawerHandler: (event: React.MouseEvent) => void
  drawerDataName: string
  allTransforms: TransformResultCellCollection
  addresses: TransformSummary[]
  dataUrls: {
    [key: string]: {
      original: string
      transform: string
    }
  }
}

export const AddressInspector: React.FC<Props> = ({
  drawerOpen,
  closeDrawerHandler,
  drawerDataName,
  allTransforms,
  addresses,
  dataUrls
}): JSX.Element => {
  const classes = useStyles()

  const appTheme = useTheme()

  if (!addresses) return null

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={closeDrawerHandler}
      PaperProps={{
        classes: {
          root: classes.AddressInspector_sideDrawer
        }
      }}>
      <List className={classes.AddressInspector_innerList}>
        {drawerDataName &&
          addresses.map(address => {
            const transformImage =
              dataUrls[allTransforms[address].meta.original.w].transform.light
            const originalImage =
              dataUrls[allTransforms[address].meta.original.w].original.light

            const additionalStyle = {
              ...appTheme.custom.borderRadius,
              ...appTheme.custom.valueImage
            }

            const originalStyle = {
              ...setTransformStyle(originalImage, '#03a9f4'),
              ...additionalStyle
            }
            const transformStyle = {
              ...setTransformStyle(transformImage, '#f50057'),
              ...additionalStyle
            }

            return (
              <ListItem
                key={`drawer-data-item-${address}`}
                className={classes.AddressInspector_addressListItem}
                alignItems="center">
                <ListItemText
                  primary={address}
                  primaryTypographyProps={{
                    align: 'center',
                    variant: 'h5'
                  }}
                />
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  className={classes.AddressInspector_transformRow}>
                  <div style={originalStyle} />
                  &emsp;
                  <DoubleArrowIcon
                    className={classes.AddressInspector_doubleArrow}
                  />
                  &emsp;
                  <div style={transformStyle} />
                </Grid>
              </ListItem>
            )
          })}
      </List>
    </Drawer>
  )
}
