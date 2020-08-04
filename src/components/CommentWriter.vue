<template lang="html">
  <div class="text-center">
    <v-dialog
      :value="show"
      @input="$emit('update:show', $event)"
      @click:outside="$emit('update:show', false)"
      width="650"
    >
      <v-card>
        <v-card-title class="headline lighten-2">
          Make a comment
        </v-card-title>

        <v-divider />

        <v-form v-model="validPost" @submit.prevent="onSubmit">
          <v-textarea 
            class="text-area"
            v-model="commentBody"
            counter="300"
            :rules="rules"
            outlined
            auto-grow
            color="#DB842E"
          ></v-textarea>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#7B0001"
              text
              @click="$emit('update:show', false)"
            >
              Cancel
            </v-btn>
            <v-btn @click="comment" color="#DB842E" :disabled="!validPost">Comment</v-btn>
          </v-card-actions>
        </v-form>

      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import {requiredRule} from '@/utils/form-rules';
  import axios from 'axios';

  @Component
  export default class CommentWriter extends Vue {
    @Prop() show: boolean;
    @Prop() readonly postId: string;

    validPost = false;
    commentBody = "";
    rules = [
        (v: string) => /\w+/.test(v) || "Write something", 
        (v: string) => v?.length <= 300 || "Max 300 characters", 
        requiredRule()
    ];

    async comment() {
      this.$emit("update:show", false);
      const url = `${this.apiUrl}/comments/` + this.postId;
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      }
      await axios.post(url, {body: this.commentBody}, config);
      this.$emit("commented");
      this.commentBody = "";
    }
  }

</script>

<style lang="css" scoped>
.text-area {
  margin: 10px;
}
</style>
