<template>
    <form @submit.prevent="createPost">
        <h4>Новий пост</h4>
            <div :class="['form-group', allerros.title ? 'has-error' : '']" >
                <label for="title" class="col-sm-4 control-label">Назва</label>
                <div class="col-sm-6">
                    <input id="title" name="title"  autofocus="autofocus" class="form-control" type="text" v-model="post.title">
                    <span v-if="allerros.title" :class="['label label-danger']">{{ allerros.title[0] }}</span>
                </div>
            </div>
            <div :class="['form-group', allerros.body ? 'has-error' : '']" >
                <label for="body" class="col-sm-4 control-label">Опис</label>
                <div class="col-sm-6">
                    <textarea id="body" name="body" class="form-control" v-model="post.body"></textarea>
                    <span v-if="allerros.body" :class="['label label-danger']">{{ allerros.body[0] }}</span>
                </div>
            </div>

        <my-button
            type="submit"
            @click="swo"
        >
            Створити пост
        </my-button>

    </form>
</template>

<script>

export default {
    data() {
        return {
            dataform: [],
            post: {
                title : '',
                body : '',
            },
            allerros: [],
        }
    },
    methods: {
        createPost(){
            this.dataform = new FormData();
            this.dataform.append('title', this.post.title);
            this.dataform.append('body', this.post.body);
            axios.post('/api/posts', this.dataform).then( response => {
                this.allerros = [];
                this.post.title = '';
                this.post.body = '';
            } ).catch((error) => {
                this.allerros = error.response.data.errors;
            });
        },
        showDialog() {
            this.dialogVisible = false;
        },
    }
}
</script>

<style scoped>
 .btn__block {
     display: flex;
     justify-content: space-between;
 }
 .label-danger {
     color: red;
 }

 .has-error input {
     border: 1px solid red;
 }
 .has-error textarea {
     border: 1px solid red;
 }
 .has-error label {
   color: red;
 }
</style>
