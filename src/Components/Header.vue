<template>
	<header class="mobile">
		<div class="mobile__wrapper">
			<div :class="{ 'burgerMenu': true, 'active': isMenuActive }" @click="toggleMenu">
				<div class="burgerBar bar1"></div>
				<div class="burgerBar bar2"></div>
				<div class="burgerBar bar3"></div>
			</div>
			<h2 class="mobile__title">Проведение ТС и мелкий ремонт</h2>
		</div>
	</header>
	<nav class="links">
		<div class="links__wrapper">
			<RouterLink :to="'about'" class="links__link" :active="true">Общее</RouterLink>
			<RouterLink :to="'/'" class="links__link">Товары</RouterLink>
			<RouterLink :to="'more'" class="links__link" :active="true">Доп. расходы</RouterLink>
		</div>
	</nav>
	<div v-if="isMenuActive" class="fullscreen-menu">
		<div class="fullscreen-menu__content">
			<RouterLink :to="'about'" class="fullscreen-menu__link" @click="closeMenu">Общее</RouterLink>
			<RouterLink :to="'/'" class="fullscreen-menu__link" @click="closeMenu">Товары</RouterLink>
			<RouterLink :to="'more'" class="fullscreen-menu__link" @click="closeMenu">Доп. расходы</RouterLink>
		</div>
	</div>
</template>


<script lang="ts" setup>

import { useMenu } from '../hooks/useMenu';
const { isMenuActive, toggleMenu, closeMenu } = useMenu();

</script>

<style lang="scss" scoped>
.mobile {
	&__wrapper {
		display: flex;
		gap: 25px;
		align-items: center;

		@media (max-width: 678px) {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	&__title {
		font-size: 30px;

		@media (max-width: 678px) {
			font-size: 26px;
		}
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

.links {
	display: flex;
	gap: 20px;

	&__wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 15px;
		column-gap: 25px;
	}

	&__link {
		font-weight: 600;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	.router-link-active {
		color: var(--light-navy);
	}
}

.burgerMenu {
	display: none;
	flex-direction: column;
	justify-content: space-between;
	width: 24px;
	height: 20px;
	cursor: pointer;
	z-index: 10001;

	@media (max-width: 1024px) {
		display: flex;
	}

	&.active .burgerBar {
		background-color: #fff;
	}

	&.active .bar1 {
		transform: rotate(45deg) translate(6px, 6px);
	}

	&.active .bar2 {
		opacity: 0;
	}

	&.active .bar3 {
		transform: rotate(-45deg) translate(6px, -6px);
	}

	.burgerBar {
		width: 100%;
		height: 3px;
		background-color: #000;
		transition: all 0.3s ease-in-out;
	}
}

.fullscreen-menu {
	position: fixed;
	z-index: 1005;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #000;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: fadeIn 0.3s ease-in-out;

	&__content {
		text-align: center;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		row-gap: 30px;
	}

	&__link {
		display: block;
		font-family: 'PT Sans', sans-serif;
		font-size: 24px;
		color: #fff;
		text-decoration: none;
		transition: color 0.3s ease-in-out;

		&:hover {
			color: #FD8301;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}
}
</style>
