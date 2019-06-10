<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{'active': active === i}"
        v-for="(category, i) in categories"
        :key="i"
      >
        <div class="nav-link" @click="active = i">{{category.name}}</div>
      </div>
    </div>
    <div class="pt3">
      <swiper>
        <swiper-slide v-for="(category, n) in categories" :key="n">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true }
  }
};
</script>

<style>
</style>
