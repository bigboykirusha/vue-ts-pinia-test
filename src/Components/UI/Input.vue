<template>
	<input v-model="model" @input="$emit('change', $event)" class="input field" type="number" :disabled="disabled" />
</template>

<script setup>
import { defineModel } from "vue";

const { disabled, total } = defineProps(["disabled", "total"]);

const emit = defineEmits(["change"]);

const model = defineModel();
</script>

<style lang="scss">
.input {
	position: relative;
	padding: 10px 5px 10px 15px;
	border-radius: 5px;
	border: solid 1px #ccc;
	outline: none;
}
</style>