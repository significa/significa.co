import { addParameters, configure } from '@storybook/react'
import { themes } from '@storybook/theming'
import decorators from './decorators'

addParameters({
  options: {
    theme: themes.dark,
  },
})

decorators()

const req = require.context('../src', true, /.stories.tsx$/)
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ''
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  alert(`Navigate to: ${pathname}`)
}
configure(loadStories, module)
