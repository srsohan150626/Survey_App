<template>
<PageComponent title="View or create a survey">
    <template v-slot:header>
        <div class="flex items-center justify-between">
            <h1 class="text-3x1 font-bold text-gray-900">
                {{ model.id ? model.title : "Create a Survey" }}
            </h1>
        </div>
    </template>
    <form @submit.prevent="saveSurvey">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">

            </div>
        </div>
    </form>
</PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import {ref} from "vue";
import store from "../store";
import {useRoute} from "vue-router";

const route = useRoute();

//create empty survey
let model = ref({
    title: "",
    status: false,
    description: null,
    image: null,
    expire_date: null,
    question: []
});

if (route.params.id) {
    model.value = store.state.surveys.find(
        (s) => s.id === parseInt(route.params.id)
    );
}
</script>
