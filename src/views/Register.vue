<template>
    <v-main>
        <router-link id="back" to="/">
            <v-icon style="color: #1a1a1a;">mdi-arrow-left</v-icon>
        </router-link>
        <v-card id="login-card">
            <v-card-title>Register</v-card-title>
            <v-form ref="form" v-model="form.valid" @submit.prevent="onSubmit">
                <v-card-text>
					<v-card-text class="error" v-if="invalidData">Invalid data, Email already used.</v-card-text>
                    <v-text-field color="#DB842E" v-model="form.fields.name" label="Name" :rules="form.rules.name" />
                    <v-text-field color="#DB842E" v-model="form.fields.username" label="Username" :rules="form.rules.username"/>
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
    </v-main>
</template>

<script lang="ts">
    import {Vue, Component } from 'vue-property-decorator';
    import {requiredRule, usernameRule, emailRule} from '../utils/form-rules';
	import axios from "axios";

	interface Form extends FormDefinition {
        valid: boolean;
        fields: {
            name: string;
            username: string;
            email: string;
            password: string;
        };
        rules: {
            name: ((message?: string) => {})[];
            username: ((message?: string) => {})[];
            email: ((message?: string) => {})[];
            password: ((message?: string) => {})[];
        };
    }
    @Component
    export default class Register extends Vue {
        form: Form = {
            valid: false,
            fields: {
                email: "",
                username: "",
                name: "",
                password: ""
            },
            rules: {
                email: [
                    requiredRule(),
                    emailRule()
                ],
                username: [
                    requiredRule(),
                    usernameRule()
                ],
                name: [
                    requiredRule()
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
                username: this.form.fields.username,
                password: this.form.fields.password,
                name: this.form.fields.name
            }
            try {
				await axios.post(`${this.$apiUrl}/auth/register`, queryData);
				await this.$router.push("/login");
            } catch (e) {
				this.invalidData = true;
			}
        }
    }
</script>

<style>
    #back {
        margin: 25px 0 0 25px;
        text-decoration: none;
        position: absolute;
    }

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
