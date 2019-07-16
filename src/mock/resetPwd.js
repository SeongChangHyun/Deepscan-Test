import resetPwdData from './data/resetPwd'

export default {
  resetPwd: config => {
    console.log(JSON.parse(config.body))
    const { email } = JSON.parse(config.body)
    const result = resetPwdData.testList.filter(user => user.email === email)
    return result[0]
  },
  checkCode: config => {
    const { code } = JSON.parse(config.body)
    console.log(code)
    const result = resetPwdData.testList.filter(user => user.id === code)
    return result[0]
  }
}
