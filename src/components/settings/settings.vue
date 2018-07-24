<template>
    <div>
        <input
            v-model="username"
            type="text">
        {{ watchedRepositories }}
        <div v-if="username">
            <h1>{{ username }} repositories</h1>
            <list-picker 
                :list="userRepositories"
                @update="updateRepositories($event)"/>
        </div>
        <div v-if="username">
            <h1>{{ username }} starred repositories</h1>
            <list-picker 
                :list="userStarredRepositories"
                @update="updateStarredRepositories($event)"/>
        </div>
    </div>
</template>

<script src="./settings.js"></script>
<style src="./settings.scss" scoped></style>5