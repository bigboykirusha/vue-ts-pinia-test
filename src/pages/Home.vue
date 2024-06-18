<template>
	<AddField @add="addItem" />
	<div class="table__wrapper">
		<div class="table__options">
			<p v-if="changed" @click="saveChanges" class="table__save">
				Сохранить изменения
			</p>
			<Settings />
		</div>
		<Table />
		<Cart />
	</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import AddField from '../Components/Add.vue';
import Table from '../Components/Table.vue';
import Cart from '../Components/Cart.vue';
import Settings from '../Components/UI/Settings.vue';

import { useTableStore } from '../store/store.ts';

const tableStore = useTableStore();

const changed = computed(() => tableStore.changed);

const addItem = () => {
	tableStore.addItem({
		id: tableStore.getLastId + 1,
		unit: { text: 'Мраморный щебень фр. 2-5 мм, 25кг', value: 25 },
		cost: 100,
		count: 15,
		name: { text: 'Мраморный щебень', value: 'marble' },
		total: 1500
	});
};

const saveChanges = () => {
	tableStore.saveItems();
};
</script>
<style lang="scss" scoped>
.table {

	&__options {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		column-gap: 20px;
		margin-bottom: 10px;

	}

	&__save {
		cursor: pointer;
		color: #a6b7d4;
		font-size: 14px;

		&:hover {
			text-decoration: underline;
		}
	}
}
</style>