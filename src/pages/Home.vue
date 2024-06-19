<template>
	<section class="content">
		<AddField @add="addItem" />
		<div class="content__wrapper">
			<div class="content__options">
				<p v-if="changed" @click="saveChanges" class="content__save">
					Сохранить изменения
				</p>
				<Settings />
			</div>
			<Table />
			<Cart />
		</div>
	</section>
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
		total: 1500,
	});
};

const saveChanges = () => {
	tableStore.saveItems();
};
</script>

<style lang="scss" scoped>
.content {
	&__wrapper {
		background-color: #fff;
		box-shadow: 0 5px 20px 0 var(--black-7);
		border: solid 1px var(--pale-grey);
		border-radius: var(--borderR);
		padding-bottom: 25px;
		

		@media (max-width: 768px) {}
	}

	&__options {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		column-gap: 20px;
		padding: 10px 15px;
	}

	&__save {
		cursor: pointer;
		color: #a6b7d4;
		font-size: 14px;

		&:hover {
			transition: all 0.2s ease;
			text-decoration: underline;
			color: black;
		}
	}
}
</style>
