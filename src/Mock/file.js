import Mock from 'mockjs'
const baseUrl = process.env.VUE_APP_BASE_URL


Mock.mock(baseUrl + 'file', 'post', function (option) {
    // 这里的option是请求的相关参数
    // const params = JSON.parse(option.body)
    // console.log('params', params)
    return Mock.mock({
        status: 200,
        data: {
            code: 0,
            data: {
                message: '上传成功',
                url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1682050408,2246241836&fm=26&gp=0.jpg'
            }
        }
    })

});