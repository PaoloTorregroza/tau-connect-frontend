<template>
    <div @click="$emit('deleteEvent')" class="deleter">
        <!--
        <v-icon color="#7B0001">{{ icon }}</v-icon>
        -->
        <p>x</p>
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
        color: gray;
        font-size: small;
        font-weight: lighter;
        position: absolute;
        top: 0;
        right: 8px;
    }

    .deleter:hover {
        cursor: pointer;
    }

</style>