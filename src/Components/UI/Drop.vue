<template>
	<div class="drop">
		<div @click="toggleShowColumns" class="drop__title">
			<span>{{ title }}</span>
			<img src="@assets/images/arrow.svg" alt="arrow" />
		</div>
		<div v-if="showColumns" class="columns">
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

<style lang="scss" scoped></style>