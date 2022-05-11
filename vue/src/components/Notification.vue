<template>
    <div
        v-if="notificaton.show"
        class="fixed w-[300px] left-4 bottom-4 py-2 px-4 text-white animate-fade-in-down"
        :class="[notificaton.type === 'success' ? 'bg-emerald-500' : 'bg-red-500']"
    >
        {{ notificaton.message }}
    </div>
</template>

<script setup>

import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const  notificaton = computed(()=> store.state.notification);
</script>

<style >

</style>
