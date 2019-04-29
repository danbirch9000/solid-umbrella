<template>
  <v-app id="inspire">
    <v-toolbar color="white" light fixed app clipped-right>
      <v-toolbar-side-icon @click.stop="left = !left"></v-toolbar-side-icon>
      <v-toolbar-title
        ><img src="/assets/images/saveswiftlogo.png" width="200px"
      /></v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="left" temporary fixed>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Saveswift
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="goToUrl(item.url)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout()">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container grid-list-md>
        <v-layout justify-center>
          <v-flex>
            <nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    drawerRight: false,
    right: null,
    left: null,
    items: [
      { title: "Goals", icon: "show_chart", url: "/goals/" },
      { title: "Accounts", icon: "account_balance", url: "/accounts/" }
    ]
  }),
  methods: {
    goToUrl(url) {
      this.$router.push(url);
    },
    logout() {
      this.$store.dispatch("LOGOUT");
    }
  }
};
</script>
