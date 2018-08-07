<template>
	<badge
		:class="branchStatus"
		class="line">
		<repository-link
			:name="repository.name"
			:url="repository.url"
			class="repository-link"/>
		<popover class="popover">
			<branch-status
				:name="repository.name"
				:owner="repository.owner"
				:branch="repository.defaultBranch"
				@build-status="updateBuildStatus"/>
		</popover>
	</badge>
</template>

<script src="./repository-line.js"></script>
<style src="./repository-line.scss" scoped></style>
