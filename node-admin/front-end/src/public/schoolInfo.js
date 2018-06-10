
function generateGrade(start, end) {
  const arr = []
  for(let i = start; i <= end; i++) {
    let str = ''
    if(i < 10) {
      str = '0' + i
    } else {
      str = '' + i
    }
    str = str + '级'

    arr.push(str)
  }

  return arr
}

function generateClass(start, end) {
  const arr = []
  for (let i = start; i <= end; i++) {
    let str = i + '班'
    arr.push(str)
  }

  return arr
}

module.exports = {
  grades: generateGrade(5, 30),
  className: generateClass(1, 6),
  majors: ['物流', '会计']
}
