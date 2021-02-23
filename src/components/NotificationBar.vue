<template>
    <div :class="notificationTypeClass">
        <p>{{ $t(notification.message) }}</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
        notification: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            timeout: null
        }
    },
    computed: {
        notificationTypeClass() {
            return `NotificationBar-${this.notification.type}`;
        }
    },
    mounted() {
        this.timeout = setTimeout(() => this.remove(this.notification), 2000);
    },
    beforeDestroy() {
        clearTimeout(this.timeout);
    },
    methods: mapActions('notification', ['remove'])
}
</script>

<style scoped>
.NotificationBar-success {
    margin: 1em 0 1em;
    border-radius: 0.5rem;
    display: table;
    text-align: center;
    width: 15rem;
    height: 3rem;
    background-color: #1EB10F;
}

.NotificationBar-success p {
    vertical-align: middle;
    display: table-cell;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.NotificationBar-error {
    margin: 1em 0 1em;
    border-radius: 0.5rem;
    display: table;
    text-align: center;
    width: 20rem;
    height: 3rem;
    background-color: #C10E0E;
}

.NotificationBar-error p {
    vertical-align: middle;
    display: table-cell;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>