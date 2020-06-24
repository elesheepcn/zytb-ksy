<template>
	<!-- 我的收藏 -->
	<div class="collect">
		<div class="top">
			<div class="left" @click="$router.push('/Me')">
				<img class="reback" src="../assets/black_back.png" alt />
				<span>返回</span>
			</div>
			<div class="center">我的收藏</div>
			<!-- <div class="right">
				<span>{{getcollect.length}}</span>
				<span>已收藏</span>
			</div>-->
		</div>
		<div class="section">
			<div
				class="block"
				@click.stop="$router.push({path: '/schoolDetails', query: {id: item.id}})"
				v-for="(item,index) in getcollect"
				:key="index"
			>
				<div class="img">
					<img :src="getimguri(item.icon[0])" alt />
				</div>
				<div class="name">
					<span>{{item.name}}</span>
				</div>
				<div class="btn" @click.stop="del(index)">
					<button>取消收藏</button>
				</div>
			</div>
			<p v-show="getcollect.length==0" class="hint">~~你还没有收藏的志愿哟!快打开院校指南看看吧~~</p>
		</div>
	</div>
</template>

<script>
import apis from "../js/api";
import { postRequest } from "../js/httputil";
export default {
	name: "Collect",
	data() {
		return {
			list: []
		};
	},
	created() {
		this.getlist();
	},
	computed: {
		getcollect() {
			return this.$store.state.collect;
		}
	},
	methods: {
		getlist() {
			postRequest(apis.myCollect).then(res => {
				console.log(res);
				this.$store.commit("updatecollect", res.data.data.data);
			});
		},
		//图片地址
		getimguri(uri = "zytb/loading.gif") {
			return apis.imguri + uri;
		},
		del(i) {
			//删除收藏
			postRequest(apis.delSchoolCollect, {
				id: this.getcollect[i].id
			}).then(res => {
				console.log(res);
				// if (res.data.code == 0) {
				// 	alert(res.data.msg);
				// } else if (res.data.code == 1) {
				// 	alert("添加成功");
				// }
				this.getlist();
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.collect {
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
		color: #333;
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
		.right {
			width: 20%;
			display: flex;
			justify-content: space-around;
		}
	}
	.section {
		width: 100vw;
		margin-top: 50px;
		.block {
			width: 100vw;
			height: 57px;
			padding: 10px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			background-color: #fff;
			margin-bottom: 5px;

			color: #333;
			.img {
				width: 15%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				img {
					width: 50px;
				}
			}
			.name {
				width: 60%;
				font-size: 16px;
				padding-left: 10px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				text-align: justify;
			}
			.btn {
				width: 25%;
				display: flex;
				justify-content: center;
				align-items: center;
				button {
					width: 70px;
					height: 25px;
					border-radius: 7px;
					color: #fff;
					background-color: #f54243;
				}
			}
		}
		.hint {
			font-size: 16px;
			text-align: center;
			color: #f54243;
			line-height: 50px;
		}
	}
}
</style>