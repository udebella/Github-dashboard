<template>
	<a :href="url" data-test="link" class="link">
		<badge-status :status="buildStatus" class="line" data-test="name">
			<div class="title">
				{{ title }}
			</div>
			<div class="icons">
				<update-icon v-if="hasUpdates" data-test="update-icon" />
				<living-icon :date="creationDate" data-test="living-icon" />
			</div>
			<pop-over v-if="statusesList.length" side="left" class="popover">
				<build-statuses :statuses="statusesList" />
			</pop-over>
		</badge-status>
	</a>
</template>

<script src="./pull-request-line.js"></script>
<style src="./pull-request-line.scss" scoped></style>
