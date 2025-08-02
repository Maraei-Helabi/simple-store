<template>
  <v-app >
    <v-app-bar color="primary" dark>
      <v-row class="w-100 px-4" align="center" no-gutters>
        <v-col cols="3" class="d-flex justify-start">
          <v-toolbar-title>متجر بسيط</v-toolbar-title>
        </v-col>
        <v-col cols="6" class="d-flex justify-center">
          <v-text-field
            density="compact"
            hide-details
            variant="outlined"
            placeholder="ابحث عن منتج..."
            prepend-inner-icon="mdi-magnify"
            class="search-box"
          />
        </v-col>
        <v-col cols="3" class="d-flex justify-end">
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
        </v-col>
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
</style>
