<template>
	<!-- 位次查询 -->
	<div class="rankQuery" @click="flag=false">
		<div class="top">
			<div class="box">
				<div class="left" @click="$router.push({path:'/',query: { v: 0 }})">
					<img class="reback" src="../assets/back1.png" alt />
					<span>返回</span>
				</div>
				<span class="title">投档位次</span>
			</div>
		</div>
		<div class="section">
			<div class="card">
				<div class="block" id="newblock" @click.stop="show()">
					<p class="left">专业</p>
					<p class="right" v-show="Boolean(major_name)">{{major_name}}</p>
					<p class="right" v-show="!Boolean(major_name)">
						<img src="../assets/7@2x.png" alt />
					</p>
				</div>
				<div class="block">
					<p class="left">专业分</p>
					<!-- <p class="right">{{userinfo.major_grade.total}}</p> -->
					<input type="number" class="right" v-model="major_grade" @input="change" placeholder="请输入专业分" />
				</div>
				<div class="block" id="newblock">
					<p class="left">文理科</p>
					<div class="right radis">
						<p @click="check(0)">
							<img v-show="a_s!=0" src="../assets/tuoyuan@2x.png" alt />
							<img v-show="a_s==0" src="../assets/xingzhuang1@2x.png" alt />
							<span>文科</span>
						</p>
						<p @click="check(1)">
							<img v-show="a_s!=1" src="../assets/tuoyuan@2x.png" alt />
							<img v-show="a_s==1" src="../assets/xingzhuang1@2x.png" alt />
							<span>理科</span>
						</p>
					</div>
				</div>
				<div class="block">
					<p class="left">文化分</p>
					<!-- <p class="right">{{userinfo.culture_grade.total}}</p> -->
					<input
						type="number"
						class="right"
						@input="change"
						oninput="if(value>750)value=750"
						v-model="culture_grade"
						placeholder="请输入文化分"
					/>
				</div>
			</div>
			<div class="resultCard" v-show="flag3">
				<div class="resultbox">
					<p class="title">您的查询结果(专业过线)：</p>
					<p class="result">
						<span class="text">分数区间:</span>
						<span class="rank" v-show="rankinfo.one.length!=0">&emsp;{{rankinfo.one.grade}}</span>
						<span class="rank" v-show="rankinfo.one.length==0">&emsp;暂未查询到数据</span>
					</p>
					<p class="result">
						<span class="text">段内人数:</span>
						<span class="rank" v-show="rankinfo.one.length!=0">&emsp;{{rankinfo.one.even}}人</span>
						<span class="rank" v-show="rankinfo.one.length==0">&emsp;暂未查询到数据</span>
					</p>
					<p class="result">
						<span class="text">累计人数:</span>
						<span class="rank" v-show="rankinfo.one.length!=0">&emsp;{{rankinfo.one.sort}}人</span>
						<span class="rank" v-show="rankinfo.one.length==0">&emsp;暂未查询到数据</span>
					</p>
				</div>
				<div class="resultbox">
					<p class="title">
						您的查询结果(
						<span v-show="!Boolean(rankinfo.double1)">双</span>
						<span v-show="Boolean(rankinfo.double1)">设计学双</span>过线)：
					</p>
					<p class="result">
						<span class="text">分数区间:</span>
						<span class="rank" v-show="rankinfo.double.length!=0">&emsp;{{rankinfo.double.grade}}</span>
						<span class="rank" v-show="rankinfo.double.length==0">&emsp;暂未查询到数据</span>
					</p>
					<p class="result">
						<span class="text">段内人数:</span>
						<span class="rank" v-show="rankinfo.double.length!=0">&emsp;{{rankinfo.double.even}}人</span>
						<span class="rank" v-show="rankinfo.double.length==0">&emsp;暂未查询到数据</span>
					</p>
					<p class="result">
						<span class="text">累计人数:</span>
						<span class="rank" v-show="rankinfo.double.length!=0">&emsp;{{rankinfo.double.sort}}人</span>
						<span class="rank" v-show="rankinfo.double.length==0">&emsp;暂未查询到数据</span>
					</p>
				</div>
				<div class="resultbox" v-if="Boolean(rankinfo.double1)">
					<p class="title">您的查询结果(美术学双过线)：</p>
					<p class="result">
						<span class="text">分数区间:</span>
						<span class="rank" v-show="rankinfo.double1.length!=0">&emsp;{{rankinfo.double1.grade}}</span>
						<span class="rank" v-show="rankinfo.double1.length==0">&emsp;暂未查询到数据</span>
					</p>
					<p class="result">
						<span class="text">段内人数:</span>
						<span class="rank" v-show="rankinfo.double1.length!=0">&emsp;{{rankinfo.double1.even}}人</span>
						<span class="rank" v-show="rankinfo.double1.length==0">&emsp;暂未查询到数据</span>
					</p>
					<p class="result">
						<span class="text">累计人数:</span>
						<span class="rank" v-show="rankinfo.double1.length!=0">&emsp;{{rankinfo.double1.sort}}人</span>
						<span class="rank" v-show="rankinfo.double1.length==0">&emsp;暂未查询到数据</span>
					</p>
				</div>
			</div>
			<button class="button" :class="{new:flag1==true}" :disabled="flag1" @click="inquire()">点击查询</button>
			<div class="cover" v-show="flag==true">
				<div class="popup" @click.stop="flag=true">
					<div class="choice" @click.stop="flag=false">
						<p>请选择</p>
						<div class="close">
							<img src="../assets/+@2x.png" alt />
						</div>
					</div>
					<div class="choice2">
						<p class="title">选择专业</p>
						<p class="option" v-for="(item,index) in major" :key="index" @click.stop="select(index)">
							<span class="name">{{item}}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
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
	namw: "RankQuery",
	data() {
		return {
			content: "资源加载中!",
			waitflag: false,
			flag: false, //专业选择下拉框
			flag1: true, //查询按钮
			flag2: false, //文理科单选按钮
			flag3: false, //结果面板
			major_grade: "", //专业成绩
			major_name: "", //专业名字
			culture_grade: "", //文化成绩
			major_type: -1, //专业类型
			a_s: -1, //科目
			rankinfo: { one: [], double: [], double1: [] }, //排序信息
			major: []
		};
	},
	created() {
		//获取配置
		postRequest(apis.getConf, { name: "major_type" }).then(res => {
			this.major = res.data.data;
		});
	},
	methods: {
		//打开下拉框
		show() {
			this.flag = true;
		},
		check(v) {
			this.a_s = v;
			this.change();
		},
		//输入框事件
		change() {
			if (
				this.major_grade !== "" &&
				this.culture_grade !== "" &&
				this.major_type !== -1 &&
				this.a_s !== -1
			) {
				this.flag1 = false;
			} else {
				this.flag1 = true;
			}
		},
		select(i) {
			this.flag = false;
			this.major_type = i; //专业类型
			this.major_grade = ""; //清空分数
			this.culture_grade = ""; //清空分数
			this.major_name = this.major[i];
		},
		inquire() {
			if (
				this.culture_grade != "" &&
				this.major_grade != "" &&
				this.major_type != -1 &&
				this.a_s !== -1
			) {
				postRequest(apis.getWeiSort, {
					culture_grade: this.culture_grade, //文化成绩
					major_grade: this.major_grade, //专业成绩
					major_type: this.major_type, //专业类型
					a_s: this.a_s //文理科
				}).then(res => {
					console.log(res);
					this.rankinfo = res.data.data;
					this.flag1 = true;
					this.flag3 = true;
				});
			} else {
				this.content = "每项都必填!";
				this.waitflag = true;
				setTimeout(() => {
					this.waitflag = false;
				}, 500);
				return false;
			}
		}
	},
	computed: {
		userinfo() {
			return this.$store.state.userinfo;
		}
	}
};
</script>

<style lang="scss" scoped>
.rankQuery {
	width: 100vw;
	height: 100vh;
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
		height: 115px;
		background-color: #f54243;
		color: #fff;
		font-size: 16px;
		.box {
			width: 100%;
			height: 50px;
			display: flex;
			justify-content: start;
			align-items: center;
		}
		.left {
			width: 20%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 20px;
			}
		}
		.title {
			width: 60%;
			height: 100%;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.section {
		position: relative;
		margin-top: -40px;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		.cover {
			width: 100vw;
			height: 100vh;
			position: fixed;
			z-index: 5;
			background-color: rgba(0, 0, 0, 0.5);
			top: -1px;
			.popup {
				width: 100vw;
				height: 60vh;
				overflow: auto;
				background-color: #fff;
				border-radius: 10px 10px 0px 0px;
				position: fixed;
				bottom: 0;
				.choice {
					width: 100%;
					height: 40px;
					border-bottom: #eee solid 2px;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					background-color: #fff;
					p {
						width: 60%;
						text-align: center;
						color: #333;
						line-height: 30px;
					}
					.close {
						width: 20%;
						display: flex;
						justify-content: center;
						align-items: center;
						img {
							width: 15px;
						}
					}
				}
				.choice2 {
					padding: 12px;
					.title {
						color: #999;
					}
					.option {
						font-size: 14px;
						padding: 5px 20px;
						color: #333;
						color: #333;
					}
				}
			}
		}
		.card {
			width: 90vw;
			height: 200px;
			.block:first-child {
				border-top-left-radius: 7px;
				border-top-right-radius: 7px;
			}
			.block:last-child {
				border-bottom-left-radius: 7px;
				border-bottom-right-radius: 7px;
				border: 0;
			}
			.block {
				padding: 0px 20px;
				background-color: #fff;
				border-bottom: 1px solid #ccc;
				height: 50px;
				margin-bottom: 1px;
				display: flex;
				justify-content: start;
				align-items: center;
				.left {
					width: 20%;
					color: #333;
					line-height: 50px;
					float: left;
				}
				.right {
					width: 80%;
					font-size: 14px;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					color: #333;
					img {
						width: 10px;
						height: 15px;
					}
					p {
						display: flex;
						align-items: center;
						margin-left: 5px;
					}
				}
				.radis {
					img {
						width: 15px;
					}
				}
				input {
					text-align: right !important;
				}
			}
			// .block:first-child {
			// 	border-top-left-radius: 2em;
			// 	border-top-right-radius: 2em;
			// }
		}
		.resultCard {
			width: 90vw;
			background-color: #fff;
			border-radius: 10px;
			margin: 25px auto 15px;
			padding: 10px;
			.resultbox {
				margin-bottom: 10px;
				.title {
					font-weight: bold;
					color: #333333;
				}
				.result {
					color: #333333;
					margin-top: 5px;
					.rank {
						color: #f00;
					}
				}
			}
		}
		.new {
			background-color: #ccc !important;
		}
		.button {
			display: block;
			width: 80vw;
			height: 40px;
			background-color: #f54243;
			box-shadow: -0.1px 1px 5px 0.3px rgba(204, 204, 204, 0.7);
			border-radius: 25px;
			margin: 0 auto;
			margin-top: 25px;
			font-size: 18px;
			color: #fff;
			text-align: center;
			line-height: 40px;
		}
	}
}
</style>
