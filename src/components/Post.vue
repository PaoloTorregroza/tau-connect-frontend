<template>
    <v-card class="post-container">
        <div>
        <v-avatar class="avatar">
            <img :src="gravatar" />
        </v-avatar>
        </div>
        <div class="post-content">
            <v-list>
                <v-list-item-content>
                    <v-list-item-title style="font-weight: bold;">{{name}}</v-list-item-title>
                    <v-list-item-subtitle style="margin-top: 5px; color: gray;">@{{username}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
					{{ body }}
				</v-list-item-content>
            </v-list>
        </div>
        <div class="actions">
            <v-icon 
                class="action-icon" 
                v-for="item in items" 
                v-bind:key="item.name"
            >{{item.icon}}</v-icon>
        </div>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import md5 from 'md5';

@Component 
export default class Post extends Vue {
	@Prop(String) readonly body!: string;
	@Prop({default: " "}) readonly email!: string;
	@Prop({default: "John Doe"}) readonly name!: string;
	@Prop({default: "Undefined"}) readonly username!: string;

    items = [
        {name: "like", icon: "mdi-heart-outline"},
        {name: "comment", icon: "mdi-comment-outline"}
    ]

	get gravatar() {
		return "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase().trim());
	}
}
</script>

<style scoped>
.avatar {
    flex-grow: 1;
}

.post-content {
    flex-grow: 3;
    padding-right: 10px;
    padding-left: 10px;
    margin-top: -19px;
    border-right: 1px solid gray;
}

.post-container {
    padding: 18px;
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}

.actions {
    margin-left: 10px;
    display: flex;
    flex-direction:column;
    justify-content: flex-start;
}

.action-icon {
    margin-bottom: 15px;
}

.action-icon:hover {
    cursor: pointer;
}
</style>
