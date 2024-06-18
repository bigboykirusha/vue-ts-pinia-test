<template>
	<div class="add">
		<div @click="$emit('add')" class="add__button">
			<img src="@assets/images/add.png" alt="add" class="add__img" />
			<span>Добавить строку</span>
		</div>
	</div>
</template>

<script setup lang="ts">
defineEmits(['add']);
</script>

<style lang="scss" scoped>
.add {
	padding: 20px 25px;
	border-radius: var(--borderR);
	background-color: #fff;
	box-shadow: 0 5px 20px 0 var(--black-7);
	border: solid 1px var(--pale-grey);
	font-size: 14px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	transition: box-shadow 0.3s ease;

	&:hover {
		box-shadow: 0 8px 30px -10px rgba(0, 0, 0, 0.2);
	}

	&__img {
		width: 11px;
		height: 11px;
	}

	&__button {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 7px;
		width: 146px;
		height: 35px;
		font-size: 14px;
		padding: 10px 15px 10px 10px;
		border-radius: 5px;
		border-radius: 5px;
		color: #fff;
		background-color: #5ca4ff;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: #2f8cff;
		}

	}
}
</style>
