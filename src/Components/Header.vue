<template>
	<div class="links__wrapper">
		<div class="links">
			<RouterLink :to="`about`" class="link" :active="true">
				Общее
			</RouterLink>
			<RouterLink :to="`/`" class="link">
				Товары
			</RouterLink>
			<RouterLink :to="`more`" class="link" :active="true">
				Доп. расходы
			</RouterLink>
		</div>
		<Settings />
	</div>
</template>

<script setup>
import Settings from "./UI/Settings.vue";
</script>

<style lang="scss" scoped>
.links {
	display: flex;
	gap: 20px;

	&__wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 15px;
	}

	.link {
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
</style>
