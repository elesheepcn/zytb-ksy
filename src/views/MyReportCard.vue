<template>
	<div class="myReportCard" @click="onclick()">
		<div class="top">
			<div class="left" @click.stop="back()">
				<img src="../assets/black_back.png" />
				<span>返回</span>
			</div>
			<div class="center">完善资料</div>
			<!-- <button v-show="!btnflag" @click="change(0)" class="right">编辑</button> -->
			<!-- <button v-show="btnflag" @click="change(1)" class="right">保存</button> -->
		</div>
		<div class="section">
			<p class="title">
				<b>个人信息</b>
				<span>--为保证推荐结果准确,请如实填写!--</span>
			</p>
			<div class="crad">
				<div class="block">
					<span class="left">姓名</span>
					<input class="right" type="text" v-show="btnflag" v-model="userinfo.name" placeholder="请输入姓名" />
					<span class="right" v-show="!btnflag">{{userinfo.name}}</span>
				</div>
				<div class="block" @click="open(-1,0)">
					<span class="left">所在区域</span>
					<span class="right" v-show="Boolean(userinfo.address)">{{userinfo.address}}</span>
					<img
						id="image"
						v-show="!Boolean(userinfo.address)"
						class="right"
						src="../assets/jiantou@2x.png"
						alt
					/>
				</div>
				<div class="block">
					<span class="left">高中学校名称</span>
					<input
						class="right"
						v-show="btnflag"
						type="text"
						v-model="userinfo.high_school"
						placeholder="请输入高中学校名称"
					/>
					<span class="right" v-show="!btnflag">{{userinfo.high_school}}</span>
				</div>
				<div class="block">
					<span class="left">培训机构名称</span>
					<input
						class="right"
						v-show="btnflag"
						type="text"
						v-model="userinfo.art_org"
						placeholder="请输入培训机构名称"
					/>
					<span class="right" v-show="!btnflag">{{userinfo.art_org}}</span>
				</div>
				<div class="block">
					<p class="left">性别</p>
					<div class="right radios">
						<p @click="check(0,1)">
							<img v-show="userinfo.sex!=1" src="../assets/tuoyuan@2x.png" alt />
							<img v-show="userinfo.sex==1" src="../assets/xingzhuang1@2x.png" alt />
							<span>男生</span>
						</p>
						<p @click="check(0,2)">
							<img v-show="userinfo.sex!=2" src="../assets/tuoyuan@2x.png" alt />
							<img v-show="userinfo.sex==2" src="../assets/xingzhuang1@2x.png" alt />
							<span>女生</span>
						</p>
					</div>
				</div>
				<div class="block">
					<p class="left">外语语种</p>
					<div class="right radios">
						<p @click="check(1,1)">
							<img v-show="userinfo.language!=1" src="../assets/tuoyuan@2x.png" alt />
							<img v-show="userinfo.language==1" src="../assets/xingzhuang1@2x.png" alt />
							<span>英语</span>
						</p>
						<p @click="check(1,0)">
							<img v-show="userinfo.language!=0" src="../assets/tuoyuan@2x.png" alt />
							<img v-show="userinfo.language==0" src="../assets/xingzhuang1@2x.png" alt />
							<span>其他</span>
						</p>
					</div>
				</div>
			</div>
			<p class="title">
				<b>文化成绩</b>
			</p>
			<div class="crad">
				<div class="block">
					<p class="left">文理科</p>
					<div class="right radios">
						<p @click="check(3,0)">
							<img v-show="fourc!=0" src="../assets/tuoyuan@2x.png" alt />
							<img v-show="fourc==0" src="../assets/xingzhuang1@2x.png" alt />
							<span>文科</span>
						</p>
						<p @click="check(3,1)">
							<img v-show="fourc!=1" src="../assets/tuoyuan@2x.png" alt />
							<img v-show="fourc==1" src="../assets/xingzhuang1@2x.png" alt />
							<span>理科</span>
						</p>
					</div>
				</div>
				<!-- <div class="block">
					<p class="left">科目类别</p>
					<div class="right radios">
						<p @click="check(2,0)">
							<img v-show="userinfo.culture_grade.type!=0" src="../assets/tuoyuan@2x.png" alt />
							<img v-show="userinfo.culture_grade.type==0" src="../assets/xingzhuang1@2x.png" alt />
							<span>文科</span>
						</p>
						<p @click="check(2,1)">
							<img v-show="userinfo.culture_grade.type!=1" src="../assets/tuoyuan@2x.png" alt />
							<img v-show="userinfo.culture_grade.type==1" src="../assets/xingzhuang1@2x.png" alt />
							<span>理科</span>
						</p>
					</div>
				</div>-->
				<div class="block">
					<span class="left">文化总分</span>
					<input
						class="right"
						v-show="btnflag"
						oninput="if(value>750)value=750"
						type="number"
						placeholder="请输入文化总分"
						v-model="userinfo.culture_grade.total"
					/>
					<span class="right" v-show="!btnflag">{{userinfo.culture_grade.total}}</span>
				</div>

				<div class="block">
					<span class="left">英语成绩</span>
					<input
						class="right"
						v-show="btnflag"
						oninput="if(value>150)value=150"
						placeholder="请输入英语成绩"
						type="number"
						v-model="userinfo.culture_grade.english"
					/>
					<span class="right" v-show="!btnflag">{{userinfo.culture_grade.english}}</span>
				</div>
				<div class="block">
					<span class="left">语文成绩</span>
					<input
						class="right"
						v-show="btnflag"
						oninput="if(value>150)value=150"
						placeholder="请输入语文成绩"
						type="number"
						v-model="userinfo.culture_grade.chinese"
					/>
					<span class="right" v-show="!btnflag">{{userinfo.culture_grade.chinese}}</span>
				</div>
				<div class="block">
					<span class="left">数学成绩</span>
					<input
						class="right"
						v-show="btnflag"
						oninput="if(value>150)value=150"
						placeholder="请输入数学成绩"
						type="number"
						v-model="userinfo.culture_grade.mathematics"
					/>
					<span class="right" v-show="!btnflag">{{userinfo.culture_grade.mathematics}}</span>
				</div>
			</div>
			<p class="title">
				<b>专业成绩</b>
				<button class="add" :disabled="!btnflag" @click="$router.push('/addmajor')">添加统考成绩</button>
			</p>
			<div class="crad">
				<div class="block">
					<span class="left">专业类别</span>
					<span class="right">美术类</span>
				</div>
				<div class="block">
					<span class="left">专业总分</span>
					<input
						class="right"
						type="number"
						v-model="userinfo.major_grade[0].total"
						placeholder="请输入专业总分"
					/>
					<!-- <span class="right" >{{item.total}}</span> -->
				</div>
			</div>
			<!-- <div
				class="crad"
				v-for="(item,index) in userinfo.major_grade"
				:key="index+'i'"
				@click="del(index)"
			>
				<div class="block" @click.stop="open(index,1)">
					<span class="left">专业类别</span>
					<input
						class="right"
						v-show="btnflag"
						type="text"
						placeholder="请输入专业类别"
						v-model="item.major_name"
					/>
					<span class="right" v-show="!btnflag">{{item.major_name}}</span>
				</div>
				<div class="block">
					<span class="left">专业总分</span>
					<input class="right" v-show="btnflag" type="number" placeholder="请输入专业总分" v-model="item.total" />
					<span class="right" v-show="!btnflag">{{item.total}}</span>
				</div>
				<div class="block" v-show="item.hasOwnProperty('sketch')">
					<span class="left">素描</span>
					<input
						class="right"
						v-show="btnflag"
						type="number"
						placeholder="请输入素描成绩"
						v-model="item.sketch"
					/>
					<span class="right" v-show="!btnflag">{{item.sketch}}</span>
				</div>
				<div class="block" v-show="item.hasOwnProperty('sketches')">
					<span class="left">速写</span>
					<input
						class="right"
						v-show="btnflag"
						type="number"
						placeholder="请输入速写成绩"
						v-model="item.sketches"
					/>
					<span class="right" v-show="!btnflag">{{item.sketches}}</span>
				</div>
				<div class="block" v-show="item.hasOwnProperty('colours')">
					<span class="left">色彩</span>
					<input
						class="right"
						v-show="btnflag"
						type="number"
						placeholder="请输入色彩成绩"
						v-model="item.colours"
					/>
					<span class="right" v-show="!btnflag">{{item.colours}}</span>
				</div>
			</div>-->
			<!-- <p class="title">
				<b>校考成绩</b>
				<button class="add" :disabled="!btnflag" @click="$router.push('/addSchool')">添加校考成绩</button>
			</p>
			<div class="crad" v-for="(item,index) in userinfo.school_grade" :key="index">
				<div class="block">
					<span class="left">院校名称</span>
					<input
						class="right"
						v-show="btnflag"
						type="text"
						placeholder="请输入院校名称"
						v-model="item.colleges"
					/>
					<span class="right" v-show="!btnflag">{{item.colleges}}</span>
				</div>
				<div class="block">
					<span class="left">校考专业</span>
					<input class="right" v-show="btnflag" type="text" placeholder="请输入校考专业" v-model="item.major" />
					<span class="right" v-show="!btnflag">{{item.major}}</span>
				</div>
				<div class="block">
					<span class="left">校考分数</span>
					<input class="right" v-show="btnflag" type="number" placeholder="请输入校考分数" v-model="item.grade" />
					<span class="right" v-show="!btnflag">{{item.grade}}</span>
				</div>
			</div>-->
			<div class="btn">
				<button v-show="!btnflag" @click.stop="change(0)">编辑</button>
				<button v-show="btnflag" @click.stop="change(1)">保存</button>
			</div>
		</div>
		<div class="cover" v-show="flag" @click.stop="flag=false">
			<div class="popup" v-show="!flag0" @click.stop="flag=true">
				<div class="topbox">
					<div class="toptitle">
						<span>请选择</span>
						<div class="img" @click.stop="flag=false">
							<img src="../assets/+@2x.png" alt />
						</div>
					</div>
					<div class="selectbox">
						<p @click.stop="flag1=true" :class="{select:flag1}">{{provice}}</p>
						<p @click.stop="flag1=false" v-show="Boolean(this.city)" :class="{select:!flag1}">{{city}}</p>
						<p v-show="!Boolean(this.city)" :class="{select:!flag1}" @click.stop="flag1=false">请选择城市</p>
					</div>
				</div>
				<div class="provicebox" v-show="flag1">
					<div class="title">选择省份/地区</div>
					<div class="provice">
						<div
							class="provicename"
							v-for="(item,index) in getprovince"
							:key="index"
							@click.stop="getcity(index)"
						>{{item.name}}</div>
					</div>
				</div>
				<div class="provicebox" v-show="!flag1">
					<div class="title">选择城市</div>
					<div class="provice">
						<div
							class="provicename"
							v-for="(item,index) in citylist"
							:key="index"
							@click.stop="select(index)"
						>{{item.name}}</div>
					</div>
				</div>
			</div>
			<div class="newpopup" v-show="flag0" @click.stop="flag=true">
				<div class="choice">
					<p>请选择</p>
					<div class="close" @click.stop="flag=false">
						<img src="../assets/+@2x.png" alt />
					</div>
				</div>
				<div class="choice2">
					<p
						class="option"
						v-for="(item,index) in getmajor"
						:key="index"
						@click.stop="newselect(index)"
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
	name: "MyReportCard",
	data() {
		return {
			content: "资源加载中!",
			waitflag: false,
			language: 0,
			sex: 0,
			major_default: [{ total: "", major_type: 0 }], //默认专业成绩
			fourc: -1,
			majorindex: -1, //专业索引
			provice: "", //省
			city: "", //市
			province_id: "", //省id
			city_id: "", //市id
			citylist: [], //城市列表
			flag: false, //控制cover面板显示
			flag0: false, //控制专业/区域面板显示
			flag1: true, //显示省
			flag2: false, //显示市
			btnflag: false //修改按钮
		};
	},
	created() {
		if (this.$route.query.v == 0) {
			this.btnflag = true;
		} else if (this.userinfo.major_grade[0].total == "") {
			this.btnflag = true;
		} else {
			this.btnflag = false;
		}
		//省 默认不传参
		postRequest(apis.getCity).then(res => {
			this.$store.commit("updateprovincelist", res.data.data);
		});
		//获取专业
		postRequest(apis.getConf).then(res => {
			this.$store.commit("updatemajorlist", res.data.data);
		});
	},
	methods: {
		onclick() {
			if (!this.btnflag) {
				this.content = "请点击底部编辑按钮,进行编辑";
				this.waitflag = true;
				setTimeout(() => {
					this.waitflag = false;
					return false;
				}, 1000);
			}
		},
		//点击完成 发送用户数据
		back() {
			if (window.localStorage.getItem("homestate") == 1) {
				this.$router.push("/Me");
			} else {
				this.$router.push("/");
			}
		},
		//获取下级城市
		getcity(i) {
			this.provice = this.getprovince[i].name;
			this.userinfo.address = this.getprovince[i].name;
			this.userinfo.province_id = this.getprovince[i].id;
			this.city = "";
			if (
				i == 1 ||
				i == 2 ||
				i == 9 ||
				i == 22 ||
				i == 31 ||
				i == 32 ||
				i == 33
			) {
				this.flag = false;
				this.userinfo.city_id = 0;
			} else {
				this.flag1 = false;
				postRequest(apis.getCity, { pid: this.getprovince[i].id }).then(res => {
					console.log(res);
					this.citylist = res.data.data;
				});
			}
		},
		//选中城市
		select(i) {
			this.city = this.citylist[i].name;
			this.userinfo.city_id = this.citylist[i].id;
			this.userinfo.address = this.provice + this.citylist[i].name;
			console.log(i);
			this.flag = false;
			this.flag1 = true;
		},
		//删除校考成绩  功能仅供测试用
		del(i) {
			console.log(i);
			// this.userinfo.major_grade.splice(i, 1);//删除功能关闭
		},
		//修改
		change(v) {
			if (v == 0) {
				this.btnflag = true;
			} else {
				this.save();
			}
		},
		//单选
		check(i, v) {
			if (this.btnflag) {
				if (i == 0) {
					this.userinfo.sex = v;
				} else if (i == 1) {
					this.userinfo.language = v;
				} else if (i == 2) {
					this.userinfo.culture_grade.type = v;
				} else if (i == 3) {
					this.fourc = v;
				}
			} else {
				this.content = "请点击底部编辑按钮,进行编辑";
				this.waitflag = true;
				setTimeout(() => {
					this.waitflag = false;
					return false;
				}, 1000);
			}
		},
		//保存用户信息
		save() {
			for (const item of this.userinfo.school_grade) {
				item.grade = Number(item.grade).toFixed(2);
			}
			for (const item of this.userinfo.major_grade) {
				item.total = Number(item.total).toFixed(2);
				if ("sketch" in item) {
					item.sketch = Number(item.sketch).toFixed(2);
					item.sketches = Number(item.sketches).toFixed(2);
					item.colours = Number(item.colours).toFixed(2);
				}
			}
			let data = {
				//学生信息对象
				name: this.userinfo.name,
				mobile: this.userinfo.mobile,
				photo: this.userinfo.photo[0],
				high_school: this.userinfo.high_school,
				art_org: this.userinfo.art_org,
				culture_grade: {
					// type: this.userinfo.culture_grade.type,//江苏版废弃文理科
					chinese: Number(this.userinfo.culture_grade.chinese).toFixed(2),
					english: Number(this.userinfo.culture_grade.english).toFixed(2),
					synthesize: Number(this.userinfo.culture_grade.synthesize).toFixed(2),
					total: Number(this.userinfo.culture_grade.total).toFixed(2),
					mathematics: Number(this.userinfo.culture_grade.mathematics).toFixed(
						2
					)
				},
				major_grade: JSON.stringify(this.userinfo.major_grade),
				school_grade: JSON.stringify(this.userinfo.school_grade),
				province_id: this.userinfo.province_id,
				city_id: this.userinfo.city_id,
				address: this.userinfo.address,
				language: this.userinfo.language,
				sex: this.userinfo.sex || 0 //默认0
			};
			postRequest(apis.setUser, data).then(res => {
				if (res.data.code == 1) {
					this.content = "保存成功";
					this.waitflag = true;
					this.btnflag = false;

					setTimeout(() => {
						this.waitflag = false;
					}, 500);
				} else {
					this.content = res.data.msg;
					this.waitflag = true;
					this.btnflag = true;
					setTimeout(() => {
						this.waitflag = false;
					}, 1000);
				}
			});
		}, //打开下拉框
		open(i, v) {
			if (this.btnflag) {
				this.flag = true;
				if (v == 0) {
					this.flag0 = false;
				} else {
					this.flag0 = true;
				}
				if (i != -1) {
					this.majorindex = i;
				}
			} else {
				this.content = "请点击底部编辑按钮,进行编辑";
				this.waitflag = true;
				setTimeout(() => {
					this.waitflag = false;
					return false;
				}, 500);
			}
		},
		newselect(i) {
			for (const item of this.userinfo.major_grade) {
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
			this.userinfo.major_grade[this.majorindex].major_type = i;
			this.userinfo.major_grade[this.majorindex].major_name = this.getmajor[i];
			if (this.getmajor[i] == "美术与设计类") {
				this.userinfo.major_grade[this.majorindex].sketch = 0;
				this.userinfo.major_grade[this.majorindex].sketches = 0;
				this.userinfo.major_grade[this.majorindex].colours = 0;
			} else {
				delete this.userinfo.major_grade[this.majorindex].sketch;
				delete this.userinfo.major_grade[this.majorindex].sketches;
				delete this.userinfo.major_grade[this.majorindex].colours;
			}
		}
	},
	computed: {
		userinfo() {
			return this.$store.state.userinfo;
		},
		getprovince() {
			return this.$store.state.provincelist;
		},
		getmajor() {
			return this.$store.state.majorlist;
		}
	}
};
</script>

<style lang="scss" scoped>
.myReportCard {
	width: 100vw;
	height: 100vh;
	overflow: auto;
	font-size: 14px;
	background-color: #f3f3f3;
	.top {
		font-weight: bold;
		width: 100vw;
		height: 50px;
		background-color: #fff;
		position: fixed;
		top: -1px;
		display: flex;
		justify-content: start;
		align-items: center;
		font-size: 16px;
		box-shadow: 0px 0px 3px 0.5px rgba(204, 204, 204, 0.7);
		div {
			height: 50px;
			line-height: 50px;
			text-align: center;
		}
		.left {
			width: 20%;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 20px;
			}
		}
		.center {
			width: 60%;
			text-align: center;
		}
		.right {
			width: 20%;
			height: 50px;
		}
	}
	.section {
		padding-top: 50px;
		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 18px;
			margin: 10px auto;
			button {
				display: block;
				width: 80vw;
				height: 40px;
				line-height: 40px;
				background-color: #f54243;
				box-shadow: -0.1px 1px 5px 0.3px rgba(204, 204, 204, 0.7);
				border-radius: 25px;
				margin: 0 auto;
				font-size: 18px;
				color: #fff;
				text-align: center;
			}
		}
		.title {
			color: #333333;
			margin: 10px 15px;
			display: inline-block;
			vertical-align: middle;
			font-size: 16px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			span {
				color: #f54243;
			}
			.add {
				width: 100px;
				font-size: 14px;
				height: 25px;
				background-color: #f54243;
				border-radius: 15px;
				display: inline-block;
				vertical-align: middle;
				text-align: center;
				line-height: 25px;
				color: #fff;
			}
		}
		.crad {
			width: 95vw;
			background-color: #fff;
			margin: 0 auto;
			border-radius: 10px;
			padding: 0px 15px;
			margin-bottom: 5px;
			.radios {
				display: flex !important;
				justify-content: flex-end !important;
				align-items: center !important;
				p:first-child {
					width: 30%;
				}
				p:last-child {
					width: 30%;
				}
				p {
					color: #999;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					img {
						width: 15px;
						margin-right: 5px;
					}
				}
			}
			.block {
				height: 37px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left {
					width: 35%;
					display: inline-block;
					vertical-align: middle;
					text-align: left;
					line-height: 37px;

					color: #333;
				}
				input {
					height: 35px;
				}
				.right {
					width: 65%;
					display: inline-block;
					vertical-align: middle;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: justify;
					text-align: right;
					font-size: 14px;
					color: #999;
				}
				#image {
					width: 10px;
				}
			}
		}
	}
	.cover {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.5);
		.popup {
			width: 100vw;
			height: 70vh;
			background-color: #fff;
			border-radius: 15px 15px 0 0;
			position: fixed;
			bottom: 0;
			.topbox {
				font-size: 16px;
				.selectbox {
					p {
						text-indent: 2em;
						line-height: 2;
					}
					.select {
						color: #f54243;
					}
				}
				.toptitle {
					text-align: center;
					height: 40px;
					color: #333333;
					display: flex;
					justify-content: center;
					align-items: center;
					.img {
						width: 50px;
						height: 40px;
						position: absolute;
						right: 0;
						display: flex;
						justify-content: center;
						align-items: center;
						img {
							width: 15px;
						}
					}
				}
			}
			.provicebox {
				border-top: #eee solid 3px;
				padding-left: 15px;
				color: #666;
				.title {
					text-indent: 1em;
					height: 30px;
					line-height: 30px;
				}
				.provice {
					height: 400px;
					overflow: auto;
					padding-bottom: 15px;
					.provicename {
						text-indent: 1em;

						height: 30px;
						line-height: 30px;
						color: #333333;
					}
				}
			}
		}

		.newpopup {
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
}
</style>
