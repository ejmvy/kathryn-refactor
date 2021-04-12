<template>
  <!-- <transition name='appear' :duration="{ enter: 800, leave: 800 }">
        <Notification v-if='showNotification' :type='notificationType' :message='notificationMessage'></Notification>
    </transition> -->
  <div class="mainSection">
    <div class="container">
      <router-link to="/">
        <img class="homeIcon topLeft" src="https://i.ibb.co/wQLVVf3/home.png" />
      </router-link>
      <img
        @click="logoutUser"
        class="homeIcon topRight"
        src="https://i.ibb.co/Vq1Km0Y/logout.png"
      />
      <h5>User Profile</h5>
    </div>
  </div>
</template>

<script>
// import Notification from '../Designs/Notification.vue';
export default {
  data() {
    return {
      showNotification: false,
      notificationType: "",
      notificationMessage: "",
      popupInfo: {
        userName: "",
        message: "",
      },
    };
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
      this.showMessage();
    },
    showMessage() {
      this.notificationType = "success";
      this.notificationMessage = "Thanks for visiting!";
      this.showNotification = true;

      setTimeout(() => {
        this.showNotification = false;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.mainSection {
  position: absolute;
  /* z-index: 5; */
  width: 100%;
  height: 100%;
  background-color: rgba(32, 72, 88, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.homeIcon {
  width: 25px;
  height: 25px;
  position: absolute;
  cursor: pointer;
  margin: 15px;
}

.topLeft {
  left: 0;
}

.topRight {
  right: 0;
}
</style>
