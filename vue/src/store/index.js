import {createStore} from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
      dashboard: {
        loading: false,
          data: {}
      },
      currentSurvey: {
        loading: false,
          data: {}
      },
      surveys: {
        loading: false,
          data: [],
          links: [],
      },
      questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
      notification : {
        show: false,
          type: null,
          message: null
      },
      surveyAnswers: {
        loading: false,
          data: []
      },
      surveysAnswers: {
          loading: false,
          data: []
      }
  },
  getters: {},
  actions: {
      getDashboardData ({commit}) {
          commit('dashboardLoading', true)
          return axiosClient.get(`/dashboard`)
              .then((res) => {
                  commit('dashboardLoading', false)
                  commit('setDashboardData', res.data)
                  return res
              })
              .catch(error => {
                  commit('dashboardLoading', false)
                  return error
              })
      },
      getSurvey({ commit }, id) {
        commit("setCurrentSurveyLoading", true);
        return axiosClient
            .get(`/survey/${id}`)
            .then((res) => {
                commit("setCurrentSurvey", res.data);
                commit("setCurrentSurveyLoading", false);
                return res;
            })
            .catch((err) => {
                commit("setCurrentSurveyLoading", false);
                throw err;
            });
      },
      getSurveyBySlug({ commit }, slug) {
          commit("setCurrentSurveyLoading", true);
          return axiosClient
              .get(`/survey-by-slug/${slug}`)
              .then((res) => {
                  commit("setCurrentSurvey", res.data);
                  commit("setCurrentSurveyLoading", false);
                  return res;
              })
              .catch((err) => {
                  commit("setCurrentSurveyLoading", false);
                  throw err;
              });
      },
      getSurveyById({commit}, id) {
          commit("setSurveyAnswerLoading", true);
          return axiosClient
              .get(`/survey/${id}/answer`)
              .then((res) => {
                  commit("setSurveyAnswer", res.data);
                  commit("setSurveyAnswerLoading", false);
                  return res;
              })
              .catch((err) => {
                  commit("setSurveyAnswerLoading", false);
              });
      },
      saveSurvey({ commit }, survey) {
          delete survey.image_url;
        let response;
        if(survey.id) {
            response = axiosClient
                .put(`/survey/${survey.id}`, survey)
                .then((res) => {
                    commit("setCurrentSurvey", res.data);
                    return res;
                });
        } else {
            response = axiosClient.post("/survey", survey)
                .then((res) => {
                    commit("setCurrentSurvey", res.data);
                    return res;
                });
        }
      },
      deleteSurvey({}, id) {
          return axiosClient.delete(`survey/${id}`)
      },
      getSurveys({ commit }, {url = null} = {}) {
        url = url || '/survey';
        commit('setSurveysLoading', true)
        return axiosClient.get(url).then((res) => {
            commit('setSurveysLoading', false)
            commit("setSurveys", res.data);
            return res;
        })
      },
      saveSurveyAnswer({commit}, {surveyId, answers}) {
          return axiosClient.post(`/survey/${surveyId}/answer`, {answers});
      },
      getSurveysAnswersData({commit}) {
          commit('surveysAnswersLoading', true)
          return axiosClient.get(`/surveys/answers`)
              .then((res) => {
                  commit('surveysAnswersLoading', false)
                  commit('setSurveysAnswersData', res.data)
                  return res
              })
              .catch(error => {
                  commit('surveysAnswersLoading', false)
                  return error
              })
      },
      register({commit}, user) {
          return axiosClient.post('/register', user)
              .then(({data}) => {
                  commit('setUser', data);
                  return data;
              })
      },
      login({commit}, user) {
         return axiosClient.post('/login', user)
             .then(({data}) => {
                 commit('setUser', data);
                 return data;
             })
      },
      logout({commit}) {
          return axiosClient.post('/logout')
              .then(response => {
                  commit('logout')
                  return response
              })
      }
  },
  mutations: {
      logout : (state) => {
          state.user.data = {}
          state.user.token = null
          sessionStorage.removeItem('TOKEN')
      },
      setUser: (state, userData) => {
          state.user.token = userData.response.token;
          state.user.data = userData.response.user;
          sessionStorage.setItem('TOKEN', userData.response.token)
      },
      setCurrentSurveyLoading: (state, loading) => {
        state.currentSurvey.loading = loading
      },
      setCurrentSurvey : (state, survey) => {
        state.currentSurvey.data = survey.data;
      },
      setSurveysLoading: (state, loading) => {
          state.surveys.loading = loading
      },
      setSurveys : (state, surveys) => {
          state.surveys.data = surveys.data;
          state.surveys.links = surveys.meta.links;
      },
      notify: (state, {message, type}) => {
          state.notification.show = true;
          state.notification.type = type;
          state.notification.message = message;
          setTimeout(() => {
              state.notification.show = false;
          }, 3000)
      },
      dashboardLoading: (state, loading) => {
          state.dashboard.loading = loading;
      },
      setDashboardData: (state, dashboardData) => {
          state.dashboard.data = dashboardData;
      },
      setSurveyAnswerLoading: (state, loading) => {
          state.surveyAnswers.loading = loading;
      },
      setSurveyAnswer: (state, resp) => {
          state.surveyAnswers.data = resp;
      },
      surveysAnswersLoading: (state, loading) => {
        state.surveysAnswers.loading = loading;
      },
      setSurveysAnswersData: (state, SurveysAnswersData) => {
          state.surveysAnswers.data = SurveysAnswersData;
      }

  },
  modules: {}
})

export default store;
