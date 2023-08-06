import {sphRequest,filmRequest} from "@/request";

const getSphData = function(){
    return sphRequest.get('/product/getBaseCategoryList')
}

const getFilmData = function (type){
    return filmRequest.get('/gateway',{
        params:{
            cityId:310100,
            pageNum:1,
            pageSize:4,
            type,
            k:Date.now()
        },
        headers:{
            'X-Client-Info':'{"a":"3000","ch":"1002","v":"5.2.1","e":"16903337102568622371241985","bc":"310100"}',
            'X-Host':'mall.film-ticket.film.list'
        }
    })
}

export {
    getSphData,
    getFilmData
};