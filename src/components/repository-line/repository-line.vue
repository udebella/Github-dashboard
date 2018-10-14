<template>
	<badge
		:class="repository.branchStatus"
		class="line">
		<repository-link
			:name="repository.name"
			:url="repository.repositoryUrl"
			class="repository-link"/>
		<repository-remover
			:name="repository.name"
			:owner="repository.owner"
			data-test="trash"/>
		<popover class="popover">
			<branch-status
				:name="repository.name"
				:owner="repository.owner"
				:branch="repository.defaultBranch"/>
		</popover>
	</badge>
</template>

<script src="./repository-line.js"></script>
<style src="./repository-line.scss" scoped></style>
