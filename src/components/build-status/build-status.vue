<template>
    <a 
        :href="status.targetUrl" 
        :title="status.description"
        target="_blank">{{ status.state }}</a>
</template>

<script src="./build-status.js"></script>
<style src="./build-status.scss" scoped></style>