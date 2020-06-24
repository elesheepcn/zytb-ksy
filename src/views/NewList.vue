<template>
	<!-- 消息列表 -->
	<div class="newList">
		<div class="top">
			<div class="left" @click="$router.push({path:'/',query: { v: 0 }})">
				<img class="reback" src="../assets/back1.png" alt />
				<span>返回</span>
			</div>
			<div class="center">消息列表</div>
		</div>
		<div class="section">
			<div
				class="block"
				v-for="(item,index) in newslist"
				:key="index"
				@click="$router.push({path: '/new', query: {id: index} })"
			>
				<div class="img">
					<img src="../assets/xiaoxi1@2x.png" alt />
					<span class="dot" v-show="item.status == 0"></span>
				</div>
				<div class="center">
					<div class="up">
						<span class="left">
							<b>{{item.type}}</b>
						</span>
						<span class="right">{{item.create_time | times}}</span>
					</div>
					<p class="down">{{item.title}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import apis from "../js/api";
import { postRequest } from "../js/httputil";
export default {
	name: "NewList",
	data() {
		return {};
	},
	created() {
		//消息列表
		postRequest(apis.getMsg).then(res => {
			this.$store.commit("updatemsglist", res.data.data);
			console.log(res.data.data);
		});
	},
	filters: {
		//时间过滤器 显示几天前
		times: function(value) {
			var time = (new Date() / 1000 - value) / 60;
			if (time < 60) {
				return Math.floor(time) + "分钟前";
			} else if (time >= 60 && time < 60 * 24) {
				return Math.floor(time / 60) + "小时前";
			} else if (time >= 60 * 24 && time < 60 * 24 * 30) {
				return Math.floor(time / 60 / 24) + "天前";
			} else if (time >= 60 * 24 * 30 && time < 60 * 24 * 30 * 12) {
				return Math.floor(time / 60 / 24 / 30) + "月前";
			} else if (time >= 60 * 24 * 30 * 12) {
				return Math.floor(time / 60 / 24 / 30 / 12) + "年前";
			}
		}
	},
	computed: {
		newslist() {
			return this.$store.state.msglist;
		}
	}
};
</script>

<style lang="scss" scoped>
.newList {
	width: 100vw;
	height: 100vh;
	overflow: auto;
	font-size: 14px;
	background-color: #f3f3f3;
	.top {
    font-weight: bold;
		width: 100vw;
		height: 50px;
		line-height: 50px;
		background-color: #f54242;
		color: #fff;
		font-size: 16px;
		position: fixed;
		top: -1px;
		z-index: 5;
		display: flex;
		justify-content: start;
		align-items: center;
		box-shadow: 0px 0px 3px 0.5px rgba(204, 204, 204, 0.7);
		div {
			height: 50px;
		}
		.left {
			width: 20%;
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: 20px;
			}
		}
		.center {
			width: 60%;
			text-align: center;
		}
	}
	.section {
		padding-top: 3px;
		margin-top: 50px;
		.block {
			width: 100vw;
			height: 70px;
			background-color: #fff;
			margin-bottom: 5px;
			display: flex;
			align-items: center;
			justify-content: start;
			.img {
				width: 20%;
				height: 50px;
				text-align: center;
				position: relative;
				img {
					width: 50px;
				}
				.dot {
					position: absolute;
					top: 0px;
					right: 15px;
					width: 7px;
					height: 7px;
					background-color: #f54242;
					border-radius: 50%;
				}
			}
			.center {
				width: 80%;
				height: 70px;
				padding-right: 15px;
				.up {
					height: 35px;
					.left {
						float: left;
						font-size: 14px;
						color: #333333;
						line-height: 35px;
					}
					.right {
						float: right;
						color: #999999;
						line-height: 35px;
					}
				}
				.down {
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: justify;
				}
			}
		}
	}
}
</style>
