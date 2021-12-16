import {createStore} from "vuex";
import {postModule} from './postModule';
import {countCategories} from './countCategories';

export default createStore( {
    state: {
        isAuth: false,
    },
    modules: {
        post: postModule,
        category: countCategories,
    }
})
