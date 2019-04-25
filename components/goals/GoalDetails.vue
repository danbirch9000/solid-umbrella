<template>
  <div class="ss-panel">
    <h3>{{ goalData.description }}</h3>
  </div>
</template>

<script>

export default {
  props: {
    goalData: {
      type: Object,
      required: true
    }
  },
  computed: {}
};
</script>
