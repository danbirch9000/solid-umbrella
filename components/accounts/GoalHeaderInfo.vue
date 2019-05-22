<template>
  <div>
    <div class="value-block-wrapper">
      <div v-if="goalTarget" class="value-block">
        <span>Target: {{ goalTarget.date }}</span>
        <span>{{ goalTarget.value | currency }}</span>
      </div>
      <div
        v-if="currentValue"
        :class="{
          positive: percentageChange > 0,
          negative: percentageChange < 0
        }"
        class="value-block"
      >
        <span>Current value</span>
        <span>{{ currentValue | currency }}</span>
      </div>
      <div v-if="currentEstimatedValuation" class="value-block">
        <span>Estimated value today</span>
        <span>{{ currentEstimatedValuation.value | currency }}</span>
      </div>
      <div
        v-if="percentageChange"
        :class="{
          positive: percentageChange > 0,
          negative: percentageChange < 0
        }"
        class="value-block"
      >
        <span>Percentage difference</span>
        <span>{{ percentageChange }}%</span>
      </div>
    </div>

    <div class="goal-definition">
      {{ goal }}
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getCiForMonths } from "~/common/utilities";
export default {
  props: {
    goalData: {
      type: Object,
      default: () => {}
    },
    goalTarget: {
      type: Object,
      default: null
    },
    currentValue: {
      type: Number,
      default: null
    }
  },
  computed: {
    goal() {
      let { amount, monthly, years, rate, startDate } = this.goalData;
      years = this.$options.filters.noDecimal(years);
      startDate = moment(startDate).format("ll");
      return `Save £${monthly} per month starting with £${amount} for ${years} years at ${rate}% starting ${startDate}`;
    },
    currentEstimatedValuation() {
      let { amount, monthly, rate, startDate } = this.goalData;
      let months = moment().diff(moment(startDate), "months", true);
      return getCiForMonths(
        parseFloat(amount),
        months,
        parseFloat(monthly),
        parseFloat(rate)
      );
    },
    percentageChange() {
      if (!this.currentEstimatedValuation.value || !this.currentValue) {
        return null;
      }
      const cv = parseFloat(this.currentValue);
      const cev = parseFloat(this.currentEstimatedValuation.value);
      const decreaseValue = cv - cev;
      return parseFloat(((decreaseValue / cv) * 100).toFixed(2));
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/colors";
@import "../../assets/mixins";
.goal-definition {
  margin: 10px 0;
  background-color: $lightgrey;
  padding: 10px;
  border-radius: 5px;
  font-size: 1.1em;
  line-height: 1.6em;
}
.goal-target {
  span {
    font-size: 2em;
    color: #6ad065;
  }
}
.value-block-wrapper {
  display: grid;
  grid-column-gap: 30px;
  grid-row-gap: 4px;
  grid-template-columns: 1fr 1fr;
}
.value-block {
  span {
    display: block;
  }
  span:first-child {
    font-size: 0.8em;
  }
  span:last-child {
    font-size: 1.5em;
    color: $primary;
  }
  &.positive {
    span:last-child {
      font-size: 1.5em;
      color: $success;
    }
  }
  &.negative {
    span:last-child {
      font-size: 1.5em;
      color: $secondary;
    }
  }
}
</style>
