import _axios, { get, post, put, _delete } from '@/utils/axios'

class Article {
    // constructor() {}
    async getArticles(domain) {
        const res = await get(`/article/${domain}`)
        return res
    }
    async getArticleById(id) {
        const res = await get(`/article/${id}`)
        return res
    }
    async getDrafts(domain) {
        const res = await get(`/article/draft/${domain}`)
        return res
    }
    async postArticle(data) {
        const res = await post('/article', data)
        return res
    }
    async saveDraft(data) {
        const res = await post('/article/draft', data)
        return res
    }
    async deleteArticle(id) {
        const res = await _delete(`/article/${id}`)
        return res
    }
    async deleteDraft(id) {
        const res = await _delete(`/article/draft/${id}`)
        return res
    }

}
export default new Article()