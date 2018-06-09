const config = {
  username: {
    rule: /[\u4e00-\u9fa5]/,
    msg: '用户名错误'
  },

  xingming: {
    rule: /[\u4e00-\u9fa5]/,
    msg: '姓名错误'
  },

  phone: {
    rule: /0?(13|14|15|17|18|19)[0-9]{9}/,
    msg: '手机号码错误'
  },

  email: {
    rule: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    msg: '邮箱错误'
  },

  nameZn: {
    rule: /[\u4e00 - \u9fa5]/,
    msg: '请输入中文名称'
  },

  required: {
    rule: /\S/,
    msg: '数据不能为空'
  }
}

// 增加规则
function addRule(name, config) {
  config[name] = config
}

// 检查是否匹配
function check(name, value) {
  value = value.toString().trim()

  const pattern = config[name].rule || /\S/
  const msg = config[name].msg || '数据不能为空'

  const flag = pattern.test(value)

  return flag ? '' : msg
}

// 检查提交表单
function checkSubmit(data, checkKeyMap) {
  let errList = []
  Object.keys(checkKeyMap).forEach((key) => {
    let name = checkKeyMap[key]
    let value = data[key]
    let result = check(name, value)

    console.log(name)
    console.log(value)
    console.log(result)
    result && errList.push(result)
    console.log(errList)
    console.log('----------')
  })
  return errList
}

module.exports = {
  addRule,
  check,
  checkSubmit
}
