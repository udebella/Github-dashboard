<template>
	<div class="settings">
		<div>
			<label for="username">Username</label>
			<input
				id="username"
				v-model="username"
				type="text">
		</div>
		<div v-if="userRepositories.length">
			<h1>{{ username }} repositories</h1>
			<list-picker
				:list="formatForListPicker(userRepositories)"
				class="list-picker"
				data-test="repositories"
				@tick="selectRepository($event)"
				@untick="unselectRepository($event)"/>
		</div>
		<div v-if="userStarredRepositories.length">
			<h1>{{ username }} starred repositories</h1>
			<list-picker
				:list="formatForListPicker(userStarredRepositories)"
				class="list-picker"
				data-test="starredRepositories"
				@tick="selectRepository($event)"
				@untick="unselectRepository($event)"/>
		</div>
	</div>
</template>

<script src="./settings.js"></script>
<style src="./settings.scss" scoped></style>5
