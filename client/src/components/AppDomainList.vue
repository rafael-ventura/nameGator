<template>
  <div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <AppItemList
              title="Prefixos"
              type="prefix"
              v-bind:items="items.prefix"
              v-on:addItem="addItem"
              v-on:deleteItem="deleteItem"
            ></AppItemList>
          </div>
          <div class="col-md">
            <AppItemList
              title="Sufixos"
              type="sufix"
              v-bind:items="items.sufix"
              v-on:addItem="addItem"
              v-on:deleteItem="deleteItem"
            ></AppItemList>
          </div>
        </div>
        <br />
        <h5>
          Dominios <span class="badge badge-info"> {{ domains.length }}</span>
        </h5>
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="domain in domains"
                v-bind:key="domain.name"
              >
                <div class="row">
                  <div class="col-md">
                    {{ domain.name }}
                  </div>
                  <div class="col-md text-center">
                    <span
                      class="badge badge-pill badge-success"
                      v-bind:class="{ 'badge-danger': !domain.available }"
                      >{{ domain.available ? 'Disponivel' : 'Ja existe' }}</span
                    >
                  </div>
                  <div class="col-md text-right">
                    <button class="btn btn-info" @click="openDomain(domain)">
                      <span class="fa fa-search"></span>
                    </button>
                    &nbsp;
                    <a
                      class="btn btn-info"
                      v-bind:href="domain.checkout"
                      target="_blank"
                    >
                      <span class="fa fa-shopping-cart"> </span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppItemList from './AppItemList.vue';

export default {
  name: 'App',
  components: {
    AppItemList,
  },
  data: function() {
    return {};
  },
  methods: {
    ...mapActions(['addItem', 'deleteItem', 'getItem', 'generateDomains']),
    openDomain(domain) {
      this.$router.push({
        path: `/domains/${domain.name}`,
      });
    },
  },
  computed: {
    ...mapState(['items', 'domains']),
  },
  created() {},
};
</script>

<style></style>
