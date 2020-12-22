<template>
  <div>
    <div class="container">
      <div class="text-left">
        <router-link to="/domains">Voltar</router-link>
        <br />
        <br />
        <br />
        <div class="card">
          <div class="card-body">
            <h2>{{ domain }}</h2>
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="domain in domains"
                v-bind:key="domain.extension"
              >
                <div class="row">
                  <div class="col-md">
                    {{ domain.extension }}
                  </div>
                  <div class="col-md text-center">
                    <span
                      class="badge badge-pill badge-success"
                      v-bind:class="{ 'badge-danger': !domain.available }"
                      >{{ domain.available ? 'Disponivel' : 'Ja existe' }}</span
                    >
                  </div>
                  <a
                    class="btn btn-info"
                    v-bind:href="domain.checkout"
                    target="_blank"
                  >
                    <span class="fa fa-shopping-cart"> </span>
                  </a>
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

export default {
  props: ['domain'],
  data() {
    return {
      domains: [],
    };
  },
  created() {
    axios({
      url: 'http://localhost:4000',
      method: 'post',
      data: {
        query: `
          mutation ($name: String){
            domains: generateDomainInfo(name: $name) {
              name,
              checkout,
              available,
              extension
            }
          }
        `,
        variables: {
          name: this.domain,
        },
      },
    })
      .then((response) => {
        const query = response.data;
        this.domains = query.data.domains;
      })
      .catch(() => {});
  },
};
</script>
