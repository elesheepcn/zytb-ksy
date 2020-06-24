<template>
	<!-- 消息 -->
	<div class="new">
		<div class="top">
			<div class="left" @click="$router.push('/NewList')">
				<img class="reback" src="../assets/back1.png" alt />
				<span>返回</span>
			</div>
			<div class="center">消息</div>
		</div>
		<div class="section">
			<p class="title">
				<b>{{news.title}}</b>
			</p>
			<p class="conten">{{news.content}}</p>
			<p class="tips">
				<span class="left">来源：系统消息</span>
				<span class="right">{{news.create_time|times}}</span>
			</p>
		</div>
	</div>
</template>

<script>
import apis from "../js/api";
import { postRequest } from "../js/httputil";
export default {
	name: "New",
	data() {
		return {
			news: {} //消息详情
		};
	},
	created() {
		console.log(this.$route.query.id);
		//消息详情
		postRequest(apis.getMsgDetail, { id: this.$route.query.id + 1 }).then(
			res => {
				this.news = res.data.data;
			}
		);
	},
	computed: {},
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
	}
};
</script>

<style lang="scss" scoped>
.new {
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
		padding: 12px;
		.title {
			font-size: 18px;
			color: #333333;
			margin-bottom: 21px;
		}
		.conten {
			
			color: #666666;
			text-align: justify;
		}
		.tips {
			margin-top: 15px;
			.left {
				font-size: 14px;
				color: #cccccc;
				float: left;
			}
			.right {
				font-size: 14px;
				color: #cccccc;
				float: right;
			}
		}
	}
}
</style>
