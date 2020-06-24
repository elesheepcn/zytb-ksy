//api地址
const HOST = "http://ksyzytb.appux.cn";
const API = HOST + "/api/v1/";

const Apis = {
    // 首页-----------------------------
    //广告图
    getBanner: API + 'index/getBanner',
    //一对一
    getExpert: API + 'index/getExpert',
    // 消息详情 
    getMsgDetail: API + 'system/getMsgDetail',
    // 消息列表 
    getMsg: API + 'system/getMsg',
    // 直播列表
    getLiveList: API + 'index/getLiveList',
    // 支付--------------------------------------
    create: API + 'Pay/create',
    // 微信支付jssdk
    sdk: API + 'user/jssdk',
    // 公共组---------------------------------------
    // 获取配置 
    getConf: API + 'system/getConf',
    // 获取服务价格
    getServe: API + 'system/getServe',
    // 获取短信验证码
    getCode: API + 'User/getCode',
    // 获取城市
    getCity: API + 'system/getCity',
    // 获取jwt 
    getJwt: API + 'system/getJwt',
    // 用户---------------------------------------
    // 用户openid
    getAuthorizatio: API + 'user/getAuthorizatio',
    // 微信用户信息
    getWxUserInfo: API + 'User/getWxUserInfo',
   // 查询志愿
   getVolunteer: API + 'User/getVolunteer',
    // 添加志愿
    addVolunteer: API + 'User/addVolunteer',
    // 删除志愿
    delVolunteer: API + 'User/delVolunteer',
    // 完善资料
    setUser: API + 'User/setUser',
    // 我的年卡
    getMyCard: API + 'User/getMyCard',
    // 绑定年卡
    setCard: API + 'User/setCard',
    // 绑定手机号
    setMobile: API + 'User/setMobile',
    // 用户详情
    getUserInfo: API + 'User/getUserInfo',
    // 百科-----
    // 百科标签
    getEncyclopediaTag: API + 'Index/getEncyclopediaTag',
    // 百科详情
    getEncyclopediaOne: API + 'Index/getEncyclopediaOne',
    // 资讯-----
    // 资讯列表
    getInfoList: API + 'Index/getInfoList',
    // 资讯详情
    getInfoOne: API + 'Index/getInfoOne',
    // 学校组----------------------------------------
    //体验
    getTestIntelligentNewspaper: API + 'school/getTestIntelligentNewspaper',
     // 我的收藏
     myCollect: API + 'school/myCollect',
     // 删除收藏
     delSchoolCollect: API + 'school/delSchoolCollect',
     // 添加收藏
     addSchooleCollect: API + 'school/addSchooleCollect',
     // 智能填报筛选项 
    getZytbSearch: API + 'system/getZytbSearch',
    // 报考指南筛选项 
    getSearch: API + 'system/getSearch',
    // 艺术类型选择
    index: API + 'index/index',
    // 综合分学校列表
    getSchoolList: API + 'school/getSchoolList',
    // 综合分查询
    getSynthesis: API + 'school/getSynthesis',
    // 专业查询
    getMajor: API + 'school/getMajor',
    // 报考指南
    getGuide: API + 'school/getGuide',
    // 智能填报
    getIntelligentNewspaper: API + 'school/getIntelligentNewspaper',
    // 学校详情
    getSchoolOne: API + 'school/getSchoolOne',
    // 位次查询
    getWeiSort: API + 'school/getWeiSort',
    //图片地址-----------------
    imguri:HOST + '/upload/',
}
export default Apis