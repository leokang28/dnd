const { addDecoratorsLegacy, disableEsLint, useBabelRc, override } = require('customize-cra')

module.exports = override(
  useBabelRc(),
  addDecoratorsLegacy(),
  disableEsLint()
)
