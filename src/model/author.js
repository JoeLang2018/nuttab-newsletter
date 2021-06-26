// import request from '@/utils/request'
// export function getAuthorByName(name) {
//     return request({
//         url: '/author/' + name,
//         method: 'get',
//     })
// }
import _axios, { get, post, put, _delete } from '@/utils/axios'

class Author {
    // constructor() {}
    async getAuthor(domain) {
        const res = await get(`/author/${domain}`)
        return res
    }
    async subscribe(data) {
        const res = await post('/author/subscribe/', data)
        return res
    }
    async getSubscribers(domain) {
        const res = await get(`/author/subscriber/${domain}`)
        return res
    }
}
export default new Author()