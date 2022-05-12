<template>
    <PageComponent>
        <div class="py-5 px-8">
            <div v-if="loading" class="flex justify-center">Loading...</div>
            <div class="container mx-auto text-left">
                <div class="grid grid-cols-6 items-start">
                    <div class="mr-4">
                        <img :src="surveyAnswers.image"  alt="test" />
                    </div>
                    <div class="col-span-5">
                        <h1 class="text-3xl mb-3">{{ surveyAnswers.title }}</h1>
                        <p class="text-gray-500 text-sm" v-html="surveyAnswers.description"></p>
                    </div>
                </div>
                <hr class="my-3">
                <div class="ml-3" v-for="(surveyAnswer,index) in surveyAnswers.question_answers" :key="surveyAnswer.id">
                    <h3 class="text-xl mb-3">{{ index+1 }}. {{ surveyAnswer.question }}</h3>
                    <p class="">{{ surveyAnswer.answer }}</p>
                </div>
            </div>
        </div>

    </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import {useRoute} from "vue-router";
const route = useRoute();
const store = useStore();

 const loading = computed(() => store.state.surveyAnswers.loading);
 const surveyAnswers = computed(() => store.state.surveyAnswers.data);

store.dispatch("getSurveyById", route.params.id);

</script>
