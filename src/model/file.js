import _axios, { post, get, put, _delete } from '@/utils/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class File {
  // constructor() {}

  async upload(data) {
    const res = await post('/file', data)
    return res
  }

  // async update(data) {
  //   const res = await put('/file', data)
  //   return res
  // }
}

export default new File()
