const errorCode = {
  777: '前端错误码未定义',
  999: '服务器未知错误',
  10000: '未携带令牌',
  10020: '资源不存在',
  10030: '参数错误',
  10041: 'assessToken损坏',
  10042: 'refreshToken损坏',
  10050: '令牌过期',
  10051: 'assessToken过期',
  10052: 'refreshToken过期',
  10060: '字段重复',
  10070: '不可操作',

  //   0 成功

  // 9999 服务器未知错误

  // 10000 认证失败

  // 10020 资源不存在

  // 10030 参数错误

  // 10040 令牌失效

  // 10050 令牌过期

  // 10060 字段重复

  // 10070 禁止操作

  // 10080 请求方法不允许

  // 10100 refresh token 获取失败

  // 10110 文件体积过大

  // 10120 文件数量过多

  // 10130 文件扩展名不符合规范

  // 10140 请求过于频繁，请稍后重试
}

export default errorCode
