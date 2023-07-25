<template>
	<badge
		v-if="configurationEnabled"
		data-test="button"
		title="Watch a new repository"
		class="icon">
		<repository-picker data-test="owner-input" />
	</badge>
</template>

<script setup lang="ts">
import {useConfigurationStore} from "@/stores/configuration";
import Badge from "@/components/badge/badge";
import RepositoryPicker from "@/components/repository-picker/repository-picker";

const configurationEnabled = useConfigurationStore().configurationEnabled
</script>

<style src="./repository-adder.scss" scoped></style>
