<script setup lang="ts">
import { db } from '@/firebase.config';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { addDoc, collection } from '@firebase/firestore';
import { marked } from 'marked';
import { computed, ref } from 'vue';

const authStore = useAuthStore();

// Handle route authentication (if the current user is actually logged in)
if (!authStore.loading && !authStore.loggedIn) {
    router.push("/home")
}
authStore.$subscribe((_mutation, state) => {
    if (!state.loading && !state.loggedIn) {
        router.push("/home")
        return;
    }
});

const editMode = ref(true);

const title = ref("");
const content = ref("");

const handleSave = async () => {
    if (!authStore.user || !title.value) return;
    try {
        const todosCollection = collection(db, "todos")

        const data = {
            title: title.value,
            content: content.value,
            uid: authStore.user.uid,
            createdAt: new Date(),
        };

        const { id } = await addDoc(todosCollection, data);

        router.push(`/todo/${id}`);
    } catch (err) {
        console.error(err);
    }
}


const markdownText = computed(() => {
    return marked(content.value);
})

</script>

<template>
    <div class="create-todo">
        <div class="title">
            <input v-if="editMode" v-model="title" />
            <h3 v-else>{{ title }}</h3>
            <div class="buttons">
                <button class="apply" @click="handleSave">Create</button>
                <button class="toggle-preview" @click="editMode = !editMode">Toggle preview</button>
            </div>
        </div>

        <hr>

        <textarea v-if="editMode" class="content" v-model="content"></textarea>
        <div v-else class="content">
            <div class="text" v-html="markdownText"></div>
            <div class="fade"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.create-todo {
    background-color: white;
    padding: 1rem;
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    border: 1px solid lightgray;
    min-height: calc(100vh - 11rem);

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;

        h3 {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            align-items: center;
        }
    }

    hr {
        width: 100%;
    }

    .title {

        input {
            flex: 1;
        }
    }

    .content {
        flex: 1;
        resize: none;
    }
}

@media screen and (max-width: 360px) {
    .create-todo {
        .title {
            flex-direction: column;
            align-items: unset;

            .buttons {
                justify-content: space-between;
            }
        }
    }
}
</style>