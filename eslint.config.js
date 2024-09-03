import { nas } from '@nas-studios/tooling-configs/eslint'

export default nas({
  typescript: {
    tsconfigPath: ['./tsconfig.json', './inertia/tsconfig.json'],
    typeAwareRules: false,
  },
})
