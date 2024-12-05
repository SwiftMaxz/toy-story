<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Register</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-input placeholder="Email" v-model="email"></ion-input>
            <ion-input placeholder="Password" type="password" v-model="password"></ion-input>
            <ion-button expand="block" @click="register">Register</ion-button>
            <ion-button expand="block" router-link="/login">Back to Login</ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const email = ref("");
const password = ref("");
const authStore = useAuthStore();

const register = async () => {
    await authStore.register(email.value, password.value);
};
</script>
