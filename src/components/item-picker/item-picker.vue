<template>
    <div>
        <input
            :id="item"
            :value="item"
            v-model="isChecked"
            type="checkbox"
            @input="notifyParent($event.target)">
        <label :for="item">{{ item }}</label>
    </div>
</template>

<script src="./item-picker.js"></script>
<style src="./item-picker.scss" scoped></style>