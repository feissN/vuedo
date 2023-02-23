<template >
    <div class="about">
        <h1>About</h1>

        <div class="explanation">
            <h4>This is</h4>
            <ul>
                <li>A simple note taking app using Vue3 (Vue + Todo = Vuedo)</li>
                <li>It is ment to be a learning experience for me coming from angular and react</li>
                <li>It uses <a href="https://firebase.google.com/" target="_blank">Firebase</a> for authentication and
                    storing of the todo items</li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .explanation {
        background-color: white;
        border-radius: 0.25rem;
        padding: 1rem;
    }
}
</style>