<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Tambah Mainan</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-input placeholder="Nama Mainan" v-model="name"></ion-input>
            <ion-textarea placeholder="Cerita Mainan" v-model="story"></ion-textarea>
            <ion-button expand="block" @click="addToy">Tambah</ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useRouter } from 'vue-router';

const name = ref('');
const story = ref('');
const router = useRouter();

const addToy = async () => {
    await addDoc(collection(db, 'toys'), { name: name.value, story: story.value });
    router.push('/home');
};
</script>
