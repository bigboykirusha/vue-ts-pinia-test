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

	@media (max-width: 992px) {
		padding: 16px 10px;
	}
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
</style>
