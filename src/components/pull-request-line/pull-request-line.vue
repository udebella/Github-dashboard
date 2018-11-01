<template>
	<a
		:href="url"
		data-test="link"
		target="_blank"
		class="link">
		<badge
			:class="buildStatus"
			class="line"
			data-test="name">
			<div>{{ title }}</div>
			<living-icon 
				:date="creationDate"
				data-test="living-icon"/>
			<popover
				v-if="statusesList.length"
				class="popover">
				<build-statuses :statuses="statusesList"/>
			</popover>
		</badge>
	</a>
</template>

<script src="./pull-request-line.js"></script>
<style src="./pull-request-line.scss" scoped></style>
