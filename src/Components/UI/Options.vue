<template>
	<button @click="showOptionsHandler($event)" class="options field" :class="`options_${index}`">
		<img src="@assets/images/options.png" alt="options" ref="refOptions" />
		<Teleport to="body">
			<Transition name="fade">
				<button @click="$emit('delete')" v-if="showDrop" class="options__drop" :style="optionsPosition">
					Удалить
				</button>
			</Transition>
		</Teleport>
	</button>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";

const index = Math.ceil(Math.random() * new Date().getTime());

const bodyClick = (e) => {
	if (!e.target.closest(`.options_${index}`)) {
		showDrop.value = false;
		document.body.classList.remove("no-scroll");
		document.removeEventListener("click", bodyClick);
	}
};

const showDrop = ref(false);
const refOptions = ref(null);

const optionsPosition = reactive({ top: 0, left: 0 });
const showOptionsHandler = (e) => {
	const position = refOptions.value.getBoundingClientRect();
	optionsPosition.top = position.top + position.height + 5 + "px";
	optionsPosition.left = position.left + "px";
	showDrop.value = !showDrop.value;
	if (showDrop.value) {
		document.body.classList.add("no-scroll");
		document.addEventListener("click", bodyClick);
	} else {
		document.body.classList.remove("no-scroll");
		document.removeEventListener("click", bodyClick);
	}
};

onUnmounted(() => {
	document.body.classList.remove("no-scroll");
});
</script>

<style lang="scss">
.options {
	position: relative;
	padding: 7px;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 2px;
	cursor: pointer;
	background-color: transparent;
	border: none;

	@media (max-width: 768px) {
		align-items: start;
		padding: 0;
		height: auto !important;
	}

	& img {
		width: 3px;
		height: 13px;
	}

	&__drop {
		position: absolute;
		border: none;
		padding: 7px 10px;
		cursor: pointer;
		box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
		background-color: #fff;
		border-radius: 5px;
		width: auto;
		text-align: left;
		z-index: 10;
		font-size: 14px;
		color: #ae0a0a;

		@media (max-width: 768px) {
			position: fixed;
		}
	}
}
</style>
