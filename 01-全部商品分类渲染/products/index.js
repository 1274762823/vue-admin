import sphRequest from '@/request'

const getSphRes = ()=>{
    return sphRequest.get('/product/getBaseCategoryList')
}

export default  getSphRes