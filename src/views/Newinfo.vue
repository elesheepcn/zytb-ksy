
<template>
	<!-- 资讯详情 -->
	<div class="newinfo">
		<div class="top">
			<div class="left" @click="$router.push({path:'/',query: { v: 0 }})">
				<img src="../assets/black_back.png" />
				<span>返回</span>
			</div>
			<div class="center">
				<p>资讯详情</p>
			</div>
		</div>
		<div class="section">
			<div class="title">{{news.title}}</div>
			<div class="info">
				<span class="tag">{{news.tag}}</span>
				<span class="createtime">{{news.create_time}}</span>
			</div>
			<div class="img" v-show="news.photo.length" v-for="(item,index) in news.photo" :key="index">
				<img :src="getimguri(item)" alt />
			</div>
			<div class="text" v-html="news.content"></div>
		</div>
	</div>
</template>

<script>
import { postRequest } from "../js/httputil";
import apis from "../js/api";
export default {
	name: "Newinfo",
	data() {
		return {
			news: {}
		};
	},
	created() {
		//请求资讯详情
		postRequest(apis.getInfoOne, { id: this.$route.query.id }).then(res => {
			console.log(res);
			this.news = res.data.data;
		});
	},
	methods: {
		getimguri(uri = "zytb/loading.gif") {
			return apis.imguri + uri;
		}
	},
	mounted() {
		document.oncontextmenu = new Function("event.returnValue=false");
		document.onselectstart = new Function("event.returnValue=false");
	}
};
</script>
<style  scoped>
.section > .text >>> table {
	width: 96vw !important;
	margin: 0 auto !important;
}
.section > .text >>> table tr {
	border: 1px solid #000;
}
.section > .text >>> table td {
	border: 1px solid #000;
	text-indent: 0.5em;
	text-align: center;
}
.section > .text >>> p > span {
	line-height: 2 !important;
}
.section > .text >>> video {
	width: 100% !important;
	margin: 0 auto !important;
}
.section > .text >>> img {
	width: 100% !important;
	height: auto !important;
	margin: 0 auto !important;
}
</style>
<style lang="scss" scoped>
.newinfo {
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
		background-color: #fff;
		color: #000;
		font-size: 16px;
		display: flex;
		position: fixed;
		top: -1px;
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
		width: 100vw;
		padding: 2vw;
		margin-top: 50px;
		.title {
			line-height: 30px;
			font-size: 18px;
			color: #333333;
			border-bottom: 2px solid #e5e5e5;
		}
		.info {
			text-align: left;
			font-size: 14px;
			line-height: 20px;
			margin-top: 10px;
			color: #999;
			span {
				margin-right: 10px;
			}
		}
		.video {
			display: block;
			background-color: #ccc;
			margin: 0 auto;
			width: 90vw;
		}
		.text {
			color: #333;
			display: inline-block;
			margin-top: 12px;
		}
		.img {
			width: 100%;
			margin-top: 10px;
			img {
				width: 100%;
			}
		}
	}
}
</style>