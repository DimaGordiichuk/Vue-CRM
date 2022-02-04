<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form class="col s12" @submit.prevent="registerUser">
                            <div class="row create-row">
                                <div :class="['input-field col s6', errors.name ? 'invalid' : '']">
                                    <input
                                        type="text"
                                        :class="['validate', errors.name ? 'invalid' : '']"
                                        v-model="form.name"
                                    >
                                    <label>Введіть ім'я</label>
                                    <span v-if="errors.name" class="helper-text invalid">{{ errors.name[0] }}</span>
                                </div>
                            </div>
                            <div class="row create-row">
                                <div :class="['input-field col s6', errors.email ? 'invalid' : '']">
                                    <input
                                        type="text"
                                        :class="['validate', errors.email ? 'invalid' : '']"
                                        v-model="form.email"
                                    >
                                    <label>Введіть email</label>
                                    <span v-if="errors.email" class="helper-text invalid">{{ errors.email[0] }}</span>
                                </div>
                            </div>
                            <div class="row create-row">
                                <div :class="['input-field col s6', errors.password ? 'invalid' : '']">
                                    <input
                                        type="password"
                                        :class="['validate', errors.password ? 'invalid' : '']"
                                        v-model="form.password"
                                    >
                                    <label>Введіть пароль</label>
                                    <span v-if="errors.password" class="helper-text invalid">{{ errors.password[0] }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <button class="btn" type="submit">Зберегти</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive} from "vue"
import useAuth from '../composables/auth'

export default {
   setup() {
       const form = reactive({
           'name': '',
           'email': '',
           'password': '',
       })
       const { register, errors, getAuthenticated } = useAuth()

       const registerUser = async () => {
           await register({...form});
       }

       return {
           registerUser,
           form,
           errors,
           getAuthenticated
       }
   },
    // beforeRouteEnter(to, from, next) {
    //     if (window.Laravel.isLoggedin) {
    //         return next('home');
    //     }
    //     next();
    // }
}
</script>
