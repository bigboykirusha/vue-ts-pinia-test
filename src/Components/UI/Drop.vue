<template>
	<div class="drop">
		<div @click="toggleShowColumns" class="drop__title">
			<span class="drop__title-text">{{ title }}</span>
			<img class="drop__arrow" src="@assets/images/arrow.svg" alt="arrow" />
		</div>
		<div v-if="showColumns" class="drop__columns">
			<slot />
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
});

const showColumnsValue = ref(false);

const toggleShowColumns = () => {
	showColumnsValue.value = !showColumnsValue.value;
};

const showColumns = computed(() => showColumnsValue.value);
</script>

<style lang="scss" scoped>
.drop {
	margin-bottom: 15px;
	&:last-of-type {
		margin-bottom: 0;
	}
	&__title {
		display: flex;
		align-items: center;
		cursor: pointer;
		padding: 5px;

		&-text {
			margin-right: 10px;
		}

		& img {
			width: 9px;
			height: 9px;
			transition: transform 0.3s ease;
		}

		&:hover img {
			transform: rotate(90deg);
		}
	}

	&__columns {
		margin-top: 10px;
	}
}
</style>
