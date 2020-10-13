<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand">
    <a class="navbar-brand" href="#">Widget App</a>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/home">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/notes">Notes</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/weather">Weather</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/selfie">Selfie Booth</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style></style>
