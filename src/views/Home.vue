<template>
    <div>
        <LeftPanel />
        <div class="main-container">
            <CenterPanel />
        </div>
        <RightPanel />
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue';
import Component from 'vue-class-component';
import LeftPanel from '../components/LeftPanel.vue';
import RightPanel from '../components/RightPanel.vue';
import CenterPanel from '../components/CenterPanel.vue';

@Component({
    components: {
        LeftPanel,
        RightPanel,
        CenterPanel
    }
}) 
export default class Home extends Vue {

}

</script>

<style scoped>
.main-container {
    width: 50%;
    margin-left: 20%;
    margin-right: 32.5%;
}
</style>
