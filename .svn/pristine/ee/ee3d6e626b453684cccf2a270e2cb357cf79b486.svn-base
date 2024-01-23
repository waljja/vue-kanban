const complement = function (value:any) {
  return value < 10 ? `0${value}` : value
}
  
export default (date:any) => {
  const time = new Date(date)
  const year = time.getFullYear()
  const month = complement(time.getMonth() + 1)
  const day = complement(time.getDate())
  const hour = complement(time.getHours())
  const minute = complement(time.getMinutes())
  const second = complement(time.getSeconds())
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
  