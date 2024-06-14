<template>
  <div class="sidebar">
    <router-link to="/home" class="nav-link" exact-active-class="active">主页</router-link>
    <router-link to="/compose" class="nav-link" exact-active-class="active">发邮件</router-link>
    <router-link to="/inbox" class="nav-link" exact-active-class="active">收件箱{{ unreadCountDisplay }}</router-link>
    <router-link to="/sent" class="nav-link" exact-active-class="active">发件箱</router-link>
    <router-link to="/drafts" class="nav-link" exact-active-class="active">草稿箱</router-link>
    <router-link to="/attachments" class="nav-link" exact-active-class="active">附件箱</router-link>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SideBar',
  computed: {
    ...mapGetters(['unreadCount']),
    unreadCountDisplay() {
      return this.unreadCount > 0 ? `（${this.unreadCount}）` : '';
    },
  },
  methods: {
    ...mapActions(['fetchUnreadCount']),
  },
  mounted() {
    this.fetchUnreadCount();
  },
  watch: {
    $route(to, from) {
      if (to.path === '/inbox' || from.path === '/inbox') {
        this.fetchUnreadCount();
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 15%;
  background-color: #3a3f44;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 15px; /* 调整各链接之间的间距 */
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link:hover {
  background-color: #52575c;
}

.active {
  background-color: #1a73e8;
  color: white;
}

.nav-link.active:hover {
  background-color: #1357c1;
}

.nav-link:active {
  background-color: #1357c1;
}
</style>