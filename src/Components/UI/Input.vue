<template>
	<input v-model="model" @input="handleChange" :class="{ 'input--disabled': disabled }" class="input" type="number"
		:disabled="disabled" />
</template>

<script setup>
import { defineModel } from "vue";

const props = defineProps({
	disabled: Boolean,
	total: Number,
});

const emit = defineEmits(["change"]);

const model = defineModel();

const handleChange = (event) => {
	emit("change", event.target.value);
};
</script>

<style lang="scss" scoped>
.input {
	position: relative;
	padding: 10px 15px;
	border-radius: 5px;
	border: solid 1px #ccc;
	outline: none;
	font-size: 14px;
	width: 100%;

	&:disabled {
		background-color: #f5f5f5;
		color: #999;
		cursor: not-allowed;
	}
}
</style>
