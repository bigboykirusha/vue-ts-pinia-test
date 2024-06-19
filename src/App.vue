<template>
	<aside class="menu"></aside>
	<main class="container">
		<Header />
		<RouterView />
	</main>
</template>

<script setup>
import Header from "./Components/Header.vue";
import { RouterView } from "vue-router";
</script>

<style lang="scss">

.container {
	width: 100%;
	min-height: 100vh;
	padding: 25px;
	display: flex;
	flex-direction: column;
	gap: 25px;
}

.menu {
	display: flex;
	background-image: radial-gradient(circle at 29% 0, #000, #1c2734 103%);
	width: 14.5vw;
	height: 100%;

	@media (max-width: 992px) {
		display: none;
	}
}

.drop {
	display: flex;
	flex-direction: column;
	font-size: 14px;
	color: #161616;

	&__title {
		padding: 7px 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&:hover {
			background-color: #eef3f8;
		}
	}
}

.columns {
	display: flex;
	flex-direction: column;
	gap: 6px;
	padding: 4px 4px;

	&__wrap {
		display: flex;
		gap: 4px;
		align-items: center;
		position: relative;
	}

	&_draggable {
		display: flex;
		flex-direction: column;

		& .columns__wrap {
			padding: 3px 0;

			&:first-child {
				padding-top: 0;
			}

			&:last-child {
				padding-bottom: 0;
			}
		}
	}

	&__drag {
		width: 10px;
		height: 10px;
	}
}

@media (max-width: 992px) {
	.container {
		padding: 16px 10px;
	}

	#app {
		padding-left: 0;
	}
}
</style>
