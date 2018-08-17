<template>
	<div>
		<debounced-input
			placeholder="Repository owner"
			data-test="owner-input"
			@input="retrieveRepositoriesFor"/>
		<select @input="pickRepository">
			<option
				v-for="{name} in repositories"
				:key="name"
				:value="name"
				data-test="repository-input">
				{{ name }}
			</option>
		</select>
	</div>
</template>

<script src="./repository-picker.js"></script>
<style src="./repository-picker.scss" scoped></style>
