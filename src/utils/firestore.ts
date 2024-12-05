// src/utils/firestore.ts
import { auth, db } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';

// interface data untuk mainan
export interface ToyStory {
    id?: string;
    name: string; // Nama mainan
    story: string; // Cerita unik mainan
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// operasi CRUD untuk mainan
export const firestoreService = {
    // Mendapatkan referensi koleksi mainan berdasarkan pengguna yang login
    getToyRef() {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error('User not authenticated');
        return collection(db, 'users', uid, 'toys');
    },

    // Menambahkan mainan baru ke dalam koleksi
    async addToy(toy: Omit<ToyStory, 'id'>) {
        try {
            const toyRef = this.getToyRef();
            const docRef = await addDoc(toyRef, {
                ...toy,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error Tambah Mainan:', error);
            throw error;
        }
    },

    // Mengambil daftar semua mainan dari koleksi
    async getToys(): Promise<ToyStory[]> {
        try {
            const toyRef = this.getToyRef();
            const q = query(toyRef, orderBy('updatedAt', 'desc'));
            const snapshot = await getDocs(q);
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            } as ToyStory));
        } catch (error) {
            console.error('Error Get Mainan:', error);
            throw error;
        }
    },

    // Memperbarui informasi mainan berdasarkan ID
    async updateToy(id: string, toy: Partial<ToyStory>) {
        try {
            const toyRef = this.getToyRef();
            const docRef = doc(toyRef, id);
            await updateDoc(docRef, {
                ...toy,
                updatedAt: Timestamp.now()
            });
        } catch (error) {
            console.error('Error Update Mainan:', error);
            throw error;
        }
    },

    // Menghapus mainan berdasarkan ID
    async deleteToy(id: string) {
        try {
            const toyRef = this.getToyRef();
            const docRef = doc(toyRef, id);
            await deleteDoc(docRef);
        } catch (error) {
            console.error('Error Delete Mainan:', error);
            throw error;
        }
    }
};
