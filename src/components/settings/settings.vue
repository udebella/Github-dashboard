<template>
	<div>
		<input
			v-model="username"
			type="text">
		{{ watchedRepositories }}
		<div v-if="userRepositories.length">
			<h1>{{ username }} repositories</h1>
			<list-picker
				:list="formatForListPicker(userRepositories)"
				data-test="repositories"
				@tick="selectRepository($event)"
				@untick="unselectRepository($event)"/>
		</div>
		<div v-if="userStarredRepositories.length">
			<h1>{{ username }} starred repositories</h1>
			<list-picker
				:list="formatForListPicker(userStarredRepositories)"
				data-test="starredRepositories"
				@tick="selectRepository($event)"
				@untick="unselectRepository($event)"/>
		</div>
	</div>
</template>

<script src="./settings.js"></script>
<style src="./settings.scss" scoped></style>5
