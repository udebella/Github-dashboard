<template>
    <div>
        <input
            v-model="username"
            type="text">
        <div>
            <h1>{{ username }} repositories</h1>
            <ul>
                <li
                    v-for="repository in userRepositories"
                    :key="repository.name">
                    {{ repository.name }}
                </li>
            </ul>
        </div>
        <div>
            <h1>{{ username }} starred repositories</h1>
            <ul>
                <li
                    v-for="repository in userStarredRepositories"
                    :key="repository.name">
                    {{ repository.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script src="./settings.js"></script>
<style src="./settings.scss" scoped></style>5