<template>
	<aside class="cart">
		<div class="cart__wrapper">
			<div class="cart__item" v-for="(value, key) in calculatorData" :key="key">
				<p class="cart__label">{{ getDisplayName(key) }}:</p>
				<p class="cart__value">{{ value }}</p>
			</div>
		</div>
		<div class="cart__wrapper cart__wrapper--total">
			<div class="cart__item">
				<p class="cart__label cart__label--total">{{ getDisplayName('total') }}:</p>
				<p class="cart__value cart__value--total">{{ calculatorData.total }}</p>
			</div>
		</div>
	</aside>
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
	margin: 20px 15px 0 auto;
	padding: 15px;
	font-size: 14px;
	display: flex;
	flex-direction: column;
	gap: 15px;
	max-width: 320px;
	width: 100%;
	background-color: var(--pale-grey-two);
	border: 1px solid var(--pale-grey);
	border-radius: 8px;

	@media (max-width: 768px) {
		margin-top: 25px;
	}

	&__wrapper {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	&__item {
		display: flex;
		justify-content: space-between;
	}

	&__label {
		color: #8f8f8f;
	}

	&__wrapper--total {
		border-top: 2px solid var(--pale-grey);
		padding-top: 15px;
		margin-top: 10px;
	}

	&__label--total {
		color: black;
	}

	&__value--total {
		font-size: 16px;
		color: black;
	}
}
</style>
