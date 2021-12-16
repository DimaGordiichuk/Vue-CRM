import axios from "axios";

export const countCategories = {
    state: () => ({
        categories: [],
    }),
    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        },
    },
    actions: {
        async getCategories({state, commit}) {
            let response = await axios.get('/api/categories')
            commit('setCategories', response.data.data)
        },
    },
    namespaced: true
}
