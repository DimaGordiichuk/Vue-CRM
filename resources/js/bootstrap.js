window._ = require('lodash');

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')

        config.params = config.params || {}

        // if (! config.params.lang_code) {
        //     config.params['lang_code'] = window?.app?.langCode || 'uk'
        // }

        if (!token) {
            return config
        }

        config.headers['Authorization'] = `Bearer ${token}`

        return config
    },
    error => {
        return Promise.reject(error)
    },
)



