/** get offset */
exports.getOffset = (pageNo, limit) => {
  if (pageNo === 0) {
    pageNo = 1
  }
  const offsetVal = (pageNo - 1) * limit
  return offsetVal
}

/** random number */
exports.currentDateTime = function (type) {
  let date_ob = new Date()

  // current date
  // adjust 0 before single digit date
  let date = ('0' + date_ob.getDate()).slice(-2)

  // current month
  let month = ('0' + (date_ob.getMonth() + 1)).slice(-2)

  // current year
  let year = date_ob.getFullYear()

  // current hours
  let hours = date_ob.getHours()

  // current minutes
  let minutes = date_ob.getMinutes()

  // current seconds
  let seconds = date_ob.getSeconds()

  if (type == 'datetime')
    return (
      year +
      '-' +
      month +
      '-' +
      date +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds
    )

  if (type == 'date') return year + '-' + month + '-' + date

  if (type == 'time') return hours + ':' + minutes + ':' + seconds
}

/** random number */
exports.randomNumber = function () {
  return Number(Math.floor(1000 + Math.random() * 9000))
}

exports.getExecutionTimeDetails = function () {
  const startTime = new Date().getTime()
  const calculateExecutionTime = () => new Date().getTime() - startTime
  return { startTime, calculateExecutionTime }
}
