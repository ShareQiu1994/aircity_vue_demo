<template>
  <div id="map">
    <Player />
  </div>
</template>

<script>
// @ is an alias to /src
import Player from "@/components/Player.vue";

export default {
  name: "Map",
  components: {
    Player,
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
