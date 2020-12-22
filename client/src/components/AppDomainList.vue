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
import axios from 'axios/dist/axios';
import AppItemList from './AppItemList.vue';

export default {
  name: 'App',
  components: {
    AppItemList,
  },
  data: function() {
    return {
      items: {
        prefix: [],
        sufix: [],
      },
      domains: [],
    };
  },
  methods: {
    addItem(item) {
      axios({
        url: 'http://localhost:4000',
        method: 'post',
        data: {
          query: `
            mutation ($item: ItemInput) {
              newItem: saveItem(item: $item) {
                id
                type
                description
              }
            }
          `,
          variables: {
            item,
          },
        },
      }).then((response) => {
        const query = response.data;
        const newItem = query.data.newItem;
        this.items[item.type].push(newItem);
        this.generateDomains();
      });
    },
    deleteItem(item) {
      //this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
      axios({
        url: 'http://localhost:4000',
        method: 'post',
        data: {
          query: `
            mutation ($id: Int) {
              deletedPrefix: deleteItem(id: $id)
            }
          `,
          variables: {
            id: item.id,
          },
        },
      }).then(() => {
        this.items[item.type].splice(this.items[item.type].indexOf(item), 1);
        this.generateDomains();
      });
    },
    getItems(type) {
      return axios({
        url: 'http://localhost:4000',
        method: 'post',
        data: {
          query: `
            query ($type: String) {
              items : items (type: $type) {
                id
                type
                description
              }
            }
        `,
          variables: {
            type,
          },
        },
      }).then((response) => {
        const query = response.data;
        this.items[type] = query.data.items;
      });
    },
    generateDomains() {
      axios({
        url: 'http://localhost:4000',
        method: 'post',
        data: {
          query: `
              mutation {
                domains: generateDomains {
                  name
                  checkout
                  available
                }
              }
            `,
        },
      }).then((response) => {
        const query = response.data;
        this.domains = query.data.domains;
      });
    },
    openDomain(domain) {
      this.$router.push({
        path: `/domains/${domain.name}`,
      });
    },
  },
  created() {
    Promise.all([this.getItems('prefix'), this.getItems('sufix')]).then(() => {
      this.generateDomains();
    });
  },
};
</script>

<style></style>
