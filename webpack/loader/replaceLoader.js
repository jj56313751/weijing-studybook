const loaderUtils = require('loader-utils')
module.exports = function(context) {
  // console.log(loaderUtils.getOptions(this))
  const { name } = loaderUtils.getOptions(this)
  return context.replace('loader', 'webpack')
}