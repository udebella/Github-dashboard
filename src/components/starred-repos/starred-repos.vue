<template>
    <div>
        List of starred repo for {{ username }} :
        <repository-list :repositories="repositories"/>
    </div>
</template>

<script src="./starred-repos.js"></script>
<style src="./starred-repos.scss"></style>