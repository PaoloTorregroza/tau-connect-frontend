<template>
    <v-card id="login-card">
        <v-card-title>Login</v-card-title>
        <v-form ref="form" v-model="form.valid" @submit.prevent="onSubmit">
            <v-card-text>
                <v-card-text class="error" v-if="invalidData">Invalid email or password</v-card-text>
                <v-text-field color="#DB842E" type="email" v-model="form.fields.email" label="Email" :rules="form.rules.email" />
                <v-text-field color="#DB842E" type="password" v-model="form.fields.password" label="Password" :rules="form.rules.password" />
            </v-card-text>
            <v-card-actions>
                <v-btn style="color: white" type="submit" color="#7B0001" :disabled="!form.valid">
                    Continue
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {requiredRule, emailRule} from '../utils/form-rules';
	import axios from "axios";

    interface Form extends FormDefinition {
        valid: boolean;
        fields: {
            email: string;
            password: string;
        };
        rules: {
            email: ((message?: string) => {})[];
            password: ((message?: string) => {})[];
        };
    }

    @Component
    export default class Login extends Vue {
        form: Form = {
            valid: false,
            fields: {
                email: "",
                password: ""
            },
            rules: {
                email: [
                    requiredRule(),
                    emailRule()
                ],
                password: [
                    requiredRule()
                ]
            }
        }
        invalidData = false;
        async onSubmit() {
            const queryData = {
                email: this.form.fields.email,
                password: this.form.fields.password
            }
            try {
				const response = await axios.post("http://localhost:3000/auth/login", queryData);
                localStorage.setItem('token', response.data.token);
                this.$store.commit("loggin", response.data.data);
				await this.$router.push("/");
			} catch (e) {
                this.invalidData = true;
            }
        }


    }
</script>

<style scoped>
    #login-card {
        padding: 1% 4.5%;
        margin: 20px 30% 5% 30%;
    }
    .error {
        background-color: red;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;
    }
</style>
