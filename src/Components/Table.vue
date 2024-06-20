<template>
	<div class="table-container">
		<table ref="tableRef" class="table">
			<thead class="table__head">
				<VueDraggable v-model="tableStructure" tag="tr" handle=".table__drag-zone" class="table__header">
					<th class="table__header-cell" :key="`${id}-${index}`" v-for="({ head, id }, index) in tableStructure" ы
						:style="{ minWidth: columnWidths[index] }">
						<div class="table__drag-zone">
							<span class="table__header-text">{{ head }}</span>
							<div class="dragging-placeholder"></div>
						</div>
						<span ref="resizerRef" class="resizer" @mouseover="handleResizerHover($event)"
							@mousedown="handleResizeStart($event, index)"></span>
					</th>
				</VueDraggable>
			</thead>
			<VueDraggable class="table__body" v-model="items" tag="tbody" handle=".drag">
				<tr class="table__row" v-for="(item, itemIndex) in items" :key="`${item.id}-${itemIndex}`">
					<td class="table__cell" v-for="({ field, head, id }, index) in tableStructure" :key="`${id}-${index}`"
						:style="{ width: columnWidths[index] }">
						<p class="table__cell-head">{{ head }}</p>
						<component @change="handleItemChange" v-model="item[field]" :is="componentMap[field].component"
							:index="itemIndex" :options="componentMap[field].options" :disabled="componentMap[field].disabled"
							@delete="handleItemDelete(itemIndex)" />
						<div class="dragging-placeholder"></div>
					</td>
				</tr>
			</VueDraggable>
		</table>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, shallowRef, onMounted } from 'vue';
import { useTableStore } from '../store/store';
import { VueDraggable } from 'vue-draggable-plus';

import DragComponent from '../Components/UI/Drag.vue';
import OptionsComponent from '../Components/UI/Options.vue';
import InputComponent from '../Components/UI/Input.vue';
import SelectComponent from '../Components/UI/Select.vue';
import { IItem, ITableColumn } from '../@types/typesTable.ts';
import { OPTIONS_NAME, OPTIONS_UNIT } from '../@types/data.ts';


const tableStore = useTableStore();

const items = computed<IItem[]>({
	get: () => tableStore.getItems,
	set: (val) => tableStore.setItems(val),
});

const tableStructure = computed<ITableColumn[]>({
	get: () => tableStore.tableStructure,
	set: (columns: ITableColumn[]) => tableStore.setTableStructure(columns),
});

const selectOptionsUnit = ref([...OPTIONS_UNIT]);

const selectOptionsName = ref([...OPTIONS_NAME]);

const componentMap = shallowRef({
	drag: { component: DragComponent },
	options: { component: OptionsComponent },
	unit: { component: SelectComponent, options: selectOptionsUnit.value },
	cost: { component: InputComponent },
	count: { component: InputComponent },
	name: { component: SelectComponent, options: selectOptionsName.value },
	total: { component: InputComponent, disabled: true },
});

const tableRef = ref<HTMLElement | null>(null);
const columnWidths = ref<string[]>([]);

const setColumnWidths = () => {
	if (tableRef.value) {
		const headers = tableRef.value.querySelectorAll('.table__header-cell .table__header-text');

		columnWidths.value = Array.from(headers).map((header, index) => {
			if (window.innerWidth <= 768) {
				return '100%';
			} else if (index === 0 || index === 1) {
				return '120px';
			} else {
				const width = header.clientWidth + 200;
				return `${width}px`;
			}
		});
	}
};

const resizerRef = ref(null);

const handleItemDelete = (itemIndex: number) => {
	tableStore.deleteItem(itemIndex);
};

const handleItemChange = () => {
	tableStore.setChanged(true);
};

const handleResizerHover = (e: MouseEvent) => {
	if (tableRef.value && e.target instanceof HTMLElement) {
		e.target.style.height = `${tableRef.value.offsetHeight}px`;
	}
};

const handleResizeStart = (e: MouseEvent, index: number) => {
	e.stopPropagation();

	let x: number | undefined, w: number | undefined;

	x = e.clientX;
	w = e.target instanceof HTMLElement ? e.target.parentElement?.offsetWidth : undefined;

	const mousemoveHandler = (event: MouseEvent) => {
		if (!x || !w) return;

		let dx = event.clientX - x;
		let cw = w + dx;

		if (e.target instanceof HTMLElement) {
			e.target.style.height = `${tableRef.value?.offsetHeight}px`;
			columnWidths.value[index] = `${cw}px`;
		}
	};

	const mouseupHandler = () => {
		if (e.target instanceof HTMLElement) {
			e.target.style.height = "100%";
		}

		document.removeEventListener("mousemove", mousemoveHandler);
		document.removeEventListener("mouseup", mouseupHandler);
	};

	document.addEventListener("mousemove", mousemoveHandler);
	document.addEventListener("mouseup", mouseupHandler);
};

window.addEventListener('load', setColumnWidths);
window.addEventListener('resize', setColumnWidths);

onMounted(() => {
	setColumnWidths();
	tableStore.fetchItems();
});
</script>

<style lang="scss">
.table {
	user-select: none;
	display: block;
	overflow-x: auto;
	overflow-y: hidden;
	padding-right: 4px;
	;

	&__header-cell {
		text-align: left;
		border-top: 1px solid var(--pale-grey);
		border-bottom: 1px solid var(--pale-grey);
		font-weight: 600;
		position: relative;
		height: 45px;
		padding: 0 8px;
		vertical-align: middle;
		background-color: #fff;
		max-width: 20px;
		white-space: nowrap;

		@media (max-width: 768px) {
			max-width: 100%;
		}

		&-text {
			overflow: hidden;
		}

		&:first-child {
			border-left: 0;
		}

		&:last-child {
			border-right: 0;
			padding-right: 10px;

			& .resizer {
				display: none;
			}
		}
	}

	&__row {
		height: 45px;
		position: relative;
	}

	&__cell {
		vertical-align: middle;
		height: 45px;
		padding: 5px 11px;
		text-align: center;
		max-width: 20px;
		overflow: hidden;
		width: 100%;

		@media (max-width: 768px) {
			max-width: 100%;
		}

		&-head {
			display: none;
		}

		& .field {
			display: flex;
			width: 100%;
		}
	}

	&__drag-zone {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		background-color: #fff;
	}
}

.dragging-placeholder {
	display: none !important;
}

.sortable-ghost .dragging-placeholder {
	display: block !important;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background: var(--pale-grey-two);
	border: dashed 2px #a6b7d4;
	border-radius: 5px;
	z-index: 11;
}

.resizer {
	position: absolute;
	padding: 0;
	right: 0;
	bottom: 0;
	top: 0;
	height: 100%;
	width: 1px;
	background-color: var(--pale-grey);
	display: block;
	cursor: col-resize;
}

@media (max-width: 768px) {
	.table {
		display: block;

		&__cell {
			height: auto;
			text-align: left;
			padding: 0;
			display: flex;
			width: 100%;
			flex-direction: column;
			justify-content: center;

			&-head {
				display: inline-block;
				margin-bottom: 5px;
				font-size: 10px;
				color: #8f8f8f;
			}

			& .field {
				height: 35px;
			}
		}

		&__body {
			display: flex;
			flex-direction: column;
			gap: 5px;
		}

		&__head {
			display: none;
		}

		&__wrapper {
			background-color: transparent;
			box-shadow: unset;
			border: 0;
		}

		&__options {
			display: none;
		}

		&__row {
			padding: 15px 15px 25px 15px;
			height: auto;
			display: flex;
			flex-direction: column;
			align-items: start;
			gap: 15px;
			border-radius: 10px;
			box-shadow: 0 5px 20px 0 var(--black-7);
			border: solid 1px var(--pale-grey);
			background-color: #fff;
		}
	}
}
</style>