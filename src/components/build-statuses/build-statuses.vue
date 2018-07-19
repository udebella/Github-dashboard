<template>
    <span>
        <span 
            v-for="({description, targetUrl, state}, index) in statuses"
            :key="index">
            <build-status 
                :description="description" 
                :url="targetUrl" 
                :state="state"/>
        </span>
    </span>
</template>

<script src="./build-statuses.js"></script>
<style src="./build-statuses.scss" scoped></style>