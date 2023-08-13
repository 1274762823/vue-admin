import {register, sendCode,loginPost,getUserInfo,logOut,tradeInfo} from "@/api/user";
import {saveToken} from "@/utils/auth";
import router from "@/router/index";
import {Message} from "element-ui";

const state = {
    userInfo:null
};

const mutations = {
    SAVE_USER_INFO(state,userInfo){
        state.userInfo = userInfo
    },
    OUT_LOGIN(state){
        state.userInfo = null
        router.push('/login')
    }
};

const actions = {

    //退出登录
    async logOutAsync({commit}){
        await logOut();
        commit('OUT_LOGIN')
    },

    //根据token获取用户信息
    async getUserInfoAsync({commit}){
      const res = await getUserInfo();
      commit('SAVE_USER_INFO',res.data)

    },

    //登录
    // async loginPostAsync({dispatch},body){
    //      const {data} = await loginPost(body);
    //      saveToken(data.token)
    //      await dispatch('getUserInfoAsync');
    //      Message.success('登陆成功');
    //      router.push('/')
    //     // console.log(data)
    // },
    async loginPostAsync({dispatch},body){
        const {code,data} = await loginPost(body);
        if(code === 200){
            Message.success("恭喜您，登陆成功！");
            saveToken(data.token);
            // const {cb} = router.history.current.query;
            // if(cb) router.push(cb);
            // else router.push("/");// 跳转至首页
            const {cb} = router.history.current.query;
            if(cb) router.push(cb);
            else router.push("/");// 跳转至首页
        }else{
            Message.error("账号或密码错误！");
        }
    },

    //注册
    async registerAsync(content,body){
        const res = await register(body);
        // console.log('u',res)
        return res

    },

    //获取验证码
    async sendCodeAsync(content,phone){
        const res = await sendCode(phone);
        return res.data;
    }
};

export default {
    namespaced:true,
    actions,
    state,
    mutations
}