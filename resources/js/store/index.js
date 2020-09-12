export default {
    state: () => ({
        userList: []
    }),
    mutations: {
        userList(state, payload) {
            return state.userList = payload;
        }
    },
    actions: {
        userList(context) {
            axios.get('/userlist')
                .then(response => {
                    context.commit("userList", response.data);
                })
        }
    },
    getters: {
        userList(state) {
            return state.userList;
        }
    }
}
