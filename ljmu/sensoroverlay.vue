<template>
  <div class="sensor-overlay">
    <p>Last known position: {{ lastPosition.latitude }}, {{ lastPosition.longitude }}</p>
    <!-- Display sensor data here -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastPosition: { latitude: null, longitude: null },
    };
  },
  mounted() {
    this.fetchLastPosition();
  },
  methods: {
    fetchLastPosition() {
      // Fetch the last known position from the backend
    },
  },
};
</script>

<style scoped>
/* Tailwind classes can be used here */
</style>
