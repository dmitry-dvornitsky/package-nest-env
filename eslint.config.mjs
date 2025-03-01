// @ts-check
import { configs } from '@forge.dev/package-nest-config/eslint.config.mjs'
import tseslint from 'typescript-eslint'

export default tseslint.config(...configs)
