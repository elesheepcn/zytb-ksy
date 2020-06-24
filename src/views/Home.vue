<template>
	<div class="home">
		<div class="topbg">
			<img src="../assets/banner2@3x.png" alt />
			<div class="right">
				<div class="msg" @click="go('/NewList')">
					<img src="../assets/xiaoxi@2x.png" />
					<div class="dot" v-show="flag4"></div>
					<span>消息</span>
				</div>
				<div class="me" @click="go('/Me')">
					<img class="me" src="../assets/wode@2x.png" />
					<span>我的</span>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="nav">
				<img src="../assets/jiaol.png" alt />
				<div class="navbox">
					<div class="left" @click="go('/RankQuery')">
						<img src="../assets/iconl.png" />
						<span>位次查询</span>
					</div>
					<div class="right" @click="go('/Guide')">
						<img src="../assets/iconr.png" />
						<span>院校指南</span>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="left">
					<img src="../assets/ksy.png" alt />
					<p>
						<span>扫码获取更多精彩内容</span>
						<img src="../assets/形状27@3x.png" alt />
					</p>
				</div>
				<div class="right">
					<img src="../assets/QRcode.png" alt />
					<span>招生考试网公众号</span>
				</div>
			</div>
			<div class="conten">
				<div class="block1">
					<span class="title">政策资讯>></span>
				</div>
				<ul id="newslist">
					<li
						@click.capture="$router.push({path: '/newinfo', query: {id: item.id} })"
						v-for="(item,index) in getnews"
						:key="index"
					>
						<div class="txtbox" v-show="item.photo.length==0&&item.video.length==0">
							<div class="title">{{item.title}}</div>
							<div class="tag">
								<span>{{item.tag}}</span>
								<span>{{item.update_time | times}}</span>
							</div>
						</div>
						<div
							class="imgbox"
							id="num1"
							v-show="item.photo.length>0&&item.photo.length<3&&item.video.length==0"
						>
							<div class="title">{{item.title}}</div>
							<div class="img">
								<img :src="getimguri(item.photo[0])" alt="这里有张图" />
							</div>
							<div class="tag">
								<span>{{item.tag}}</span>
								<span>{{item.update_time | times}}</span>
							</div>
						</div>
						<div class="imgbox" id="num3" v-show="item.photo.length>=3">
							<div class="title">{{item.title}}</div>
							<div class="img">
								<img :src="getimguri(item.photo[0])" alt="这里有张图" />
								<img :src="getimguri(item.photo[1])" alt="这里有张图" />
								<img :src="getimguri(item.photo[2])" alt="这里有张图" />
							</div>
							<div class="tag">
								<span>{{item.tag}}</span>
								<span>{{item.update_time | times}}</span>
							</div>
						</div>
						<div class="videobox" v-show="item.video.length>0">
							<div class="title">{{item.title}}</div>
							<div class="video">
								<img :src="getimguri(item.photo[0])" alt="这里有张图" />
							</div>
							<img id="play" src="../assets/play.png" alt />
							<div class="tag">
								<span>{{item.tag}}</span>
								<span>{{item.update_time | times}}</span>
							</div>
						</div>
					</li>
				</ul>
				<div id="changepage">
					<button v-show="!flag5" @click="page()">查看更多↓</button>
					<button v-show="flag5" @click="backtop">~~我也是有底线的!!，点我返回顶部吧 ↑~~</button>
				</div>
			</div>
		</div>
		<div class="wait" v-show="waitflag" @click="waitflag=false">
			<img src="../assets/waitpay.gif" alt />
			<span>{{content}}</span>
		</div>
	</div>
</template>
<script>
import apis from "../js/api";
import { postRequest } from "../js/httputil";
export default {
	name: "Home",
	data() {
		return {
			content: "资源加载中!",
			currentIndex: 0, //默认显示图片
			flag: false, //支付窗口显示
			flag1: true, //专业选择
			flag2: true, //收费说明
			flag3: false, //支付界面
			flag4: false, //消息提示点点
			flag5: false, //资讯底线提示
			waitflag: false, //首页资源加载动画
			userflag: true, //跳转资料加载动画
			// loadingflag: true, //支付等待动画
			price: 0, //服务价格
			imgflag1: true,
			imgflag2: false,
			imgflag3: false,
			type: 0, //支付方式
			serve_id: 0, //填报方式
			current_page: 1, //当前资讯页
			last_page: 0 //当前资讯页
		};
	},
	created() {
		// 请求资讯列表
		postRequest(apis.getInfoList, { page: this.current_page }).then(res => {
			this.$store.commit("updatenews", res.data.data.data);
			this.last_page = res.data.data.last_page;
			if (res.data.data.current_page == res.data.data.last_page) {
				this.flag5 = true;
			} else {
				this.flag5 = false;
			}
		});
		//消息列表
		postRequest(apis.getMsg).then(res => {
			//遍历未读消息
			for (const item of res.data.data) {
				if (item.status == 0) {
					this.flag4 = true;
					break; //跳出循环
				} else {
					this.flag4 = false;
				}
			}
			this.$store.commit("updatemsglist", res.data.data);
		});
	},
	computed: {
		//用户信息
		userinfo() {
			return this.$store.state.userinfo;
		},
		authorizatio() {
			return this.$store.state.authorizatio;
		},
		getnews() {
			return this.$store.state.news;
		},
		getbanner() {
			return this.$store.state.bannerlist;
		}
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

	methods: {
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
		//页面跳转 任意门
		go(v) {
			this.$router.push(v);
		},
		//翻页
		page() {
			this.current_page++;
			// 请求资讯列表
			postRequest(apis.getInfoList, { page: this.current_page }).then(res => {
				this.$store.commit("addnews", res.data.data.data);
				this.last_page = res.data.data.last_page;
				if (res.data.data.current_page == res.data.data.last_page) {
					this.flag5 = true;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.home {
	width: 100vw;
	height: 100vh;
	font-size: 14px;
	background-color: #f3f3f3;
	//支付等待
	.wait {
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
	.topbg {
		width: 100vw;
		position: relative;
		z-index: 1;
		img {
			width: 100%;
		}
		.left {
			position: absolute;
			top: 20px;
			left: 0;
			.header {
				width: 25px;
				height: 25px;
				margin-left: 16px;
				display: inline-block;
				vertical-align: middle;
			}
			.name {
				display: inline-block;
				vertical-align: middle;
				margin-left: 9px;
				color: #ffffff;
			}
		}
		.right {
			position: absolute;
			top: 5px;
			right: 0;
			width: 100px;
			height: 50px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			div {
				width: 50%;
				height: 50px;
				color: #fff;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				img {
					width: 25px;
				}
			}
			.msg {
				position: relative;
				.dot {
					position: absolute;
					top: 3px;
					left: 29px;
					width: 7px;
					height: 7px;
					border-radius: 50%;
					background-color: #eee;
				}
			}
		}
	}
	.section {
		position: relative;
		top: -60px;
		.nav {
			width: 95vw;
			margin: 0 auto;
			position: relative;
			top: 7.5px;
			z-index: 2;
			img {
				width: 100%;
			}
			.navbox {
				width: 100%;
				font-size: 20px;
				margin-top: -20px;
				position: absolute;
				top: 52%;
				left: 0;
				display: flex;
				justify-content: space-around;
				align-items: center;
				.left {
					color: #fff;
					justify-content: flex-end;
					padding-right: 20px;
				}
				.right {
					color: #ee1c25;
					justify-content: flex-start;
					padding-left: 20px;
				}
				div {
					width: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					img {
						width: 22px;
						margin-right: 5%;
						margin-top: 2.5px;
					}
				}
			}
		}
		.card {
			width: 90vw;
			margin: 22.5px auto 2.5px;
			height: 100px;
			border-radius: 12.5px;
			background-color: #fff;
			box-shadow: 0 0 2.5px 0.3px rgba(204, 204, 204, 0.7);
			display: flex;
			padding: 7.5px 20px;
			justify-content: space-between;
			align-items: center;
			color: #ee1c25;
			div {
				width: 40%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
			}
			.left {
				font-weight: bold;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				img {
					width: 90%;
				}
				p {
					font-size: 18px;
					img {
						position: relative;
						bottom: -4px;
						width: 20%;
						margin-left: 5px;
					}
				}
			}
			.right {
				font-size: 12px;
				img {
					width: 55%;
				}
			}
		}
		.conten {
			width: 95vw;
			background-color: #ffffff;
			border-radius: 10px;
			margin: 20px auto 0;
			.block1 {
				width: 95vw;
				height: 40px;
				padding: 9px 15px 0 14px;
				border-bottom: #ededed solid 2px;
				.title {
					float: left;
					color: #333333;
				}
				.more {
					float: right;
					color: #666666;
				}
			}
			// 资讯列表盒子
			#newslist {
				list-style: none;
				li {
					border-bottom: 1px solid #e5e5e5;
					padding: 5px;
					div {
						position: relative;
						//标题
						.title {
							line-height: 20px;
							color: #222;
							height: 20px;
							padding-right: 5px;
						}
						//标签
						.tag {
							color: #999 !important;
							position: absolute;
							bottom: 0px;
							left: 0;
							font-size: 12px;
							span {
								display: inline-block;
								padding: 2px;
								border: 1px solid #ccc;
								margin-right: 5px;
							}
						}
					}
					//纯文本
					.txtbox {
						height: 50px;
						.title {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							text-align: justify;
						}
					} //带图
					.imgbox {
						display: flex;
						justify-content: space-between;
						.title {
							width: 65%;
							height: 40px;
							overflow: hidden;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							text-align: justify;
						}
						.img {
							width: 33%;
							img {
								width: 100%;
								vertical-align: top;
							}
						}
					}
					//三张图
					#num3 {
						height: 125px;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.title {
							height: 20px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							text-align: justify;
						}
						.img {
							width: 90vw;
							display: flex;
							justify-content: space-around;
							img {
								width: 32%;
							}
						}
						.tag {
							position: static;
							width: 100px;
							color: #999;
						}
					}
					//视频
					.videobox {
						width: 90vw;
						padding-bottom: 22.5px;
						overflow: hidden;
						position: relative;
						#play {
							width: 50px;
							position: absolute;
							top: 50%;
							left: 50%;
							margin-top: -25px;
							margin-left: -25px;
						}
						.title {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							text-align: justify;
						}
						.video {
							width: 100%;
							overflow: hidden;
							display: block;
							margin: 5px auto 2.5px;
							img {
								width: 100%;
							}
						}
					}
				}
			}
			//翻页
			#changepage {
				width: 100%;
				height: 40px;
				margin-top: 5px;
				button {
					background-color: #eee;
					color: #666;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.cover {
		width: 100vw;
		height: 100vh;
		margin: 0;
		padding: 0;
		position: fixed;
		z-index: 2;
		top: -1px;
		background-color: rgba(0, 0, 0, 0.5);
		.popup1 {
			width: 100vw;
			height: px2rem(825);
			background-color: #ffffff;
			border-radius: 10px 10px 0 0;
			position: fixed;
			z-index: 3;
			bottom: 0;

			.title {
				font-size: 16px;
				color: #333333;
				height: px2rem(109);
				width: 100vw;
				border-radius: 10px 10px 0 0;
				padding: 0 0 0 px2rem(41);
				line-height: px2rem(109);
				border-bottom: #eee solid 2px;
			}

			.art {
				width: px2rem(451);
				height: 50px;
				background-color: #f54344;
				border-radius: 10px;
				margin: 50px auto px2rem(50) auto;
				text-align: center;
				line-height: 50px;
				font-size: 16px;
				color: #ffffff;
			}

			.music {
				width: px2rem(451);
				height: 50px;
				background-color: #f3f3f3;
				border-radius: 10px;
				margin: 0 auto;
				text-align: center;
				line-height: 50px;
				font-size: 16px;
				color: #333333;
			}
		}

		.popup2 {
			width: px2rem(535);
			// height: px2rem(395);
			background-color: #ffffff;
			border-radius: 10px;
			margin: px2rem(600) auto px2rem(450);
			.title {
				height: px2rem(70);
				border-radius: 10px 10px 0 0;
				font-size: 16px;
				color: #333333;
				border-bottom: #ccc solid 2px;
				text-align: center;
				line-height: px2rem(70);
			}
			.down {
				width: px2rem(535);
				// height: px2rem(323);
				border-radius: 0 0 100px 10px;
				padding: 12.5px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				p {
					width: 90%;
					font-size: px2rem(26);
					color: #999999;
					margin-bottom: px2rem(41);
				}

				.left {
					width: 30%;
					height: px2rem(61);
					background-color: #f3f3f3;
					border-radius: px2rem(12);
					font-size: px2rem(26);
					color: #666666;
					text-align: center;
					line-height: px2rem(61);
				}

				.right {
					width: 35%;
					height: px2rem(61);
					background-color: #f54344;
					border-radius: px2rem(12);
					font-size: px2rem(26);
					color: #ffffff;
					text-align: center;
					line-height: px2rem(61);
				}
			}
		}

		.popup3 {
			width: 100vw;
			height: px2rem(600);
			background-color: #ffffff;
			border-radius: 10px 10px 0 0;
			position: fixed;
			z-index: 3;
			bottom: 0;

			.title {
				font-size: px2rem(28);
				color: #333333;
				height: 50px;
				width: 100vw;
				border-radius: 10px 10px 0 0;
				border-bottom: #eee solid 2px;

				p {
					height: 50px;
					width: px2rem(700);
					line-height: px2rem(109);
					text-align: center;
					display: inline-block;
					vertical-align: middle;
				}

				img {
					width: 14px;
					height: 14px;
					display: inline-block;
					vertical-align: middle;
					margin-right: 10px;
				}
			}

			.collection {
				width: 100vw;
				height: 125px;
				border-bottom: #ccc solid 2px;
				padding: px2rem(49) 2px 2px px2rem(42);

				.name {
					font-size: px2rem(30);
					color: #333333;
				}

				.money {
					text-align: center;

					.number {
						font-size: px2rem(88);
						color: #ee1c25;
					}

					.yuan {
						color: #ee1c25;
						font-size: px2rem(48);
					}
				}
			}

			.down {
				height: 125px;
				width: 100vw;
				display: flex;
				justify-content: center;
				align-items: center;
				.block {
					width: px2rem(674);
					margin: 0 auto;
					height: px2rem(90);
					border-bottom: #f3f3f3 solid 2px;

					.left {
						float: left;
						font-size: 16px;
						color: #333333;
						line-height: px2rem(90);
					}
					.right {
						float: right;
						width: 15px;
						margin-top: 15px;
						height: 15px;
					}
				}
				.botton {
					width: px2rem(550);
					height: px2rem(101);
					background-color: #ee1c25;
					border-radius: 10px;
					font-size: 16px;
					color: #ffffff;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
}
</style>
