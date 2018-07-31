<template>
	<ul
		v-if="isDisplayed"
		class="list">
		<li
			v-for="repository in repositories"
			:key="repository.name">
			<repository-line :repository="repository"/>
		</li>
	</ul>
</template>

<script src="./repository-list.js"></script>
<style src="./repository-list.scss" scoped></style>
