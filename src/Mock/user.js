import Mock from 'mockjs'
const baseUrl = process.env.VUE_APP_BASE_URL

Mock.mock(baseUrl + 'user/information', 'get', {
    status: 200,
    data: {
        code: 0,
        data: {
            id: 1,
            username: '石雨',
            avatarUrl: require("@/assets/shiyu.jpg"),
            channelName: "石雨's Newsletter",
            domain: 'shiyu',
            profile: '一个私募基金经理人'
        }
    }
});

Mock.mock(baseUrl + 'user/information', 'put', function (option) {
    // 这里的option是请求的相关参数
    const params = JSON.parse(option.body)
    console.log('params', params)
    return Mock.mock({
        status: 200,
        data: {
            code: 0,
            data: {
                message: '更新成功',
                id: 1,
                username: '石雨',
                avatarUrl: require("@/assets/shiyu.jpg"),
                channelName: "石雨's Newsletter",
                domain: params.domain,
                profile: params.profile
            }
        }
    })
});

Mock.mock(baseUrl + 'user/email/123@qq.com', {
    status: 200,
    data: {
        code: 0,
        message: '邮箱未注册'
    }
});

Mock.mock(baseUrl + 'user/email/456@qq.com', {
    status: 200,
    data: {
        code: 99,
        message: '邮箱已注册'
    }
});

Mock.mock(baseUrl + 'user/code', 'post', {
    status: 200,
    data: {
        code: 0,
        message: '验证码已发送'
    }
});



Mock.mock(baseUrl + 'user/register', 'post', (option) => {
    // 这里的option是请求的相关参数
    const params = JSON.parse(option.body)
    // console.log('params', params)
    return Mock.mock({
        status: 200,
        data: {
            code: 0,
            data: {
                message: '注册成功',
                access_token: '123',
                refresh_token: 'abc'
            }
        }
    })

});


Mock.mock(baseUrl + 'user/login', 'post', (option) => {
    // 这里的option是请求的相关参数
    const params = JSON.parse(option.body)
    // console.log('params', params)
    if (params.email === '123@qq.com' && params.code === '123') {
        return Mock.mock({
            status: 200,
            data: {
                code: 0,
                data: {
                    message: '登录成功',
                    access_token: '123',
                    refresh_token: 'abc'
                }
            }
        })
    } else {
        return Mock.mock({
            status: 400,
            data: {
                code: 999,
                message: '用户名或密码错误'
            }
        })
    }


});
