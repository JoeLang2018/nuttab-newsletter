import _axios, { post, get, put, _delete } from '@/utils/axios'
import { saveTokens } from '../utils/token'
import store from '@/store'

class User {
    // constructor() {}

    //注册
    async register(data) {
        const res = await post('/user/register', data)
        const tokens = res.data
        saveTokens(tokens.access_token, tokens.refresh_token)
        return tokens
    }
    async checkDomain(domain) {
        const res = await get(`/user/domain/${domain}`)
        return res
    }
    async checkEmail(email) {
        const res = await get(`/user/email/${email}`)
        return res
    }
    async sendCode(email) {
        const res = await post('/user/code', email)
        return res
    }
    //登录获取token
    async login(email, code) {
        const res = await post('/user/login', {
            email,
            code,
        })
        const tokens = res.data.data
        saveTokens(tokens.access_token, tokens.refresh_token)
        return tokens
    }

    /**
 * 获取当前用户信息，并返回User实例
 */
    async getInformation() {
        const info = await get('/user/information')
        const storeUser = store.getters.user === null ? {} : store.getters.user
        return Object.assign({ ...storeUser }, info.data)
    }
    async updateInformation(data) {
        const res = await put('/user/information', data)
        console.log(res)
        return res
    }
}
export default new User()