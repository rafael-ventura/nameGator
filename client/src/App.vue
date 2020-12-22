<template>
  <div>
    <div id="slogan">
      <h1>NameGator</h1>
      <br />
      <h6 class="text-secondary">Gerador de nomes utilizando Vue.js</h6>
    </div>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
//import AppDomainList from './components/AppDomainList.vue';

export default {
  name: 'App',
  components: {
    //AppDomainList,
  },
};
</script>

<style>
#slogan {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #17a2b8;
  margin-top: 60px;
}
#main {
  background-color: lightgray;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
