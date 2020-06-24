<template>
	<!-- 添加专业成绩 -->
	<div class="addmajor" @click="flag=false">
		<div class="top">
			<div class="left" @click="$router.push({path: '/MyReportCard',query: { v: 0 }})">
				<img src="../assets/back1.png" />
				<span>返回</span>
			</div>
			<div class="center">
				<p>添加统考成绩</p>
			</div>
		</div>
		<div class="section">
			<div class="block" @click.stop="flag=true">
				<p class="title left">专业类别</p>
				<img v-show="!Boolean(major_name)" class="right" src="../assets/jiantou@2x.png" alt />
				<span v-show="Boolean(major_name)" class="right">{{major_name}}</span>
			</div>

			<div class="block" v-show="flag1==true">
				<span class="left">素描</span>
				<input
					class="right"
					oninput="if(value>100)value=100"
					type="number"
					@input="change"
					placeholder="素描"
					v-model="sketch"
				/>
			</div>
			<div class="block" v-show="flag1==true">
				<span class="left">速写</span>
				<input
					class="right"
					oninput="if(value>100)value=100"
					type="number"
					@input="change"
					placeholder="速写"
					v-model="sketches"
				/>
			</div>
			<div class="block" v-show="flag1==true">
				<span class="left">色彩</span>
				<input
					class="right"
					oninput="if(value>100)value=100"
					type="number"
					@input="change"
					placeholder="色彩"
					v-model="colours"
				/>
			</div>
			<div class="block">
				<p class="title left">专业总分</p>
				<input class="right" v-model="total" type="number" @input="change" placeholder="请输入专业总分" />
			</div>
		</div>
		<button class="btn" :class="{new:btnflag==true}" :disabled="btnflag" @click="add()">确定添加</button>
		<div class="cover" v-show="flag==true">
			<div class="popup" @click.stop="flag=true">
				<div class="choice" @click.stop="flag=false">
					<p>请选择</p>
					<div class="close">
						<img src="../assets/+@2x.png" alt />
					</div>
				</div>
				<div class="choice2">
					<p
						class="option"
						v-for="(item,index) in getmajor"
						:key="index"
						@click.stop="select(index)"
					>{{item}}</p>
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
	name: "Addmajor",
	data() {
		return {
			content: "资源加载中!",
			waitflag: false,
			total: "", //专业总分
			major_type: "", //专业类型
			major_name: "", //专业名字
			sketch: "", //素描
			sketches: "", //速写
			colours: "", //色彩
			flag: false, //下拉框
			flag1: false, //单选
			btnflag: true //按钮
		};
	},
	created() {
		//获取专业
		postRequest(apis.getConf).then(res => {
			this.$store.commit("updatemajorlist", res.data.data);
		});
	},
	computed: {
		getuserinfo() {
			return this.$store.state.userinfo;
		},
		getmajor() {
			return this.$store.state.majorlist;
		}
	},
	methods: {
		//添加专业成绩
		add() {
			if (this.getuserinfo.major_grade.length >= 3) {
				this.content = "已达到添加统考成绩数量上限";
				this.waitflag = true;
				setTimeout(() => {
					this.waitflag = false;
				}, 500);
				return false;
			} else {
				let data1 = {
					total: Number(this.total).toFixed(2),
					major_type: this.major_type,
					major_name: this.major_name
				};
				let data2 = {
					sketch: Number(this.sketch).toFixed(2),
					sketches: Number(this.sketches).toFixed(2),
					colours: Number(this.colours).toFixed(2),
					total: Number(this.total).toFixed(2),
					major_type: this.major_type,
					major_name: this.major_name
				};
				if (this.flag1) {
					this.getuserinfo.major_grade.push(data2);
				} else {
					this.getuserinfo.major_grade.push(data1);
				}
				//初始化
				this.major_type = "";
				this.total = "";
				this.sketch = "";
				this.sketches = "";
				this.colours = "";
				this.$router.push("/myReportCard"); //返回完善资料
			}
		},
		change() {
			if (this.flag1) {
				if (
					this.major_type !== "" &&
					this.total !== "" &&
					this.sketch !== "" &&
					this.sketches !== "" &&
					this.colours !== ""
				) {
					this.btnflag = false;
				} else {
					this.btnflag = true;
				}
			} else {
				if (this.major_type !== "" && this.total !== "") {
					this.btnflag = false;
				} else {
					this.btnflag = true;
				}
			}
		},
		select(i) {
			for (const item of this.getuserinfo.major_grade) {
				if (i == item.major_type) {
					this.content = "每个专业仅可添加一个";
					this.waitflag = true;
					setTimeout(() => {
						this.waitflag = false;
					}, 500);
					return false;
				}
			}
			this.flag = false;
			this.major_type = i;
			this.major_name = this.getmajor[i];
			if (this.major_name == "美术与设计类") {
				this.flag1 = true;
				// this.total =Number(this.sketch) + Number(this.sketches) + Number(this.colours);
			} else {
				this.flag1 = false;
			}
			this.change();
		}
	}
};
</script>

<style lang="scss" scoped>
.addmajor {
	width: 100vw;
	height: 100vh;
	overflow: auto;
	font-size: 16px;
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
		background-color: #fff;
		border-radius: 10px;
		margin: 10px auto 15px;
		.block {
			height: 50px;
			border-bottom: solid #eee 2px;
			padding: 0px 14px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title {
				color: #333333;
				line-height: 50px;
			}
			img {
				width: 10px;
			}
			.right {
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
	.cover {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.5);
		top: -1px;
		.popup {
			width: 100vw;
			background-color: #fff;
			border-radius: 10px 10px 0px 0px;
			position: fixed;
			bottom: 0;
			.choice {
				height: 35px;
				border-bottom: #eee solid 2px;
				display: flex;
				align-self: start;
				justify-content: flex-end;
				p {
					width: 60%;
					text-align: center;
					color: #333;
					line-height: 35px;
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
				width: 100vw;
				overflow: auto;
				padding: 12px;
				padding-bottom: 20px;
				.title {
					color: #999;
				}
				.option {
					height: 35px;
					text-indent: 1em;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #333;
					line-height: 35px;
				}
			}
		}
	}
}
</style>
