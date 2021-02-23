<template>
    <div class="NotificationContainer">
        <NotificationBar
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import NotificationBar from '@/components/NotificationBar.vue';

export default {
    components: {
        NotificationBar
    },
    computed: mapState('notification', ['notifications'])
}
</script>

<style scoped>
.NotificationContainer {
    position: fixed;
    top: 0;
    right: 0;
    padding-right: 40px;
    z-index: 10;
}
</style>