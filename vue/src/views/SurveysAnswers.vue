<template>
    <PageComponent>
        <div v-if="loading" class="flex justify-center">Loading...</div>
        <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700"
        >
            <div v-if="data.surveys_answers.length">
                <div
                    v-for="answer of data.surveys_answers"
                    :key="answer.id"
                    class="block p-2 hover:bg-gray-100/90"
                >
                    <router-link :to="{ name: 'SurveyAnswerView', params: { id: answer.survey.id } }">
                        <div class="font-semibold">{{ answer.survey.title }}</div>
                    <small>
                        Answer Made at:
                        <i class="font-semibold">{{ answer.end_date }}</i>
                    </small>
                    </router-link>
                </div>
            </div>

        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import {useStore} from "vuex";
import {computed} from "vue";
const store = useStore();
const loading = computed(() => store.state.surveysAnswers.loading);
const data = computed(() => store.state.surveysAnswers.data);

store.dispatch('getSurveysAnswersData');

</script>

<style scoped>

</style>
