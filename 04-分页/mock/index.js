import Mock from 'mockjs';
import focusList from '@/mock/focus.json'
import floorList from '@/mock/floor.json'
import rankList from '@/mock/rank.json'

Mock.mock('http://mock.com/adv/focus','get',{
    ok:200,
    data:focusList
})

Mock.mock('http://mock.com/adv/footadv','get',{
    code:200,
    data:[
        {
            id:Math.random(),
            imgUrl:'https://img.alicdn.com/imgextra/i3/O1CN01PNQnKX1oAJvpy2XGW_!!6000000005184-0-tps-400-400.jpg'
        },
        {
            id:Math.random(),
            imgUrl:'https://gtms04.alicdn.com/tps/i4/TB1Kaq717L0gK0jSZFtSutQCXXa.jpg'
        },
        {
            id:Math.random(),
            imgUrl:'https://img.alicdn.com/imgextra/i4/O1CN01aHlaIX1d8Wa99XNME_!!6000000003691-2-tps-400-400.png'
        },
        {
            id:Math.random(),
            imgUrl:'https://img0.baidu.com/it/u=88087746,1309797164&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
        },
        {
            id:Math.random(),
            imgUrl:'https://img1.baidu.com/it/u=3760832329,102036791&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500'
        },
        {
            id:Math.random(),
            imgUrl:'https://img.alicdn.com/imgextra/i1/O1CN015QgWrj1tyJDSgXhIv_!!6000000005970-2-tps-400-400.png'
        },
        {
            id:Math.random(),
            imgUrl:'https://img2.baidu.com/it/u=2763952656,2313421040&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500'
        },
        {
            id:Math.random(),
            imgUrl:'https://img0.baidu.com/it/u=3206769144,4277522226&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
        },
        {
            id:Math.random(),
            imgUrl:'https://img2.baidu.com/it/u=534545229,602914462&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500'
        },
        {
            id:Math.random(),
            imgUrl:'https://img2.baidu.com/it/u=1502427229,1371954625&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
        },
    ]
})

Mock.mock('http://mock.com/adv/floor','get',{
    code:200,
    data:floorList
})

Mock.mock('http://mock.com/adv/jddata','get',{
    code:200,
    data:rankList
})