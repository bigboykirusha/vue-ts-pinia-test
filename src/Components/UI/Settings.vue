<template>
	<div class="settings" :class="`settings_${index}`">
		<img @click="showOptions = !showOptions" src="@assets/images/settings.svg" alt="settings" />
		<div v-if="showOptions" class="settings__dropdown">
			<Drop title="Отображение столбцов">
				<div v-for="({ head, id }, key) in tableStructureCopy" :key="id" class="columns__wrap">
					<input :id="`input${id}`" :checked="isColumnVisible(id)" @click="toggleColumnVisibility(id)"
						type="checkbox" class="columns__input" />
					<label :for="`input${id}`">{{ head }}</label>
				</div>
			</Drop>
			<Drop title="Порядок столбцов">
				<VueDraggable class="columns-draggable" v-model="tableStructure">
					<div v-for="({ head, id }, key) in tableStructure" :key="id" class="columns__wrap">
						<img class="columns__drag" src="@assets/images/drag.svg" alt="drag" />
						<label :for="`input${id}`">{{ head }}</label>
						<div class="dragging"></div>
						<div class="dragging-placeholder"></div>
					</div>
				</VueDraggable>
			</Drop>
		</div>
	</div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useTableStore } from '../../store/store';
import Drop from './Drop.vue';
import { VueDraggable } from 'vue-draggable-plus';

const store = useTableStore();

const showOptions = ref(false);
const index = Math.ceil(Math.random() * new Date().getTime());

const tableStructure = computed({
	get: () => store.tableStructure,
	set: (items) => store.setTableStructure(items),
});

const tableStructureCopy = computed(() => store.tableStructure);

document.body.addEventListener('click', (e) => {
	if (!e.target.closest(`.settings_${index}`)) {
		showOptions.value = false;
	}
});

function isColumnVisible(id) {
	return !!tableStructure.value.find((item) => item.id === id);
}

function toggleColumnVisibility(id) {
	const columnIndex = tableStructure.value.findIndex((item) => item.id === id);
	if (columnIndex >= 0) {
		tableStructure.value.splice(columnIndex, 1);
	} else {
		const key = tableStructureCopy.value.findIndex((item) => item.id === id);
		tableStructure.value.splice(key, 0, tableStructureCopy.value[key]);
	}
}
</script>

<style lang="scss" scoped>
.settings {
	position: relative;
	display: inline-block;
	height: 15px;
	font-size: 14px;

	img {
		cursor: pointer;
		width: 15px;
		height: 15px;
		transition: all 0.3s ease;

		&:hover {
			transform: rotate(90deg);
		}
	}

	&__dropdown {
		position: absolute;
		cursor: pointer;
		top: calc(100% + 10px);
		right: 0;
		z-index: 1000;
		width: 200px;
		background-color: #fff;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
		border-radius: 5px;
		padding: 10px;

		&.active {
			display: block;
		}

		.columns__wrap {
			display: flex;
			align-items: center;
			padding: 5px 0;

			.columns__input {
				margin-right: 5px;
			}

			.columns__drag {
				width: 12px;
				height: 12px;
				margin-right: 5px;
				cursor: move;
			}
		}
	}
}
</style>
