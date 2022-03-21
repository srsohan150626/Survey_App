import {createStore} from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
    {
        id: 100,
        title: "Our first Survey",
        slug: "our-first-survey",
        status: "draft",
        image: "https://avatars.githubusercontent.com/u/6128107?s=200&v=4",
        description: "This is the description for our first servey.",
        created_at: "2022-03-15 15:00:00",
        updated_at: "2022-03-15 15:00:00",
        expiry_date: "2022-03-30 15:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From which country you are?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "nfhgfgshf32h4234-bhjb-hjbbjh",
                            text: "Bangladesh",
                        },
                        {
                            uuid: "nfhddddgshf32h4234-bhjb-hjbbjh",
                            text: "India",
                        },
                        {
                            uuid: "nfhgs333hf32h4234-bhjb-hjbbjh",
                            text: "Pakistan",
                        } ,
                        {
                            uuid: "nfhddddgshf39872h4234-bhjb-hjbbjh",
                            text: "Brazil",
                        },
                        {
                            uuid: "nfhgs333hf@#32h4234-bhjb-hjbbjh",
                            text: "Real Madrid",
                        }
                    ]
                }
            },
            {
                id: 2,
                type: "checkbox",
                question: "From which district you are?",
                description: "describe your district here.",
                data: {
                    options: [
                        {
                            uuid: "nfhgfgshf32h4234-bhjb-hjbbjh",
                            text: "Kushtia",
                        },
                        {
                            uuid: "nfhddddgshf32h4234-bhjb-hjbbjh",
                            text: "Narayanganj",
                        },
                        {
                            uuid: "nfhgs333hf32h4234-bhjb-hjbbjh",
                            text: "Dhaka",
                        } ,
                        {
                            uuid: "nfhddddgshf39872h4234-bhjb-hjbbjh",
                            text: "Pabna",
                        },
                        {
                            uuid: "nfhgs333hf@#32h4234-bhjb-hjbbjh",
                            text: "Sylhet",
                        }
                    ]
                }
            },
            {
                id: 3,
                type: "checkbox",
                question: "From which district you are?",
                description: "describe your district here.",
                data: {
                    options: [
                        {
                            uuid: "nfhgfgshf32h4234-bhjb-hjbbjh",
                            text: "Kushtia",
                        },
                        {
                            uuid: "nfhddddgshf32h4234-bhjb-hjbbjh",
                            text: "Narayanganj",
                        },
                        {
                            uuid: "nfhgs333hf32h4234-bhjb-hjbbjh",
                            text: "Dhaka",
                        } ,
                        {
                            uuid: "nfhddddgshf39872h4234-bhjb-hjbbjh",
                            text: "Pabna",
                        },
                        {
                            uuid: "nfhgs333hf@#32h4234-bhjb-hjbbjh",
                            text: "Sylhet",
                        }
                    ]
                }
            },
            {
                id: 4,
                type: "checkbox",
                question: "Which stack you like most?",
                description: "describe your stack here.",
                data: {
                    options: [
                        {
                            uuid: "nfhgfgshfghgas32h4234-bhjb-hjbbjh",
                            text: "MERN",
                        },
                        {
                            uuid: "uig67s5asthuasb-bhjb-hjbbjh",
                            text: "MEVN",
                        },
                        {
                            uuid: "536fgvghbsa-bhjb-hjbbjh",
                            text: "LAMP",
                        } ,
                        {
                            uuid: "732678tguvhg-bhjb-hjbbjh",
                            text: "LEMP",
                        }
                    ]
                }
            },
            {
                id: 5,
                type: "radio",
                question: "Which programming language you love most?",
                description: "describe your programming laguage here.",
                data: {
                    options: [
                        {
                            uuid: "bcgyf673632-bhjb-hjbbjh",
                            text: "C/C++",
                        },
                        {
                            uuid: "nfhddddgshf32h4234-jhghusgyugdas-hjbbjh",
                            text: "Java",
                        },
                        {
                            uuid: "ghsr7fdqwqw-bhjb-hjbbjh",
                            text: "PHP",
                        } ,
                        {
                            uuid: "sdsahg562n12-bhjb-hjbbjh",
                            text: "Javascript",
                        },
                        {
                            uuid: "jhg6756d@#32h4234-bhjb-hjbbjh",
                            text: "Node",
                        }
                    ]
                }
            },
            {
                id: 6,
                type: "text",
                question: "whats your favourite food?",
                description: null,
                data: {}
            },
            {
                id: 7,
                type: "text",
                question: "whats your favourite movei?",
                description: null,
                data: {}
            },
        ],

    },
    {
        id: 200,
        title: "Laravel Survey",
        slug: "laravel-survey",
        status: "draft",
        image: "https://avatars.githubusercontent.com/u/6128107?s=200&v=4",
        description: "This is the description for our laravel survey.",
        created_at: "2022-03-15 15:00:00",
        updated_at: "2022-03-15 15:00:00",
        expiry_date: "2022-03-30 15:00:00",
        questions: []
    },
    {
        id: 300,
        title: "VueJS Survey",
        slug: "VueJS-survey",
        status: "draft",
        image: "https://avatars.githubusercontent.com/u/6128107?s=200&v=4",
        description: "This is the description for our VueJS survey.",
        created_at: "2022-03-15 15:00:00",
        updated_at: "2022-03-15 15:00:00",
        expiry_date: "2022-03-30 15:00:00",
        questions: []
    },
    {
        id: 400,
        title: "Tailwind Survey",
        slug: "Tailwind-survey",
        status: "draft",
        image: "https://avatars.githubusercontent.com/u/6128107?s=200&v=4",
        description: "This is the description for our Tailwind survey.",
        created_at: "2022-03-15 15:00:00",
        updated_at: "2022-03-15 15:00:00",
        expiry_date: "2022-03-30 15:00:00",
        questions: []
    }
]

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
      surveys: [...tmpSurveys],
  },
  getters: {},
  actions: {
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
      }
  },
  modules: {}
})

export default store;
