<template>
  <div id="test">
    <h1>{{msg}}</h1>
    <img src="../assets/img/iphone8p.png" alt="">
  </div>
</template>
<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Vue&Webpack4'
      }
    }
  }
</script>

<style>
  #test {
    background: orange;
    color: #fff;
  }
</style>
