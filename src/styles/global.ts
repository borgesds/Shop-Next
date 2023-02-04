import { globalCss } from "."

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0,
    },

    body: {
        '-webkit-font-smoothing': 'antialiased',
        background: '$gray900',
        color: '$gray100',
    },

    'body, input, button, textarea': {
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 400,
    }
})