<template>
    <div>
        <span :class="state">{{ state }}</span>
        <build-statuses :statuses="contexts"/>
    </div>
</template>

<script src="./branch-status.js"></script>
<style src="./branch-status.scss" scoped></style>