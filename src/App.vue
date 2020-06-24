<template>
	<div id="app">
		<router-view />
		<div class="loading" v-show="waitflag">
			<img src="./assets/waitpay.gif" alt />
			<span>{{content}}</span>
		</div>
	</div>
</template>

<script>
import "./assets/common.css";
import apis from "./js/api";
import { postRequest } from "./js/httputil";
export default {
	name: "App",
	data() {
		return {
			content: "资源加载中!",
			waitflag: false
		};
	},
	created() {
		//请求用户详情
		postRequest(apis.getUserInfo).then(res => {
			this.content = "加载用户身份信息";
			this.waitflag = true;
			if (
				res.data.code == 1
				// res.data.data.hasOwnProperty('name')//do not access Object.prototype method "hasownproperty" from targrt object
				// Object.prototype.hasOwnProperty.call(res.data.data, "name")
			) {
				this.waitflag = false;
				window.localStorage.setItem("status", 0);
				this.$store.commit("updateuserinfo", res.data.data);
			} else {
				// window.localStorage.clear(); //清空缓存
				this.content = "验证用户身份信息";
				this.waitflag = true;
				this.getCode(); //重新获取code
			}
		});

		//在页面加载时读取sessionStorage里的状态信息
		if (sessionStorage.getItem("store")) {
			this.$store.replaceState(
				Object.assign(
					{},
					this.$store.state,
					JSON.parse(sessionStorage.getItem("store"))
				)
			);
		}
		//在页面刷新时将vuex里的信息保存到sessionStorage里
		window.addEventListener("beforeunload", () => {
			sessionStorage.setItem("store", JSON.stringify(this.$store.state));
		});
	},
	methods: {
		// 获取code
		getCode() {
			// let local = "http://jszytbvue.appux.cn"; // 获取页面url
			let local = window.location.href; // 获取页面url
			let appid = "wx2b60ba13efb06448";
			let code = this.getUrlParam("code");
			if (code == null || code === "") {
				// 如果没有code，则去请求
				window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
					local
				)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
			} else {
				window.localStorage.setItem("code", code);
				//请求openid
				postRequest(apis.getAuthorizatio, {
					code: window.localStorage.getItem("code")
				}).then(res1 => {
					window.localStorage.setItem(
						"jwt",
						`Bearer ${res1.data.extra.Authorization}`
					);
					window.localStorage.setItem(
						"accessToken",
						res1.data.data.access_token
					);
					window.localStorage.setItem("openid", res1.data.data.openid);
					//请求微信用户信息
					this.content = "读取微信授权信息";
					postRequest(apis.getWxUserInfo, {
						accessToken: window.localStorage.getItem("accessToken"),
						openid: window.localStorage.getItem("openid")
					}).then(res2 => {
						window.localStorage.setItem("uid", res2.data.extra.uid);
						this.$store.commit("updateauthorizatio", res2.data.data);
						//获取jwt
						postRequest(apis.getJwt, {
							uid: window.localStorage.getItem("uid")
						}).then(res3 => {
							//保存jwt到本地
							this.content = "验证成功";
							window.localStorage.setItem("jwt", `Bearer ${res3.data.data}`);
							window.location.href = "http://ksyzytb.appux.cn/";
						});
					});
				});
			}
		},
		// 截取url中的code方法
		getUrlParam(name) {
			let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
			if (reg.test(location.href)) {
				return unescape(RegExp.$2.replace(/\+/g, " "));
			}
			return "";
		}
	}
};
</script>

<style lang="scss">
html,
body {
	margin: 0;
	padding: 0;
}
#app {
	.loading {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		color: #fff;
		img {
			width: 100%;
		}
		span {
			width: 100%;
			text-align: center;
		}
	}
}
</style>
