<template>
  <router-view class="constrain-width" />
  <footer-component />
</template>
<script>
import { defineComponent } from "vue";
import jwtDecode from "jwt-decode";
import FooterComponent from "components/Interface/Footer";

export default defineComponent({
  name: "App",
  components: {
    FooterComponent,
  },
  created() {

    let darkmodeFromLocalStorage = localStorage.getItem("darkMode");

    if (
      darkmodeFromLocalStorage === "true" ||
      darkmodeFromLocalStorage === true ||
      darkmodeFromLocalStorage === null
    ) {
      darkmodeFromLocalStorage = true;
    } else {
      darkmodeFromLocalStorage = false;
    }

    this.$q.dark.set(darkmodeFromLocalStorage);

    const token = window.localStorage.getItem("token");
    if (token) {
      this.$store.dispatch("auth/me").then((response) => {
        const token = response.data.data.token;
        const decoded = jwtDecode(token);

        this.$store.commit("auth/SET_USER", decoded);

        if (!decoded.active) {
          this.$router.push("/auth/confirm-email");
          return;
        }

        window.localStorage.setItem("token", token);
      });
    }
  },
});
</script>
