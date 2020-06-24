<template>
	<!-- 添加考校 -->
	<div class="addSchool">
		<div class="top">
			<div class="left" @click="$router.push({path: '/MyReportCard',query: { v: 0 }})">
				<img src="../assets/back1.png" />
				<span>返回</span>
			</div>
			<div class="center">
				<p>添加我的校考</p>
			</div>
		</div>
		<div class="section">
			<div class="block">
				<p class="title">校考院校名称</p>
				<input class="input" @input="change()" v-model="school" type="text" placeholder="请输入院校名称" />
			</div>
			<div class="block">
				<p class="title">校考专业</p>
				<input class="input" @input="change()" v-model="major" type="text" placeholder="请输入专业名称" />
			</div>
			<div class="block">
				<p class="title">总分</p>
				<input class="input" @input="change()" v-model="grade" type="number" />
			</div>
		</div>
		<button class="btn" :class="{new:btnflag==true}" :disabled="btnflag" @click="add()">确定添加</button>
	</div>
</template>

<script>
export default {
	name: "AddSchool",
	data() {
		return {
			btnflag: true,
			school: "", //院校
			major: "", //专业
			grade: "" //总分
		};
	},
	computed: {
		getuserinfo() {
			return this.$store.state.userinfo;
		}
	},
	methods: {
		//添加校考成绩
		add() {
			if (this.school != "" && this.major != "" && this.grade != "") {
				this.getuserinfo.school_grade.push({
					colleges: this.school,
					major: this.major,
					grade: Number(this.grade).toFixed(2)
				});
				// alert(`${this.school}已加入!即将返回上一级页面`);
				this.$router.push("/myReportCard"); //返回完善资料
				// console.log("已加入", this.school);
				// 初始化
				this.school2 = "";
				this.major = "";
				this.grade = "";
			} else {
				// alert("每项都是必填哦");
				return false;
			}
		},
		change() {
			if (this.school !== "" && this.major !== "" && this.grade !== "") {
				this.btnflag = false;
			} else {
				this.btnflag = true;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.addSchool {
	width: 100vw;
	height: 100vh;
	overflow: auto;
	font-size: 16px;
	background-color: #f3f3f3;
	.top {
		font-weight: bold;
		width: 100vw;
		height: 50px;
		line-height: 50px;
		background-color: #f54242;
		color: #fff;
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
		width: 95vw;
		height: 140px;
		background-color: #fff;
		border-radius: 10px;
		margin: 10px auto 15px;
		.block {
			height: 47px;
			border-bottom: solid #eee 2px;
			padding: 0px 14px;
			.title {
				color: #333333;
				line-height: 47px;
				float: left;
			}
			.input {
				color: #999999;
				line-height: 45px;
				float: right;
				text-align: right;
			}
		}
	}
	.btn {
		display: block;
		width: 80vw;
		height: 40px;
		line-height: 40px;
		color: #fefefe;
		background-color: #f54243;
		border-radius: 25px;
		font-size: 18px;
		text-align: center;
		margin: 0 auto;
	}
	.new {
		background-color: #ccc !important;
	}
}
</style>
