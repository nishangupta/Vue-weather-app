<template>
  <header class="header">
    <b-nav tabs>
      <b-nav-item disabled>
        <b>Quiz app</b>
      </b-nav-item>
      <b-nav-item disabled>Counter: {{numCorrect +'/'+ numTotal}}</b-nav-item>
    </b-nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ["numCorrect", "numTotal"],
};
</script>

<style scoped>
</style>
