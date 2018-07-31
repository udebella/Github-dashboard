<template>
	<div>
		<input
			v-model="username"
			type="text">
		{{ watchedRepositories }}
		<div v-if="userRepositories.length">
			<h1>{{ username }} repositories</h1>
			<list-picker
				:list="userRepositories"
				data-test="repositories"
				@update="updateRepositories($event)"/>
		</div>
		<div v-if="userStarredRepositories.length">
			<h1>{{ username }} starred repositories</h1>
			<list-picker
				:list="userStarredRepositories"
				data-test="starredRepositories"
				@update="updateStarredRepositories($event)"/>
		</div>
	</div>
</template>

<script src="./settings.js"></script>
<style src="./settings.scss" scoped></style>5
