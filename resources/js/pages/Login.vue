<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form @submit.prevent="loginUser">
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
                            <div class="form-group row mb-0">
                                <button type="submit" class="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import useAuth from '../composables/auth'

export default {
    setup() {
        const form = reactive({
            'email': '',
            'password': '',
        })
        const { login, getAuthenticated, getUser, errors } = useAuth()

        const loginUser = async () => {
            await login({...form});
        }

        return {
            loginUser,
            form,
            errors,
            getAuthenticated,
            getUser
        }
    }
}
</script>
