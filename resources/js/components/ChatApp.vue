<template>
    <div class="container-chat clearfix">
        <div class="people-list" id="people-list">
            <div class="search">
                <input type="text" placeholder="search" />
                <i class="fa fa-search"></i>
            </div>
            <ul class="list">
                <li
                    @click.prevent="selectUser(user.id)"
                    class="clearfix"
                    v-for="user in userList"
                    :key="user.id"
                >
                    <div class="about">
                        <div class="name">{{ user.name }}</div>
                        <div class="status">
                            <i class="fa fa-circle online"></i> online
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="chat">
            <div class="chat-header clearfix">
                <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                    alt="avatar"
                />

                <div class="chat-about">
                    <div v-if="userMessage.user" class="chat-with">
                        Chat with {{ userMessage.user.name }}
                    </div>

                    <div class="chat-num-messages">
                        already 1 902 messages
                    </div>
                </div>
                <i class="fa fa-star"></i>
                <ul class="nav nav-tabs">
                    <li class="nav-item dropdown">
                        <a
                            href=""
                            class="nav-link dropdown-toggle"
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                            >...</a
                        >
                        <div class="dropdown-menu">
                            <a
                                @click.prevent="deleteAllMessages"
                                href=""
                                class="dropdown-item"
                                >Delete All Messages</a
                            >
                        </div>
                    </li>
                </ul>
            </div>
            <!-- end chat-header -->

            <div class="chat-history" v-chat-scroll>
                <ul>
                    <li
                        class="clearfix"
                        v-for="message in userMessage.messages"
                        :key="message.id"
                    >
                        <div class="message-data align-right">
                            <span class="message-data-time">{{
                                message.created_at | timeformat
                            }}</span>
                            &nbsp; &nbsp;
                            <span class="message-data-name">
                                {{ message.user.name }}
                            </span>
                            <i class="fa fa-circle me"></i>
                            <ul class="nav nav-tabs">
                                <li class="nav-item dropdown">
                                    <a
                                        href=""
                                        class="nav-link dropdown-toggle"
                                        data-toggle="dropdown"
                                        role="button"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        >...</a
                                    >
                                    <div class="dropdown-menu">
                                        <a
                                            @click.prevent="
                                                deleteSingleMessage(message.id)
                                            "
                                            href=""
                                            class="dropdown-item"
                                            >Delete</a
                                        >
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div
                            :class="
                                `message float-right ${
                                    message.user.id == userMessage.user.id
                                        ? 'other-message'
                                        : 'my-message'
                                }`
                            "
                        >
                            {{ message.message }}
                        </div>
                    </li>

                    <!-- <li>
                        <div class="message-data">
                            <span class="message-data-name"
                                ><i class="fa fa-circle online"></i>
                                Vincent</span
                            >
                            <span class="message-data-time"
                                >10:12 AM, Today</span
                            >
                        </div>
                        <div class="message my-message">
                            Are we meeting today? Project has been already
                            finished and I have results to show you.
                        </div>
                    </li> -->
                </ul>
            </div>
            <!-- end chat-history -->

            <div class="chat-message clearfix">
                <textarea
                    @keydown.enter="sendMessage"
                    v-model="message"
                    name="message-to-send"
                    id="message-to-send"
                    placeholder="Type your message"
                    rows="3"
                ></textarea>

                <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                <i class="fa fa-file-image-o"></i>

                <button>Send</button>
            </div>
            <!-- end chat-message -->
        </div>
        <!-- end chat -->
    </div>
    <!-- end container -->
</template>
<script>
export default {
    data() {
        return {
            message: ""
        };
    },
    mounted() {
        this.$store.dispatch("userList");
    },
    computed: {
        userList() {
            return this.$store.getters.userList;
        },
        userMessage() {
            return this.$store.getters.userMessage;
        }
    },
    created() {},
    methods: {
        selectUser(userId) {
            this.$store.dispatch("userMessage", userId);
        },
        sendMessage(e) {
            e.preventDefault();
            if (this.message != "") {
                axios
                    .post("/sendmessage", {
                        message: this.message,
                        user_id: this.userMessage.user.id
                    })
                    .then(response => {
                        this.selectUser(this.userMessage.user.id);
                    });
                this.message = "";
            }
        },
        deleteSingleMessage(messageId) {
            axios.get(`/deletesinglemessage/${messageId}`).then(response => {
                this.selectUser(this.userMessage.user.id);
            });
        },
        deleteAllMessages() {
            axios
                .get(`/deleteallmessage/${this.userMessage.user.id}`)
                .then(response => {
                    this.selectUser(this.userMessage.user.id);
                });
        }
    }
};
</script>
<style>
.people-list ul {
    overflow-y: scroll;
}
</style>
