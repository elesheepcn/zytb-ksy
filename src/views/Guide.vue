<template>
	<!-- 报考指南 -->
	<div class="guide" @click="flag=false">
		<div class="top">
			<div class="left" @click="$router.push({path:'/',query: { v: 0 }})">
				<img class="reback" src="../assets/black_back.png" alt />
				<span>返回</span>
			</div>
			<div class="center">
				<div class="search">
					<form @submit.prevent="formSubmit" action="javascript:return true">
						<input
							id="search"
							class="input"
							v-model="schoolname"
							placeholder="输入院校名称"
							type="search"
							@keydown="search2($event)"
						/>
					</form>

					<img class="magnifier" @click="search()" src="../assets/sousuo@2x.png" alt />
				</div>
			</div>
			<div class="right" @click.stop="flag = true">
				<span>筛选</span>
				<img class="screen" src="../assets/shaixuan@2x.png" alt />
			</div>
		</div>
		<div class="list">
			<div
				class="school"
				v-for="(item,index) in getschoollist"
				:key="index"
				@click.stop="$router.push({path: '/schoolDetails', query: {id: item.id}})"
			>
				<div class="banner" v-if="item.hasOwnProperty('photo')">
					<img :src="getimguri(item.photo[0])" alt />
				</div>
				<div class="sch" v-if="!item.hasOwnProperty('photo')">
					<div class="schoolImg">
						<img :src="getimguri(item.icon[0])" alt />
					</div>
					<div class="schoolInf">
						<p class="name">{{item.name}}</p>
						<div class="evaluate">
							<!-- 暂时注释 星级无数据 后期显示 勿删 -->
							<!-- <img class="stars" src="../assets/xing@2x.png" alt v-show="item.star>=1" />
						<img class="stars" src="../assets/xing@2x.png" alt v-show="item.star>=2" />
						<img class="stars" src="../assets/xing@2x.png" alt v-show="item.star>=3" />
						<img class="stars" src="../assets/xing@2x.png" alt v-show="item.star>=4" />
							<img class="stars" src="../assets/xing@2x.png" alt v-show="item.star>=5" />-->
							<span class="address">{{item.address}}</span>
						</div>
						<div class="label">
							<div class="one" v-show="item.tag.includes('985')">985</div>
							<div class="two" v-show="item.tag.includes('211')">211</div>
							<div class="three" v-show="item.tag.includes('双一流')">双一流</div>
						</div>
						<p class="nature">{{item.property}}</p>
					</div>
					<div class="risk">
						<button class="btn" v-show="item.collect==0" @click.stop="add(index,0)">加入收藏</button>
						<button class="btn y" v-show="item.collect==1" @click.stop="add(index,1)">取消加入</button>
					</div>
				</div>
			</div>
			<p v-show="getschoollist.length==0" style="margin:300px auto;text-align: center;">暂无数据</p>
			<div id="changepage" v-show="getschoollist.length!=0">
				<button v-show="!flag6" @click="page()">点击按钮以查看更多↓</button>
				<button v-show="flag6" class="floor" @click="backtop">{{content}}</button>
			</div>
		</div>
		<div class="cover" v-show="flag" @click="flag=false">
			<div class="popup" @click.stop="flag=true">
				<div class="up">
					<p class="title" @click="open(0)">
						<b>省份</b>
						<span class="img">
							<img v-show="!flag1" src="../assets/zhankai.png" alt />
							<img v-show="flag1" src="../assets/shouqi.png" alt />
						</span>
					</p>
					<div class="block" v-show="flag1">
						<div class="option" :class="checked[0].list.length==0?'yes':''" @click.stop="change(-1,0)">不限</div>
						<div
							class="option"
							v-for="(item,index) in getprovince"
							:key="index"
							@click.stop="change(index,0)"
							:class="{ yes: checked[0].list.includes(getprovince[index].id) }"
						>{{item.shortname}}</div>
					</div>
					<p class="title" @click="open(1)">
						<b>专业类别</b>
						<span class="img">
							<img v-show="!flag2" src="../assets/zhankai.png" alt />
							<img v-show="flag2" src="../assets/shouqi.png" alt />
						</span>
					</p>
					<div class="block" v-show="flag2">
						<div class="option" :class="current_major==-1?'yes':''" @click.stop="change(-1,1)">不限</div>
						<div
							class="option"
							v-for="(item,index) in getconfiglist[0].list"
							:key="index"
							@click.stop="change(index,1)"
							:class="current_major==index?'yes':''"
						>{{item.name}}</div>
					</div>
					<p class="title">
						<b>专业方向</b>
					</p>
					<div class="block" v-show="current_major!=-1">
						<div class="option" :class="checked[5].list.length==0?'yes':''" @click.stop="change(-1,5)">不限</div>
						<div
							class="option"
							v-for="(item,index) in majorlist.list"
							:key="index"
							@click.stop="change(index,5)"
							:class="{ yes: checked[5].list.includes(majorlist.list[index]) }"
						>{{item}}</div>
					</div>
					<p class="title" @click="open(2)">
						<b>院校标签</b>
						<span class="img">
							<img v-show="!flag3" src="../assets/zhankai.png" alt />
							<img v-show="flag3" src="../assets/shouqi.png" alt />
						</span>
					</p>
					<div class="block" v-show="flag3">
						<div class="option" :class="checked[2].list.length==0?'yes':''" @click.stop="change(-1,2)">不限</div>
						<div
							class="option"
							v-for="(item,index) in getconfiglist[1].list"
							:key="index"
							@click.stop="change(index,2)"
							:class="{ yes: checked[2].list.includes(index) }"
						>{{item}}</div>
					</div>
					<p class="title">
						<b>办学性质</b>
					</p>
					<div class="block">
						<div class="option" :class="checked[3].list.length==0?'yes':''" @click.stop="change(-1,3)">不限</div>
						<div
							class="option"
							v-for="(item,index) in getconfiglist[2].list"
							:key="index"
							@click.stop="change(index,3)"
							:class="{ yes: checked[3].list.includes(index) }"
						>{{item}}</div>
					</div>
					<p class="title">
						<b>批次</b>
					</p>
					<div class="block">
						<div class="option" :class="checked[4].list.length==0?'yes':''" @click.stop="change(-1,4)">不限</div>
						<div
							class="option"
							v-for="(item,index) in getconfiglist[3].list"
							:key="index"
							@click.stop="change(index,4)"
							:class="{ yes: checked[4].list.includes(index) }"
						>{{item}}</div>
					</div>
				</div>
				<div class="down">
					<button class="reset" @click.stop="reset()">重置</button>
					<button class="btn" @click.stop="hide()">筛选</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import apis from "../js/api";
import { postRequest } from "../js/httputil";
export default {
	name: "Guide",
	data() {
		return {
			flag: false, //控制筛选面板显示
			flag1: false, //星星
			flag2: false, //星星
			flag3: false, //星星
			flag6: false, //翻页
			content: "~~没有更多了!!，换个筛选条件试试吧~~",
			//多选
			checked: [
				{ id: 0, name: "province", list: [] }, //省
				{ id: 1, name: "major", list: [] }, //专业
				{ id: 2, name: "tag", list: [] }, //院校标签
				{ id: 3, name: "property", list: [] }, //办学性质
				{ id: 4, name: "batch", list: [] }, //批次
				{ id: 5, name: "majorlist", list: [] } //二级专业列表
			],
			//二级专业列表
			majorlist: {},
			schoollist: [], //学校列表
			current_page: 1, //当前列表页
			current_major: -1, //当前大类
			last_page: 1, //下一页
			schoolname: "", //搜索学校名字
      major_type: [], //二类专业
      // getschoollist:[]
		};
	},
	created() {
		//获取广告
		// postRequest(apis.getBanner).then(res => {
		// 	console.log(res.data.data);
		// 	this.$store.commit("addbanner", res.data.data);
		// });
		//获取配置
		postRequest(apis.getSearch).then(res => {
			// console.log(res.data.data);
			this.$store.commit("updateconfiglist", res.data.data);
		});
		//省 默认不传参
		postRequest(apis.getCity).then(res => {
			// console.log(res.data.data);
			this.$store.commit("updateprovincelist", res.data.data);
		});
		this.checked = this.guideset;
		//学校列表
		this.getschool();
	},
	mounted() {
		this.scrollToTop();
	},
	computed: {
		getschoollist() {
			return this.$store.state.schoollist;
		},
		getconfiglist() {
			return this.$store.state.configlist;
		},
		getprovince() {
			return this.$store.state.provincelist;
		},
		//报考指南筛选项
		guideset() {
			return this.$store.state.guidefiltrate;
		}
	},
	methods: {
		//监听页面滚动
		scrollToTop() {
			let scrollTop =
				document.documentElement.scrollTop || document.body.scrollTop;
			console.log(scrollTop);
		},
		formSubmit() {
			return false;
		},
		//搜索
		search() {
			// 请求报考指南学校列表
			postRequest(apis.getGuide, { name: this.schoolname }).then(res => {
				this.$store.commit("updateschoollist", res.data.data.data);
			});
		},
		search2(ev) {
			if (ev.keyCode == 13) {
				//键盘回车的编码是13
				this.search();
			}
		},
		//学校列表
		// getlist() {
		// 	postRequest(apis.getGuide).then(res => {
		// 		console.log(res);
		// 		this.$store.commit("updateschoollist", res.data.data.data);
		// 		this.last_page = res.data.data.last_page;
		// 	});
		// },
		//展开
		open(v) {
			if (v == 0) {
				this.flag1 = !this.flag1;
			} else if (v == 1) {
				this.flag2 = !this.flag2;
			} else {
				this.flag3 = !this.flag3;
			}
		},
		//清空筛选
		reset() {
			this.schoolname = "";
			this.current_major = -1;
			this.checked[0].list = [];
			this.checked[2].list = [];
			this.checked[3].list = [];
			this.checked[4].list = [];
			this.checked[5].list = [];
			this.getschool();
		},

		//回到顶部
		backtop() {
			var timer = setInterval(function() {
				let osTop =
					document.documentElement.scrollTop || document.body.scrollTop;
				// let ispeed = -100;
				document.documentElement.scrollTop = document.body.scrollTop =
					osTop - 500;
				this.isTop = true;
				// console.log(ispeed);
				if (osTop <= 500) {
					clearInterval(timer);
				}
			}, 50);
		},
		//图片地址
		getimguri(uri = "zytb/loading.gif") {
			return apis.imguri + uri;
		},
		//筛选框
		change(i, v) {
			//i 索引 v 值 用来判断当前是操作哪个列表
			this.current_page = 1;
			//省份
			if (v == 0) {
				//点击了全部
				if (i == -1) {
					this.checked[v].list = [];
				} else if (this.checked[v].list.indexOf(this.getprovince[i].id) == -1) {
					this.checked[v].list.push(this.getprovince[i].id);
				} else if (
					this.checked[v].list.indexOf(this.getprovince[i].id) !== -1
				) {
					this.checked[v].list.splice(
						this.checked[v].list.indexOf(this.getprovince[i].id),
						1
					);
				}
			} //一类专业
			else if (v == 1) {
				this.current_major = i;
				this.checked[5].list = [];
				//点击了全部
				if (i == -1) {
					this.majorlist.list = [];
				} else {
					this.majorlist = this.getconfiglist[0].list[i];
				}
				this.major_type = this.majorlist.list;
			} //标签 办学性质 批次
			else if (v == 2 || v == 3 || v == 4) {
				//点击了全部
				if (i == -1) {
					this.checked[v].list = [];
				} else if (this.checked[v].list.indexOf(i) == -1) {
					this.checked[v].list.push(i);
				} else if (this.checked[v].list.indexOf(i) !== -1) {
					this.checked[v].list.splice(this.checked[v].list.indexOf(i), 1);
				}
			}
			//二类专业
			else if (v == 5) {
				if (i == -1) {
					this.checked[v].list = [];
					this.major_type = this.majorlist.list;
				} else if (this.checked[v].list.indexOf(this.majorlist.list[i]) == -1) {
					this.checked[v].list.push(this.majorlist.list[i]);
					// if (this.checked[v].list.length >= 5) {
					// 	alert("最多五个");
					// 	return false;
					// } else {
					// 	this.checked[v].list.push(this.majorlist.list[i]);
					// }
					this.major_type = this.checked[v].list;
				} else if (
					this.checked[v].list.indexOf(this.majorlist.list[i]) !== -1
				) {
					this.checked[v].list.splice(
						this.checked[v].list.indexOf(this.majorlist.list[i]),
						1
					);
					this.major_type = this.checked[v].list;
				} else if (this.checked[v].list.length == 0) {
					this.major_type = this.majorlist.list;
				}
			}
			this.$store.commit("updateguideset", this.checked);
			this.getschool();
		},
		//筛选
		hide() {
			this.flag = false;
			this.getschool();
		},
		//获取筛选后学校列表
		getschool() {
			let data = {
				//筛选项
				province_id: this.checked[0].list.toString() || -1,
				tag: this.checked[2].list.toString() || -1,
				property: this.checked[3].list.toString() || -1,
				batch: this.checked[4].list.toString() || -1,
				major_type: this.major_type.toString() || -1,
				page: this.current_page
			};
			//学校列表
			postRequest(apis.getGuide, data).then(res => {
				this.$store.commit("updateschoollist", res.data.data.data);
				console.log(res);
				if (res.data.data.current_page == res.data.data.last_page) {
					this.flag6 = true;
				}
			});
			// if (this.current_page == this.last_page) {
			// 	this.flag6 = true;
			// }
		},
		//翻页
		page() {
			this.current_page++;
			let data = {
				//筛选项
				name: this.schoolname,
				province_id: this.checked[0].list.toString() || -1,
				tag: this.checked[2].list.toString() || -1,
				property: this.checked[3].list.toString() || -1,
				batch: this.checked[4].list.toString() || -1,
				major_type: this.major_type.toString() || -1,
				page: this.current_page
			};
			// 请求报考指南学校列表
			postRequest(apis.getGuide, data).then(res => {
				this.$store.commit("addSchoolList", res.data.data.data);
				this.last_page = res.data.data.last_page;
				if (res.data.data.current_page == res.data.data.last_page) {
					this.flag6 = true;
				}
			});
		},
		add(i, v) {
			if (v == 0) {
				//添加收藏
				postRequest(apis.addSchooleCollect, {
					school_id: this.getschoollist[i].id,
					school_name: this.getschoollist[i].name
				}).then(res => {
					console.log(res);
					this.getschool();
				});
			} else {
				//删除收藏
				postRequest(apis.delSchoolCollect, {
					id: this.getschoollist[i].id
				}).then(res => {
					console.log(res);
					this.getschool();
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.guide {
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
		justify-content: space-between;
		align-items: center;
		font-size: 16px;
		box-shadow: 0px 0px 3px 0.5px rgba(204, 204, 204, 0.7);
		.left {
			width: 20%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 50px;
			img {
				width: 20px;
			}
		}
		.center {
			width: 60%;
			height: 50px;
			display: flex;
			align-items: center;
			.search {
				width: 100%;
				height: 36px;
				background-color: #f3f3f3;
				border-radius: 18px;
				padding: 0px 10px;
				display: flex;
				justify-content: start;
				align-items: center;
				form {
					width: 90%;
					.input {
						width: 100%;
						height: 36px;
						background-color: #f3f3f3;
						font-size: 14px;
						display: inline-block;
						vertical-align: middle;
					}
				}
				.magnifier {
					width: 10%;
					display: inline-block;
					vertical-align: middle;
				}
			}
		}
		.right {
			width: 20%;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			.screen {
				width: 15px;
			}
		}
	}
	.list {
		padding: 50px 0 0px;
		.school {
			width: 100vw;
			height: auto;
			.banner {
				width: 100%;
				margin-bottom: 5px;
				img {
					width: 100%;
					vertical-align: top;
				}
			}
			.sch {
				width: 100vw;
				height: 100px;
				display: flex;
				justify-content: start;
				align-items: center;
				background-color: #fff;
				margin-bottom: 5px;
				padding: 10px;
				.schoolImg {
					width: 20%;
					display: flex;
					justify-content: center;
					align-items: center;
					img {
						width: 90%;
					}
				}
				.schoolInf {
					vertical-align: middle;
					margin-left: 10px;
					width: 55%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: start;
					font-size: 12px;
					.name {
						font-size: 14px;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						text-align: justify;
						color: #333333;
						// margin-bottom: 2px;
					}
					.evaluate {
						// margin-bottom: 5px;
						.stars {
							width: 11px;
							height: 10px;
							display: inline-block;
							vertical-align: middle;
						}
						.address {
							font-size: 12px;
							color: #999999;
							display: inline-block;
							vertical-align: middle;
							// margin-left: 10px;
						}
					}
					.label {
						div {
							display: inline-block;
							vertical-align: middle;
							border-radius: 7px;
							padding: 0px 5px;
							margin-right: 5px;
						}
						.one {
							border: solid 1px #9ebeff;
							color: #9ebeff;
						}
						.two {
							border: solid 1px #de9aff;
							color: #de9aff;
						}
						.three {
							border: solid 1px #ffce92;
							color: #ffce92;
						}
					}
					.nature {
						color: #cccccc;
					}
				}
				.risk {
					width: 25%;
					display: flex;
					justify-content: center;
					align-items: center;
					.btn {
						width: 70px;
						height: 25px;
						border-radius: 6px;
						color: #fff;

						background-color: #f54243;
					}
					.y {
						background-color: #ddd;
					}
				}
			}
		}
		//翻页
		#changepage {
			width: 100%;
			height: 50px;

			margin-top: 5px;
			button {
				background-color: #eee;
				color: #666;
				width: 100%;
				height: 100%;
			}
		}
	}
	.cover {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: -1px;
		left: 0;
		z-index: 99;
		background-color: rgba(0, 0, 0, 0.5);
		.popup {
			width: 80vw;
			height: 100vh;
			background-color: #fff;
			position: fixed;
			z-index: 3;
			right: 0;
			.up {
				width: 80vw;
				height: 88vh;
				overflow: auto;
				padding: 16px 15px 20px 17px;
				border-bottom: #ccc solid 2px;
				.title {
					color: #000;
					height: 25px;
					line-height: 25px;
					margin-bottom: 7px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.img {
						width: 50px;
						height: 35px;
						display: flex;
						justify-content: center;
						align-items: center;
						img {
							width: 15px;
						}
					}
				}
				#majorlist {
					border: 1px solid #ccc;
					background-color: #e5e5e5;
				}
				.block {
					display: inline-block;
					display: flex;
					flex-wrap: wrap;
					justify-content: start;
					.option {
						height: 22px;
						padding: 0 5px;
						background-color: #ededed;
						border-radius: 5px;
						font-size: 14px;
						color: #333;
						position: relative;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-right: 5px;
						margin-bottom: 7px;
					}
					.yes {
						background-color: #ffcccc;
						border-radius: 5px;
						color: #ff3333;
					}
				}
				.star {
					img {
						width: 28px;
						height: 21px;
					}
				}
			}
			.down {
				height: 12vh;
				width: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				button {
					width: 30%;
					height: 40px;
					border-radius: 10px;
					font-size: 18px;
				}
				.reset {
					background-color: #ededed;
					color: #666;
				}
				.btn {
					background-color: #ff3333;
					color: #fff;
				}
			}
		}
	}
}
</style>
