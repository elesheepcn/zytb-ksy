<template>
	<!-- 学校详情 -->
	<div class="schoolDetails">
		<div class="top">
			<img class="bg" :src="getimguri(schoolinfo.top_photo[0])" alt />
			<!-- <div class="wish">
				<img @click="$router.push('/myWish')" src="../assets/zhiyuantubiao@2x.png" alt />
			</div>-->
			<div class="back" @click="$router.go(-1)">
				<img src="../assets/back1.png" alt />
				<span>返回</span>
			</div>
		</div>
		<div class="selection">
			<div class="schoolHeader">
				<img :src="getimguri(schoolinfo.icon[0])" alt />
			</div>
			<div class="information">
				<p class="name">{{schoolinfo.name}}</p>
				<div class="code">
					<span>代码:&emsp;{{schoolinfo.school_code}}</span>
					<span v-for="(item,index) in tag" :key="index">{{item}}</span>
					<span>{{schoolinfo.property}}</span>
				</div>
				<!-- <button class="button" @click="add()">加入志愿+</button> -->
			</div>
			<p class="address">地址:&emsp;{{schoolinfo.address}}</p>
			<p class="archives">
				特殊投档要求:&emsp;
				<span v-if="schoolinfo.archives!==''">{{schoolinfo.archives}}</span>
				<span v-if="schoolinfo.archives==''">暂无</span>
			</p>
			<div class="synopsis">
				<div v-html="schoolinfo.content" :class="flag?'newtext':'text'"></div>
				<button class="open" @click="flag=!flag" v-show="!flag">展开全文</button>
				<button class="open" @click="flag=!flag" v-show="flag">收起全文</button>
			</div>
		</div>
		<div class="nav">
			<div
				:class="batch==index?'y':'n'"
				@click="batch=index"
				v-for="(item,index) in schoolinfo.batch"
				:key="index"
			>{{item}}</div>
		</div>
		<div class="title">
			<span class="tc"></span>
			<span>调档线</span>
		</div>
		<div class="tablebox">
			<div class="th">
				<div class="betch">类别</div>
				<div class="major">专业方向</div>
				<div class="line">
					<div class="total">调档线</div>
					<div class="year">
						<span>2019年</span>
						<span>2018年</span>
						<span>2017年</span>
					</div>
				</div>
			</div>
			<div class="newtb" v-for="(item,index) in schoolinfo.table[batch].footer" :key="index">
				<div class="right" v-for="(item1,index) in item.year_msg" :key="index+'i'">
					<span class="type">{{item.major_type}}</span>
					<span class="name">{{item1.major_name}}</span>
					<span>{{item1.year_grade0}}</span>
					<span>{{item1.year_grade1}}</span>
					<span>{{item1.year_grade2}}</span>
				</div>
			</div>
		</div>
		<div class="title">
			<span class="tc"></span>
			<span>招生计划</span>
		</div>
		<div class="tablebox">
			<div class="th">
				<div class="betch">类别</div>
				<div class="major">专业方向</div>
				<div class="line1">
					<div class="total">招生人数</div>
					<div class="year">
						<span>2020年</span>
						<span>2019年</span>
						<span>2018年</span>
						<span>2017年</span>
					</div>
				</div>
			</div>
			<div class="tb" v-for="(item,index) in schoolinfo.table[batch].footer_two" :key="index">
				<div class="right" v-for="(item1,index) in item.year_msg" :key="index+'i'">
					<span class="type">{{item.major_type}}</span>
					<span class="name">{{item1.major_name}}</span>
					<span>{{item1.year_num0}}</span>
					<span>{{item1.year_num1}}</span>
					<span>{{item1.year_num2}}</span>
					<span>{{item1.year_num3}}</span>
				</div>
			</div>
		</div>
		<p class="floor">已经到底了哦!</p>
		<div class="loading" v-show="waitflag">
			<img src="../assets/waitpay.gif" alt />
			<span>{{content}}</span>
		</div>
	</div>
</template>

<script>
import apis from "../js/api";
import { postRequest } from "../js/httputil";
export default {
	name: "SchoolDetails",
	data() {
		return {
			content: "资源加载中!",
			waitflag: false,
			tag: [],
			batch: 0, //批次
			cur: 0, //批次
			schoolinfo: {
				top_photo: [],
				bottom_photo: [],
				icon: [],
				table: [
					{
						footer: [
							{
								major_name: ["设计学类"],
								major_type: 0,
								year_msg: [
									{
										year_grade0: "279.66",
										year_grade1: "281.66",
										year_grade2: "0.00"
									}
								]
							}
						],
						footer_two: [
							{
								major_name: ["设计学类"],
								major_type: 0,
								year_msg: [
									{ year_num0: 0, year_num1: 4, year_num2: 4, year_num3: 0 }
								]
							}
						]
					}
				]
			}, //学校信息
			flag: false, //简介更多
			scrollflag: false //滚动条
		};
	},
	created() {
		//学校详情
		postRequest(apis.getSchoolOne, { id: this.$route.query.id }).then(res => {
			console.log(res.data);
			this.schoolinfo = res.data.data;
			this.tag = res.data.data.tag;
		});
		window.localStorage.setItem("vol", 1);
	},
	methods: {
		//图片地址
		getimguri(uri = "zytb/loading.gif") {
			return apis.imguri + uri;
		},
		add() {
			//添加志愿
			postRequest(apis.addVolunteer, {
				school_id: this.schoolinfo.id,
				school_name: this.schoolinfo.name,
				type: "冲",
				percent: "50",
				icon_id: "1"
			}).then(res => {
				// console.log(res.data);
				if (res.data.code == 0) {
					this.content = res.data.msg;
					this.waitflag = true;
					setTimeout(() => {
						this.waitflag = false;
					}, 500);
					return false;
				} else if (res.data.code == 1) {
					this.content = "添加成功";
					this.waitflag = true;
					setTimeout(() => {
						this.waitflag = false;
					}, 500);
					return false;
				}
			});
		}
	},
	mounted() {
		//监听页面滚动
		// window.addEventListener("scroll", this.scrollToTop);
	}
};
</script>
<style lang="scss" scoped>
.schoolDetails {
	width: 100vw;
	height: 100vh;
	overflow: auto;
	font-size: 14px;
	background-color: #f3f3f3;
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
		font-size: 20px;
		color: #fff;
		img {
			width: 100%;
		}
		span {
			width: 100%;
			text-align: center;
		}
	}
	.top {
		font-weight: bold;
		width: 100vw;
		color: #fff;
		font-size: 16px;
		.bg {
			width: 100vw;
		}
		.back {
			width: 100vw;
			height: 50px;
			padding-left: 15px;
			background-image: linear-gradient(
				0deg,
				rgba(0, 0, 0, 0.2),
				rgba(0, 0, 0, 0.8)
			);
			position: fixed;
			top: -1px;
			z-index: 5;
			display: flex;

			justify-content: start;
			align-items: center;
			img {
				width: 20px;
			}
		}
	}
	.selection {
		width: 100vw;
		position: relative;
		top: -10px;
		padding: 7px 15px;
		background-color: #fff;
		margin-bottom: 5px;
		.schoolHeader {
			width: 50px;
			height: 50px;
			background-color: #fff;
			position: absolute;
			top: -25px;
			left: 15px;
			img {
				width: 100%;
			}
		}
		.information {
			background-color: #fff;
			width: 100%;
			padding-left: 60px;
			.name {
				font-size: 16px;
				line-height: 25px;
				color: #333;
				font-weight: bold;
			}
			.code {
				font-size: 14px;
				line-height: 25px;
				color: #999;
				display: flex;
				justify-content: start;
				align-items: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				text-align: justify;
				span {
					margin-right: 5px;
				}
			}
			// .button {
			// 	display: inline-block;
			// 	vertical-align: middle;
			// 	position: absolute;
			// 	background-color: #f54243;
			// 	border-radius: 6px;
			//
			// 	color: #fff;
			// 	right: 15px;
			// 	padding: 7px;
			// }
		}
		.address {
			color: #666;
			line-height: 25px;
			background-color: #fff;
		}
		.archives {
			color: #333;
			padding: 10px 0;
			span:first-child {
				font-weight: bold;
				color: #f54243;
				text-align: left;
			}
		}
		.synopsis {
			color: #333333;
			background-color: #fff;
			font-size: 12px;
			.text {
				color: #333;
				font-weight: 400;
				// line-height: 1.5;
				font-family: 微软雅黑;
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 5;
				text-align: justify;
			}
			.newtext {
				font-weight: 400;
				color: #333;
				// line-height: 1.5;
				text-align: justify;
				font-family: 微软雅黑;
			}
			.open {
				display: block;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 75px;
				height: 25px;
				border-radius: 5px;
				margin: 12px auto 0px;

				text-align: center;
				color: #fff;
				background-color: #f54243;
			}
		}
	}
	.nav {
		width: 100vw;
		font-weight: bold;
		height: 55px;
		padding-left: 15px;
		background-color: #fff;
		font-size: 16px;
		display: flex;
		justify-content: start;
		align-items: flex-end;
		div {
			margin-right: 25px;
			padding-bottom: 15px;
		}
		.y {
			color: #333;
			border-bottom: 5px solid #f54243;
		}
		.n {
			color: #999;
			border-bottom: 5px solid #fff;
		}
	}
	.title {
		width: 100vw;
		color: #333;
		background-color: #f3f3f3;
		font-weight: bold;
		font-size: 18px;
		height: 55px;
		line-height: 55px;
		padding-left: 15px;
		display: flex;
		justify-content: start;
		align-items: center;
		.tc {
			width: 5px;
			height: 25px;
			margin-right: 10px;
			background-color: #f54243;
		}
	}
	.tablebox {
		width: 100vw;
		text-align: center;
		color: #333;
		font-size: 12px;
		.th {
			width: 100vw;
			height: 60px;
			background-color: #fff;
			display: flex;
			justify-content: start;
			text-align: center;
			align-items: center;
			border-bottom: 2px solid #d6d6d6;
			border-top: 2px solid #d6d6d6;
			.betch {
				width: 25%;
				height: 60px;
				line-height: 60px;
			}
			.major {
				width: 25%;
				height: 60px;
				line-height: 60px;
				border-left: 1px solid #d6d6d6;
				border-right: 1px solid #d6d6d6;
			}
			.line {
				width: 50%;
				display: flex;
				flex-direction: column;
				.total {
					width: 100%;
					height: 30px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-bottom: 1px solid #d6d6d6;
				}
				.year {
					width: 100%;
					height: 30px;
					display: flex;
					justify-content: start;
					align-items: center;
					color: #999;

					span {
						display: inline-block;
						width: 33%;
						height: 30px;
						line-height: 30px;
						display: inline-block;
						border-right: 1px solid #d6d6d6;
					}
				}
			}
			.line1 {
				width: 50%;
				display: flex;
				flex-direction: column;
				.total {
					width: 100%;
					height: 30px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-bottom: 1px solid #d6d6d6;
				}
				.year {
					width: 100%;
					height: 30px;
					display: flex;
					justify-content: start;
					align-items: center;
					color: #999;

					span {
						width: 25%;
						height: 30px;
						line-height: 30px;
						display: inline-block;
						border-right: 1px solid #d6d6d6;
					}
				}
			}
		}

		.newtb {
			width: 100vw;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			.right {
				width: 100%;
				padding: 7px 0;
				display: flex;
				flex-wrap: wrap;
				justify-content: start;
				align-items: center;
				border-bottom: 1px solid #d6d6d6;
				.type {
					width: 25%;
				}
				.name {
					width: 25%;
				}
				span {
					width: 16.1%;
				}
			}
		}
		.tb {
			width: 100vw;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			.left {
				width: 25%;
			}
			.right {
				width: 100%;
				padding: 7px 0;
				display: flex;
				flex-wrap: wrap;
				justify-content: start;
				align-items: center;
				border-bottom: 1px solid #d6d6d6;
				span {
					width: 12.5%;
				}
				.type {
					width: 25%;
				}
				.name {
					width: 25%;
				}
			}
		}
	}
	.floor {
		color: #f54243;
		margin: 20px 0;
		text-align: center;
	}
	.newtb:nth-of-type(2n + 1) {
		background-color: #fff;
	}
	.newtb:nth-of-type(2n) {
		background-color: #f9f9f9;
	}
	.tb:nth-of-type(2n + 1) {
		background-color: #fff;
	}
	.tb:nth-of-type(2n) {
		background-color: #f9f9f9;
	}
}
</style>
