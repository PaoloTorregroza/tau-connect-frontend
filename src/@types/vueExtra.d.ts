import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $apiUrl: string
    }
}
