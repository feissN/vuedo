<script setup lang="ts">
import type { TodoInterface } from "@/interfaces/todos.interface";
import router from "@/router";
import { computed, ref } from "vue";
import { marked } from "marked";

const props = withDefaults(defineProps<{
    todo: TodoInterface,
    size?: "small" | "big"
}>(), {
    size: "small"
})

const emit = defineEmits<{
    (event: "delete", id: string): void,
    (event: "update", todo: TodoInterface): void,
}>()

const editMode = ref(false);

const newTitle = ref(props.todo.title);
const newContent = ref(props.todo.content);

const handleSave = () => {
    emit("update", {
        ...props.todo,
        title: newTitle.value,
        content: newContent.value,
        createdAt: new Date()
    });

    editMode.value = false;
}

const markdownText = computed(() => {
    return marked(props.todo.content);
})

</script>

<template>
    <div :class="'todo-card ' + size" @click="size === 'small' && router.push(`todo/${todo.id}`)">
        <div class="title">
            <h3 v-if="!editMode">{{ todo.title }}</h3>
            <input v-if="editMode" v-model="newTitle" />
            <div class="buttons">
                <button v-if="editMode" class="apply" @click="handleSave">Save</button>
                <button v-if="editMode" class="reject" @click="editMode = !editMode">Reject</button>
                <button v-if="props.size === 'big'" class="edit" @click="editMode = !editMode"
                    :disabled="editMode">Edit</button>
                <button class="delete" @click.stop="emit('delete', todo.id)">x</button>
            </div>
        </div>

        <hr>

        <div v-if="!editMode" class="content">
            <div class="text" v-html="markdownText"></div>
            <div class="fade"></div>
        </div>
        <textarea v-if="editMode" class="content" v-model="newContent"></textarea>

        <div class="created-at">
            {{ todo.createdAt.toLocaleString() }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.todo-card {
    background-color: white;
    padding: 1rem;
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;

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

            button {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 25px;
                min-height: 25px;
            }

            .delete {
                width: 25px;
                min-width: 25px;
            }
        }
    }

    hr {
        width: 100%;
    }

    .created-at {
        margin-top: auto;
        color: gray;
        align-self: flex-end;
    }

    &.small {
        cursor: pointer;
        max-width: 300px;
        min-width: 300px;
        height: 150px;
        position: relative;
        transition: transform 200ms ease-out, box-shadow 200ms ease-out;

        .content {
            overflow: hidden;
            max-height: 90px;

            .fade {
                width: 100%;
                height: 40px;
                position: absolute;
                bottom: 3rem;
                left: 0;
                background: linear-gradient(transparent 0%, white 100%);
            }
        }

        &:hover {
            transform: scale(1.05);
            box-shadow: 0px 3px 5px black;
        }
    }

    &.big {
        min-height: calc(100vh - 11rem);

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
}

@media screen and (max-width: 360px) {
    .todo-card {

        &.big {
            .title {
                flex-direction: column;
                align-items: unset;

                .buttons {
                    justify-content: space-between;
                }
            }
        }
    }
}
</style>