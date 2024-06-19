<template>
	<div ref="drag" class="drag field">
		<img class="drag__img" src="@assets/images/drag.svg" alt="drag" />
		<span class="drag__index">{{ index + 1 }}</span>
		<div class="drag__dragging"></div>
	</div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["index"]);
const drag = ref(null);
</script>

<style lang="scss">
.drag {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	cursor: pointer;

	&__img {
		pointer-events: none;
		user-select: none;
	}

	&__index {
		font-weight: bold;
	}

}

@media (max-width: 768px) {
	.drag {
		height: auto !important;
		justify-content: flex-start;
	}
}
</style>
