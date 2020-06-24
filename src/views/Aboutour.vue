<template>
	<!-- 一对一 -->
	<div class="aboutour">
		<div class="top">
			<div class="left" @click="$router.push('/Me')">
				<img class="reback" src="../assets/black_back.png" alt />
				<span>返回</span>
			</div>
			<div class="center">关于我们</div>
		</div>
		<div class="close">
			<p>此项服务暂未开通!</p>
		</div>
	</div>
</template>

<script>
// import apis from "../js/api";
// import { postRequest } from "../js/httputil";
export default {
	name: "Aboutour",
	data() {
		return {
			list: []
		};
	},
	created() {
		// postRequest(apis.getExpert).then(res => {
		// 	console.log(res);
		// });
	}
};
</script>

<style lang="scss" scoped>
.aboutour {
	width: 100vw;
	height: 100vh;
	overflow: auto;
	font-size: 14px;
	background-color: #f3f3f3;
	.top {
    font-weight: bold;
    font-weight: bold;
		width: 100vw;
		height: 50px;
		font-size: 16px;
		line-height: 50px;
		background-color: #fff;
		color: #333;
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
	}

	.close {
		width: 100vw;
		margin: 100px auto;
		text-align: center;
	}
}
</style>
