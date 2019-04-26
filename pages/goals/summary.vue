<template>
  <section class="container">
    <h1>Goal summaries</h1>
    <div v-if="goals" id="goals-summary">
      <div v-for="(goal, index) in goals" :key="index" class="card">
        <ul>
          <li>{{ goal.description }}</li>
          <li>
            Save {{ goal.monthly | currency }} per month for
            {{ goal.years | year }} years starting
            {{ goal.startDate | monthAndYear }}
          </li>
          <li>
            {{ getGoalSummary(goal).value | currency }} by
            {{ getGoalSummary(goal).date }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import pageMixin from "~/mixins/pageMixin";
import utilities from "~/common/utilities.js";

export default {
  components: {},
  mixins: [pageMixin],
  middleware: ["check-auth", "auth"], // check-auth calls INIT_AUTH to make sure the user is authenticated
  computed: {
    ...mapState({
      accounts: state => state.accountModule.accounts,
      goals: state => state.goalModule.goals
    })
  },
  watch: {},
  beforeMount() {
    this.$store.commit("CLOSE_MENU");
  },
  mounted() {
    if (this.accounts.length === 0 || this.goals.length === 0) {
      this.getPageData();
    }
  },
  methods: {
    getPageData() {
      const getUserAccounts = this.$store.dispatch("GET_USER_ACCOUNTS");
      const getUserGoals = this.$store.dispatch("GET_USER_GOALS");
      return Promise.all([getUserAccounts, getUserGoals]).then(() => {
        console.log("Data got!");
      });
    },
    getGoalSummary(item) {
      const target = utilities.getFinancialData(item);
      return target[target.length - 1];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
#quick-value-card {
  margin-bottom: 10px;
}
.card {
  padding: 20px;
  background-color: #fff;
  border: 2px #e5e9f2 solid;
  border-radius: 5px;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      margin: 0;
      padding: 0;
    }
  }
}
.goal-value {
  font-size: 1.6em;
  margin: 5px 0 10px;
  display: block;
}
#goals-summary {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(1, 1fr);
  @media (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
