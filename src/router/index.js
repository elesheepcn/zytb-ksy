import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",//首页
    name: "Home",
    component: Home
  },
  {
    path: "/addSchool",//添加校考
    name: "AddSchool",
    component: () => import("../views/AddSchool.vue")
  },
  {
    path: "/addmajor",//添加统考
    name: "Addmajor",
    component: () => import("../views/Addmajor.vue")
  },
  {
    path: "/schoolDetails",//学校详情
    name: "SchoolDetails",
    component: () => import("../views/SchoolDetails.vue")
  },
  {
    path: "/guide",//报考指南
    name: "Guide",
    component: () => import("../views/Guide.vue")
  },
  {
    path: "/me",//我的
    name: "Me",
    component: () => import("../views/Me.vue")
  },
  {
    path: "/aboutour",//关于我们
    name: "Aboutour",
    component: () => import("../views/Aboutour.vue")
  },
  {
    path: "/myReportCard",//我的资料
    name: "MyReportCard",
    component: () => import("../views/MyReportCard.vue")
  },
  {
    path: "/collect",//我的收藏
    name: "Collect",
    component: () => import("../views/Collect.vue")
  },
  {
    path: "/rankQuery",//位次查询
    name: "RankQuery",
    component: () => import("../views/RankQuery.vue")
  },
  {
    path: "/newList",//消息列表
    name: "NewList",
    component: () => import("../views/NewList.vue")
  },
  {
    path: "/new",//消息
    name: "New",
    component: () => import("../views/New.vue")
  },
  {
    path: "/newinfo",//资讯详情
    name: "Newinfo",
    component: () => import("../views/Newinfo.vue")
  },

];

const router = new VueRouter({
  mode:'history',
  base: '/Project/',
  routes
});
router.afterEach(() => {
  window.scrollTo(0, 0)
});
export default router;
