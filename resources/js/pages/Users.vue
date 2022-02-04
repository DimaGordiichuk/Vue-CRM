<template>
    <div class="section no-pad-bot">
        <div class="container">
            <br><br>
            <h1 class="header center orange-text">Користувачі</h1>
            <div class="row center">
                <h5 class="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
            </div>
            <h5>Добавити користувача</h5>
            <form class="col s12" @submit.prevent="saveEvent">
                <div class="row">
                    <div :class="['input-field col s6', errors.name ? 'invalid' : '']">
                        <input
                            id="name"
                            type="text"
                            :class="['validate', errors.name ? 'invalid' : '']"
                            v-model="form.name"
                        >
                        <label for="name">Ім'я користувача</label>
                        <span v-if="errors.name" class="helper-text invalid">{{ errors.name[0] }}</span>
                    </div>
                    <div :class="['input-field col s6', errors.email ? 'invalid' : '']">
                        <input
                            id="email"
                            type="text"
                            :class="['validate', errors.email ? 'invalid' : '']"
                            v-model="form.email"
                        >
                        <label for="email">Email</label>
                        <span v-if="errors.email" class="helper-text invalid">{{ errors.email[0] }}</span>
                    </div>
                </div>
                <div class="row">
                    <button class="btn" type="submit">Зберегти</button>
                </div>
            </form>
            <div v-if="users.length > 0" class="mt">
                <div class="min-w-full border divide-y divide-gray-200">
                    <div class="table-head">
                        <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">ID</span>
                        </th>
                        <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Ім'я</span>
                        </th>
                        <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Email</span>
                        </th>
                        <th class="px-6 py-3 bg-gray-50"></th>
                    </div>
                   <user-list
                       :users="users"
                       @remove="removeUser"
                   ></user-list>
                </div>
            </div>
            <h5 v-else>Список користувачів пустий!</h5>
            <br><br>

        </div>
    </div>

</template>

<script>
import {onMounted, reactive} from "vue";
import useUsers from "../composables/users";
import UserList from "../components/users/UserList";


export default {
    components: {
        UserList
    },
    setup() {
        const { users, getUsers, errors, storeUser, destroyUser } = useUsers()

        onMounted(getUsers)

        const form = reactive({
            'name': '',
            'email': '',
        })

        const saveUser = async () => {
            await storeUser({...form});
            form.name = '';
            form.email = '';
        }

        const removeUser = async (id) => {
            await destroyUser(id);
            await getUsers();
        }

        return {
            form,
            errors,
            users,
            removeUser,
            saveUser
        }
    }
}
</script>

<style>
.input-field.invalid label{
    color: #f44336;
}
.mt {
     margin-top: 40px;
 }
.table-head {
    display: flex;
    height: 50px;
    border-bottom: 1px solid #7c858e;
}
.table-head span {
    width: 160px;
    display: flex;
    align-items: center;
}
.table-row {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #0D47A1;
    padding: 10px 0;
}
.table-row:last-child {
    border-bottom: none;
}
.td-element {
    width: 160px;
    display: flex;
    justify-content: center;
}
.action {
    display: flex;
}
</style>
