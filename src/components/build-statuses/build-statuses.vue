<template>
    <div>
        <span 
            v-for="(status, index) in statuses"
            :key="index">
            <build-status :status="status"/>
        </span>
    </div>
</template>

<script src="./build-statuses.js"></script>
<style src="./build-statuses.scss" scoped></style>