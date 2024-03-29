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
      "50": "#464555",
      "100": "#3F3E4D",
      "200": "#33323F"
    },
    lilac: {
      "50": "#7C75BE"
    },
    red: {
      "50": "#DB6E5F"
    },
    grey: {
      "50": "#CBD3DB",
      "100": "#F3F7FA"
    },
    black: {
      "50": "#3f3f3f"
    },
    orange: {
      "50": "#FE922F"
    }
  },
  components: {
    Button: {
        // baseStyle: {
        //     paddingLeft: '100'
        // },
        variants: {
            solid: {
                padding: "10px 47px 10px 47px",
              },
            outline: {
              padding: "10px 47px 10px 47px",
            },
            icon: {
              bg: 'transparent',
              padding: "0px 0px 0px 0px",
              width: '30px'
            },
            pink: {
              padding: "10px 47px 10px 47px",
              color: "white.50",
              bg: "pink.50",
              _hover: { bgColor: "pink.100" },
              _active: { bgColor: "pink.200" }
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