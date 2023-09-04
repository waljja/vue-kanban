const complement = function (value:any) {
  return value < 10 ? `0${value}` : value
}

// 报表年月日
export default (date:any) => {
  const time = new Date(date)
  const year = time.getFullYear()
  const month = complement(time.getMonth() + 1)
  const day = complement(time.getDate())
  return `${year}-${month}-${day}`
}