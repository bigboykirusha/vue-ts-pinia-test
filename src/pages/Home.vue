<template>
	<section class="content">
		<Add @add="addItem" />
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
import { computed, nextTick } from 'vue';
import Add from '../Components/Add.vue';
import Table from '../Components/Table.vue';
import Cart from '../Components/Cart.vue';
import Settings from '../Components/UI/Settings.vue';
import { addItem as addItemToStore } from '../Utils/createNewItem.ts';

import { useTableStore } from '../store/store.ts';

const tableStore = useTableStore();

const changed = computed(() => tableStore.changed);

const addItem = () => {
	addItemToStore(tableStore);
	nextTick(() => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth',
		});
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


		@media (max-width: 768px) {
			box-shadow: none;
			border-radius: none;
			border: none;
		}
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
