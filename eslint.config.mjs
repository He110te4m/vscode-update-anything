// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['.vscode'],
  },
  {
    rules: {
      'curly': [
        2,
        'all',
      ],
      'ts/ban-ts-comment': 0,
      'spaced-comment': [
        'error',
        'always',
        {
          line: {
            markers: ['#region', '#endregion', 'region', 'endregion', '/'],
          },
        },
      ],
    },
  },
)
