<template>
	<!-- 我的 -->
	<div class="me">
		<div class="top">
			<div class="topbox">
				<div class="img" @click="$router.push({path:'/',query: { v: 0 }})">
					<img class="reback" src="../assets/back1.png" alt />
					<span>返回</span>
				</div>
				<p class="title">个人中心</p>
			</div>
			<div class="header">
				<img :src="getuserinfo.photo[0]" alt />
			</div>
			<p class="name">{{getuserinfo.nickname}}</p>
		</div>
		<div class="block" @click="go('/MyReportCard')">
			<div class="img">
				<img class="right1" src="../assets/chengjidan.png" alt />
			</div>
			<span>我的资料</span>
			<img class="next" src="../assets/jiantou@2x.png" alt />
		</div>
		<div class="block" @click="go('/Collect')">
			<div class="img">
				<img class="right3" src="../assets/mywish.png" alt />
			</div>
			<span>我的收藏</span>
			<img class="next" src="../assets/jiantou@2x.png" alt />
		</div>
		<div class="block" @click="go('/Aboutour')">
			<div class="img">
				<img class="right2" src="../assets/about.png" alt />
			</div>
			<span>关于我们</span>
			<img class="next" src="../assets/jiantou@2x.png" alt />
		</div>
	</div>
</template>

<script>
import apis from "../js/api";
import { postRequest } from "../js/httputil";
export default {
	name: "Me",
	data() {
		return {};
	},
	created() {
		//请求用户详情
		postRequest(apis.getUserInfo).then(res => {
			console.log(res, "me");
			this.$store.commit("updateuserinfo", res.data.data);
		});
	},
	computed: {
		getuserinfo() {
			return this.$store.state.userinfo;
		}
	},
	methods: {
		go(v) {
			if (v == "/MyReportCard") {
				window.localStorage.setItem("homestate", 1);
			}
			this.$router.push(v);
		}
		//图片地址
		// getimguri(uri = "zytb/loading.gif") {
		// 	return apis.imguri + uri;
		// },
	}
};
</script>

<style lang="scss" scoped>
.me {
	width: 100vw;
	height: 100vh;
	overflow: auto;
	background-color: #f3f3f3;
	.top {
		width: 100vw;
		font-size: 16px;
		height: 200px;
		position: relative;
		background: linear-gradient(#fe4e41 0%, #f53e3b -45%);
		background: -ms-linear-gradient(#fe4e41 0%, #f53e3b -45%);
		background: -webkit-linear-gradient(#fe4e41 0%, #f53e3b -45%);
		background: -moz-linear-gradient(#fe4e41 0%, #f53e3b -45%);
		.topbox {
			font-weight: bold;
			position: absolute;
			top: -1px;
			left: 0;
			width: 100%;
			height: 50px;
			color: #fff;
			display: flex;
			justify-content: start;
			align-items: center;
			.img {
				width: 20%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					width: 20px;
				}
			}
			p {
				width: 60%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.header {
			position: absolute;
			top: 67px;
			left: 155px;
			width: 62px;
			height: 62px;
			// border-radius: 50%;
			// border: solid 1px #f6f6f6;
			img {
				border-radius: 50%;
				width: 62px;
				height: 62px;
			}
		}
		.name {
			width: 100vw;
			text-align: center;
			padding-top: 140px;
			font-size: 18px;
			color: #fff;
		}
		.down {
			text-align: center;
			.culture {
				display: inline-block;
				vertical-align: middle;
				margin-right: 67px;
				.number {
					font-size: 30px;
					color: #fff;
				}
				.text {
					color: #fff;
				}
			}
			.bulkhead {
				display: inline-block;
				vertical-align: middle;
				width: 1px;
				height: 20px;
				background-color: #fff;
			}
			.major {
				display: inline-block;
				vertical-align: middle;
				margin-left: 67px;
				.number {
					font-size: 30px;
					color: #fff;
				}
				.text {
					color: #fff;
				}
			}
		}
	}
	.block {
		width: 100vw;
		height: 50px;
		background-color: #fff;
		margin-bottom: 5px;
		padding: 0px 15px 0px 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.img {
			width: 10%;
			display: flex;
			align-items: center;
			justify-content: center;
			.right1 {
				width: 16px;
			}
			.right2 {
				width: 21px;
			}
			.right3 {
				width: 19px;
			}
		}
		span {
			width: 87%;

			color: #333;
		}
		.next {
			width: 3%;
		}
	}
}
</style>
