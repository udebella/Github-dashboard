<template>
    <div>
        List of starred repo for {{ username }} :
        <ul>
            <li v-for="repository in repositories">
                <slot v-bind:repository="repository"></slot>
            </li>
        </ul>
    </div>
</template>

<script src="./starred-repos.js"></script>