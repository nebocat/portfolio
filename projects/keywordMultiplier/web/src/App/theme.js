import { setCustomTheme } from '@colin30/shared/react/theming'
import primary from '@material-ui/core/colors/cyan'
import secondary from '@material-ui/core/colors/indigo'

export const theme = setCustomTheme(
  12,
  'Heebo',
  [
    {
      fontFamily: 'Heebo',
      fontStyle: 'normal',
      fontWeight: 400,
      fontDisplay: 'swap',
      src:
        "local('Heebo'), local('Heebo-Regular'), url('https://fonts.gstatic.com/s/heebo/v5/NGS6v5_NC0k9P9H2TbFhsqMA.woff2') format('woff2')",
      unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
    },
    {
      fontFamily: 'Heebo',
      fontStyle: 'normal',
      fontWeight: 900,
      fontDisplay: 'swap',
      src:
        "local('Heebo Black'), local('Heebo-Black'), url('https://fonts.gstatic.com/s/heebo/v5/NGS3v5_NC0k9P9l1aqRMkK4q06VE.woff2') format('woff2')",
      unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
    }
  ],
  primary,
  secondary,
  'rgb(68, 68, 68)',
  3
)

theme.typography.subtitle1 = {
  [theme.breakpoints.down('xs')]: {
    color: 'red',
    fontSize: theme.custom.setSpace()
  }
}

theme.palette.gradients = {
  screen: 'linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75))'
}

theme.shadows.concat([
  `inset ${theme.custom.setSpace() / 2}px ${theme.custom.setSpace() / 2}px ${
    theme.custom.setSpace() / 2
  }px ${theme.palette.grey[50]}`
])
