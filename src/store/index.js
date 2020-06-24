import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userinfo:{},//用户信息
    authorizatio:{},//微信用户信息
    news:[],//资讯
    volunteer:[],//志愿列表
    collect:[],//收藏列表
    schoollist:[],//报考指南学校列表
    getSchoolList:[],//院校列表
    msglist:[],//消息列表
    baikelist:[],//百科列表
    provincelist:[],//省份列表
    bannerlist:[],//轮播图
    zhinenglist:[],//智能填报列表
    configlist:{},//配置列表
    majorlist:[],//专业
    ZytbSearch:[],//智能填报筛选项
    zhi:false,//智能推荐卡
    bao:false,//院校指南卡
    guidefiltrate:[
      { id: 0, name: "province", list: [] }, //省
      { id: 1, name: "major", list: [] }, //专业
      { id: 2, name: "tag", list: [] }, //院校标签
      { id: 3, name: "property", list: [] }, //办学性质
      { id: 4, name: "batch", list: [] }, //批次
      { id: 5, name: "majorlist", list: [] } //二级专业列表
    ],//报考指南筛选配置
  },
  mutations: {
    //更新用户信息
    updateuserinfo(state,data){
      state.userinfo=data
    },
    //更新微信用户信息
    updateauthorizatio(state,data){
      state.authorizatio=data
    },
    //更新资讯
    updatenews(state,data){
      state.news=data
    },
    //更新志愿
    updatevolunteer(state,data){
      state.volunteer=data
    },
    //删除志愿
    delvolunteer(state,index){
      state.volunteer.splice(index,1)
    },
    //更新报考指南学校列表
    updateschoollist(state,data){
      state.schoollist=data
    },
    //更新消息列表
    updatemsglist(state,data){
      state.msglist=data
    },
    //更新百科列表
    updatebaikelist(state,data){
      state.baikelist=data
    },
    //更新轮播图列表
    updatebannerlist(state,data){
      state.bannerlist=data
    },
    //更新省份列表
    updateprovincelist(state,data){
      state.provincelist=data
    },
    //更新院校列表
    getSchoolList(state,data){
      state.getSchoolList=data
    },
    //更新智能填报
    getzhinenglist(state,data){
      state.zhinenglist=data
    },
    //添加资讯
    addnews(state,data){
      state.news=state.news.concat(data)
    },
    //添加资讯
    addSchoolList(state,data){
      state.schoollist=state.schoollist.concat(data)
    },
    //更新配置
    updateconfiglist(state,data){
      state.configlist=data
    },
    //更新专业
    updatemajorlist(state,data){
      state.majorlist=data
    },
    //更新智能填报筛选项
    updateZytbSearch(state,data){
      state.ZytbSearch=data
    },
    //更新智能填报筛选项
    updatecollect(state,data){
      state.collect=data
    },
    //更新报考指南筛选项
    updateguideset(state,data){
      state.guidefiltrate=data
    },
    //更新报考指南筛选项
    updatezhi(state,data){
      state.zhi=data
    },
    //更新报考指南筛选项
    updatebao(state,data){
      state.bao=data
    },
    //插入广告
    // addbanner(state,data){
    //   let arr=[]
    //   for (let item of data) {
    //     for (let  item1 of state.schoollist) {
    //       arr.push(item1)
    //       for (let  item2 of arr) {
    //         if(item2.index %3 == 0){
    //           arr.push(item)
    //         }
    //       }
    //     }
    //   }
    //   state.schoollist=arr
    // },
   

  },
});
