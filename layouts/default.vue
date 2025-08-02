<template>
  <v-app >
    <v-app-bar color="primary" dark>
      <v-row class="w-100 px-4 justify-space-between" align="center" no-gutters>
        <div  class="d-flex justify-start">
          <v-toolbar-title>متجر</v-toolbar-title>
        </div>

        <div  class="d-flex justify-end">
          <NuxtLink to="/cart">
            <v-btn icon class="mx-1" color="white">
              <v-icon color="white">mdi-cart</v-icon>
            </v-btn>
          </NuxtLink>
          <NuxtLink to="/products">
            <v-btn icon class="mx-1" color="white">
              <v-icon color="white">mdi-package-variant</v-icon>
            </v-btn>
          </NuxtLink>
        </div>
      </v-row>
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup>
// لا حاجة لكود إضافي هنا حالياً
</script>

<style>
.search-box {
  min-width: 200px;
  max-width: 400px;
}

* {
    font-family: 'system-ui', sans-serif !important;
}
</style>
