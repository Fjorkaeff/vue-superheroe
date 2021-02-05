<template>
  <v-app>
    <NavBar />

    <v-main>
      <v-slide-y-transition mode="out-in">
        <router-view />
      </v-slide-y-transition>
    </v-main>
  </v-app>
</template>

<script>
  import NavBar from "@/components/NavBar";
  export default {
    name: "app",
    components: { NavBar },
  };
</script>