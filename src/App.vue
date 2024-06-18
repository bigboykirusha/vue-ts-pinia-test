<template>
	<div class="wrapper">
		<main class="container">
			<div class="mobile__wrapper">
				<img class="mobile__burger" src="@assets/images/burger.svg" alt="burger" @click="openBurger" />
				<Title text="Проведение ТО и мелкий ремонт" />
			</div>
			<Header />
			<RouterView />
		</main>
	</div>
</template>

<script setup>
import Title from "./Components/UI/Title.vue";
import Header from "./Components/Header.vue";
import { RouterView } from "vue-router";

</script>

<style lang="scss">
.wrapper {
	display: flex;
	height: 100%;
	overflow: auto;
	background-color: white;

}

.container {
	width: 100%;
	height: 100%;
	padding: 25px;
	display: flex;
	flex-direction: column;
	gap: 25px;
}

.mobile {
	&__wrapper {
		display: flex;
		gap: 25px;
	}

	&__burger {
		margin-top: 9px;
		align-self: start;
		cursor: pointer;
		display: none;

		@media (max-width: 992px) {
			display: block;
		}
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
