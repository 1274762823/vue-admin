export default {
    currency(v,n,type='￥'){
        return type+v?.toFixed(n)
    }
}