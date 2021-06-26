import Mock from 'mockjs'
const baseUrl = process.env.VUE_APP_BASE_URL


Mock.mock(baseUrl + 'author/subscriber/shiyu', {
    status: 200,
    data: {
        code: 0,
        data: [
            {
                email: '330798457@qq.com',
                category: '免费',
                date: '2020-01-01',
            },
            {
                email: '186@qq.com',
                category: '月付',
                date: '2020-03-01',
            },
            {
                email: 'fd2sfdfs@qq.com',
                category: '免费',
                date: '2020-01-01',
            },
            {
                email: 'joe@128.com',
                category: '季付',
                date: '2020-03-01',
            },
            {
                email: 'abc@163.com',
                category: '年付',
                date: '2020-01-01',
            },
            {
                email: '888999@ccc.com',
                category: '月付',
                date: '2020-03-01',
            },
            {
                email: '123@nuttab.com',
                category: '免费',
                date: '2020-01-01',
            },
            {
                email: '5565353@xxx.com',
                category: '月付',
                date: '2020-03-01',
            },

        ]
    }

});

Mock.mock(baseUrl + 'author/shiyu', {
    status: 200,
    data: {
        code: 0,
        data: {
            username: '石雨',
            channelName: '石雨的Newsletter',
            profile: '一个小私募的小基金经理，分享投资和修行路上的学习感悟',
            avatarUrl: 'http://qv42v7med.hn-bkt.clouddn.com/shiyu.jpg'
        }
    }
});


