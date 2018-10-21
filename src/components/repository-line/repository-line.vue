<template>
	<div class="line">
		<repository-remover
			:name="repository.name"
			:owner="repository.owner"
			data-test="trash"
			class="repository-remover"/>
		<a
			:href="repository.repositoryUrl"
			data-test="link"
			target="_blank"
			class="link">
			<badge 
				:class="repository.branchStatus"
				data-test="badge">
				<span>{{ repository.name }}</span>
				<popover 
					v-if="repository.statusesList.length"
					class="popover">
					<build-statuses :statuses="repository.statusesList"/>
				</popover>
			</badge>
		</a>
	</div>
</template>

<script src="./repository-line.js"></script>
<style src="./repository-line.scss" scoped></style>
