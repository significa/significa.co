const path = require('path');
const parseAlphaColor = (color) => color?.replace('<alpha-value>', '1');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    path.join(path.dirname(require.resolve('@significa/svelte-ui')), '**/*.{html,js,svelte,ts}')
  ],
  presets: [
    require('@significa/svelte-ui/tailwind-preset')({
      fonts: {
        sans: {
          name: 'Significa Sans',
          fontFaces: [
            {
              fontWeight: '400',
              src: `url('/fonts/significa-regular.woff2') format('woff2')`,
              ascentOverride: '95%'
            },
            {
              fontWeight: '500',
              src: `url('/fonts/significa-medium.woff2') format('woff2')`,
              ascentOverride: '95%'
            },
            {
              fontWeight: '600',
              src: `url('/fonts/significa-semibold.woff2') format('woff2')`,
              ascentOverride: '95%'
            }
          ]
        }
      }
    })
  ],
  theme: {
    container: {
      screens: {
        DEFAULT: '1536px'
      }
    },
    typography: (theme) => ({
      DEFAULT: {
        css: {
          'p, ul, ol': {
            fontSize: theme('fontSize.xl')[0],
            lineHeight: theme('lineHeight.normal')
          },
          p: {
            '&:not(:last-child)': {
              marginBottom: '1.5ch'
            }
          },
          b: {
            fontWeight: theme('fontWeight.semibold')
          },
          a: {
            color: parseAlphaColor(theme('colors.foreground.accent')),
            textDecoration: 'underline'
          },
          // inline code
          code: {
            '&:not([class*="language-"])': {
              fontFamily: theme('fontFamily.mono'),
              fontSize: '0.8em',
              fontWeight: theme('fontWeight.medium'),
              padding: '2px 4px',
              borderRadius: theme('borderRadius.xs'),
              border: `1px solid ${parseAlphaColor(theme('colors.border.subtle'))}`,
              backgroundColor: parseAlphaColor(theme('colors.background.offset'))
            }
          },
          // lists
          'ol, ul': {
            marginBlock: '2ch',
            paddingLeft: '1.5ch',
            'ol, ul': {
              marginTop: '0.8ch'
            }
          },
          ol: {
            listStyleType: 'decimal',

            '& > li::marker': {
              color: parseAlphaColor(theme('colors.foreground.tertiary'))
            }
          },
          ul: {
            '& > li': {
              listStyleType: 'none',
              position: 'relative'
            },
            '& > li::before': {
              content: '""',
              position: 'absolute',
              top: '10px',
              left: '-1.5ch',
              width: '9px',
              height: '9px',
              backgroundColor: parseAlphaColor(theme('colors.foreground.tertiary')),
              maskImage: `url('data:image/svg+xml;utf8,<svg width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8c1.958 0 3.5-1.495 3.5-3.394S5.958 0 4 0 .5 2.707.5 4.606 2.042 8 4 8Z" fill="currentColor"/></svg>')`,
              maskRepeat: 'no-repeat',
              maskPosition: 'center center'
            }
          },
          // blockquote
          blockquote: {
            lineHeight: theme('lineHeight.normal'),
            backgroundColor: parseAlphaColor(theme('colors.background.offset')),
            padding: '24px',
            borderRadius: theme('borderRadius.md'),
            marginBlock: '32px'
          },
          // headings
          'h1, h2, h3, h4': {
            scrollMarginTop: '1rem'
          },
          h1: {
            '@apply text-5xl': {},
            fontWeight: theme('fontWeight.semibold'),
            marginBottom: '1ch',

            '&:not(:first-child)': {
              marginTop: '4ch'
            }
          },
          h2: {
            '@apply text-3xl': {},
            fontWeight: theme('fontWeight.semibold'),
            marginBottom: '1ch',

            '&:not(:first-child)': {
              marginTop: '3.5ch'
            }
          },
          h3: {
            '@apply text-2xl': {},
            fontWeight: theme('fontWeight.semibold'),
            marginBottom: '1ch',

            '&:not(:first-child)': {
              marginTop: '3ch'
            }
          },
          h4: {
            '@apply text-xl': {},
            fontWeight: theme('fontWeight.semibold'),
            marginBottom: '1ch',

            '&:not(:first-child)': {
              marginTop: '2.5ch'
            }
          },
          // break
          hr: {
            border: 'none',
            marginBlock: '32px',
            height: '20px',
            backgroundColor: parseAlphaColor(theme('colors.foreground.DEFAULT')),
            maskImage: `url('data:image/svg+xml;utf8,<svg width="52" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12c1.958 0 3.5-1.495 3.5-3.394S9.958 4 8 4 4.5 6.707 4.5 8.606C4.5 10.506 6.042 12 8 12ZM26 12c1.958 0 3.5-1.495 3.5-3.394S27.958 4 26 4s-3.5 2.707-3.5 4.606c0 1.9 1.542 3.394 3.5 3.394ZM44 12c1.958 0 3.5-1.495 3.5-3.394S45.958 4 44 4s-3.5 2.707-3.5 4.606c0 1.9 1.542 3.394 3.5 3.394Z" fill="black"/></svg>')`,
            maskRepeat: 'no-repeat',
            maskPosition: 'center center'
          },
          // margin clear
          '& > *:first-child': {
            marginTop: '0 !important'
          },
          '& > *:last-child': {
            marginBottom: '0 !important'
          }
        }
      }
    }),
    extend: {
      fontFamily: {
        comic: 'Comic Sans MS, Chalkboard SE, Comic Neue, Comic Sans, sans-serif'
      },
      fontSize: {
        notebook: ['clamp(0.65rem, 1vw, 1rem)', { lineHeight: '2em' }]
      },
      screens: {
        xs: '480px'
      },
      padding: {
        container: 'clamp(1rem, 5vw, 3rem)'
      },
      keyframes: {
        strike: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        },
        'strike-clip-path': {
          '0%': { 'clip-path': 'polygon(0 0, 0% 0, 0% 120%, 0 120%)' },
          '100%': { 'clip-path': 'polygon(0 0, 100% 0, 100% 120%, 0 120%)' }
        },
        shake: {
          '0%': { transform: 'translateX(0px)' },
          '25%': { transform: 'translateX(-6px)' },
          '75%': { transform: 'translateX(6px)' },
          '0%': { transform: 'translateX(0px)' }
        }
      },
      animation: {
        strike: 'strike 300ms ease-in-out forwards',
        'strike-clip-path': 'strike-clip-path 300ms ease-in-out forwards',
        shake: 'shake 600ms cubic-bezier(.78,-0.02,.36,.97)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'rich-text'
    }),
    require('@tailwindcss/container-queries')
  ]
};
