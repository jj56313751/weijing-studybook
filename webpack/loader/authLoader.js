const loaderUtils = require('loader-utils')

module.exports = function(context) {
  console.log('authLoader~~~~~')
  const { sign } = loaderUtils.getOptions(this)
  return (`/**
    Author: ${sign}
  **/ 
  ${context}`)
}