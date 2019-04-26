<template>
  <section>
    <Login />
    <h1 class="page-header">
      Quick savings calculator
    </h1>
    <section class="container">
      <p>
        Use our savings calculator to see how compound interest can boost your
        savings over time.
      </p>
      <NewGoal :allow-save="false" />
      <div class="text-xs-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">
              Click Me
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Privacy Policy
            </v-card-title>

            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" flat @click="dialog = false">
                I accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </section>
  </section>
</template>

<script>
import Login from "~/components/Login";
import NewGoal from "~/components/goals/NewGoal";

export default {
  components: { NewGoal, Login },
  data() {
    return {
      dialog: false
    };
  },
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/colors";
@import "../assets/mixins";

@media (min-width: 700px) {
}
</style>
