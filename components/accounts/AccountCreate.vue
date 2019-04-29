<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn fab absolute right color="primary" v-on="on">
        <v-icon dark>add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Create new account</span>
      </v-card-title>
      <v-card-text>
        <div class="standard-input">
          <label for="accountName">Name</label>
          <input id="accountName" v-model="formItems.accountName" type="text" />
        </div>
        <div class="standard-input">
          <label for="accountValue">Value</label>
          <input
            id="accountValue"
            v-model="formItems.accountValue"
            type="number"
          />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="dialog = false">Close</v-btn>
        <v-btn color="primary" @click="createAccount()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import AccountValueUpdate from "~/mixins/AccountValueUpdate";

export default {
  mixins: [AccountValueUpdate],
  data() {
    return {
      formItems: {
        accountName: "",
        accountValue: ""
      },
      dialog: false,
      loading: false
    };
  },
  computed: {
    ...mapState({
      createUserAccount: state => state.accountModule.createUserAccount,
      updateUserAccountValue: state =>
        state.accountModule.updateUserAccountValue
    }),
    isFormValid() {
      return this.formItems.accountName && this.formItems.accountValue;
    }
  },
  methods: {
    createAccount() {
      if (this.isFormValid) {
        this.$store
          .dispatch("CREATE_ACCOUNT", {
            name: this.formItems.accountName
          })
          .then(response => {
            this.formItems.accountName = "";
            this.formItems.accountValue = "";
            const payload = {
              id: response.data.name,
              value: this.formItems.accountValue,
              date: moment().format()
            };
            this.updateAccount(payload);
            this.dialog = false;
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
.account-summary--create {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr;
  @include tablet {
    grid-template-columns: 1fr 1fr auto;
  }
  @include desktop {
    grid-template-columns: 1fr 1fr auto;
  }
}
</style>
