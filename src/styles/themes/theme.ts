import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    green: {
      "50": "#59BC6C"
    },
    pink: {
      "50": "#CE395F",
      "100": "#af2648",
      "200": "#851e37"
    },
    white: {
      "50": "#FFFFFF",
      "100": "#F5F5F5"
    },
    purple: {
      "50": "#464555"
    }
  },
  components: {
    Button: {
        baseStyle: {
            paddingLeft: '100'
        },
        variants: {
            solid: {
                bg: 'white',
                padding: "10px 47px 10px 47px",
            },
            icon: {
              bg: 'transparent',
              padding: "0px 0px 0px 0px",
              width: '30px'
            }
        }
    },
    Text: {
      baseStyle: {
        fontFamily: "Inter"
      }
    },
    Heading: {
      baseStyle: {
        fontFamily: "Inter",
        fontWeight: 600
      }
    }
  },
})

export default theme;