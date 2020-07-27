<template>
    <div @click="$emit('deleteEvent')" class="deleter">
        <v-icon color="#7B0001">{{ icon }}</v-icon>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from "vue-class-component";

    @Component
    export default class Deleter extends Vue {
        icon = "mdi-delete-variant";
    }
</script>

<style scoped>
    .deleter {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 5px;
        margin: 0 15px 2px 0;
    }

    .deleter:hover {
        cursor: pointer;
    }

</style>