<template>
	<div class="cart">
		<div class="cart__wrapper">
			<div class="cart__item" v-for="(value, key) in calculatorData" :key="key">
				<p class="cart__name">{{ getDisplayName(key) }}:</p>
				<p class="cart__cost">{{ value }}</p>
			</div>
		</div>
		<div class="cart__wrapper">
			<div class="cart__item cart__item-total">
				<p class="cart__name">{{ getDisplayName('total') }}:</p>
				<p class="cart__cost">{{ calculatorData.total }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTableStore } from '../store/store';

const store = useTableStore();

const calculatorData = computed(() => ({
	total: formatNumberWithSpaces(store.getTotal),
	count: formatNumberWithSpaces(store.getTotalCount),
	weight: formatNumberWithSpaces(store.getTotalWeight),
}));

function formatNumberWithSpaces(number: number): string {
	return number.toLocaleString();
}

function getDisplayName(key: string): string {
	const displayNames: Record<string, string> = {
		total: 'Общая сумма',
		count: 'Количество',
		weight: 'Общий вес',
	};

	return displayNames[key] || key;
}
</script>

<style lang="scss" scoped>
.cart {
	margin-top: 15px;
	margin-right: 15px;
	margin-left: auto;
	font-size: 14px;
	align-self: end;
	display: flex;
	flex-direction: column;
	gap: 5px;
	max-width: 304px;
	width: 100%;

	&__wrapper {
		display: flex;
		flex-direction: column;
		gap: 15px;
		padding: 15px;
		border-radius: 5px;
		border: solid 1px var(--pale-grey);
		background-color: var(--pale-grey-two);
	}

	&__item {
		display: flex;
		justify-content: space-between;
	}

	&__name {
		color: #8f8f8f;
	}

	&__item-total {
		display: flex;
		font-weight: 700;

		justify-content: space-between;
	}
}

@media (max-width: 768px) {
	.cart {
		margin-top: 25px;
		margin-right: 0;
		max-width: 100%;
	}
}
</style>
