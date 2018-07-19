<template>
    <div 
        :class="branchStatus"
        class="line">
        <repository-link
            :title="branchStatus"
            :repository="repository"
            class="repository-link"/>
        <branch-status
            :name="repository.name"
            :owner="repository.owner"
            :branch="repository.defaultBranch"
            class="branch-status"
            @build-status="updateBuildStatus"/>
    </div>
</template>

<script src="./repository-line.js"></script>
<style src="./repository-line.scss" scoped></style>