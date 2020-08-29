<template>
  <div class="select-component">
    <h1>Select here</h1>
    <select @change="selectCar">
      <option v-for="(car,index) in cars" :key="index" :value="car">{{car}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectComponent",
  props: {
    cars: Array,
  },
  methods: {
    selectCar(val) {
      this.$emit("update:option", val);
    },
  },
};
</script>

<style>
</style>