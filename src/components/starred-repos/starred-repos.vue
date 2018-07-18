<template>
    <div>
        List of starred repo for {{ username }} :
        <ul>
            <li 
                v-for="repository in repositories"
                :key="repository.name">
                <slot :repository="repository"/>
            </li>
        </ul>
    </div>
</template>

<script src="./starred-repos.js"></script>
<style src="./starred-repos.scss"></style>