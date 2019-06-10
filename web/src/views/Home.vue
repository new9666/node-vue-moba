<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/a81465de0bce25f22add0f4d700ec04f.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/ef3b14fe0609665cfeb55aa1b8cda211.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/d8b05318c118db4d988e94a3fd7da3b0.jpeg" alt>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right pb-2 px-3" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-2"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <m-list-card title="新闻中心" icon="menu" :categories="newsCats">
      <template #items="{category}">
        <div class="py-2" v-for="(news, i) in category.newsList" :key="i">
          <span>[{{news.categoryName }}]</span>
          <span>{{news.title}}</span>
          <span>{{news.date}}</span>
        </div>
      </template>
    </m-list-card>

    <m-list-card title="英雄列表" icon="card-hero" :categories="newsCats">
      <template #items="{}"></template>
    </m-list-card>
    <!-- end of news card  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      swiperSlides: [1, 2, 3, 4, 5],
      newsCats: [
        {
          name: "热门",
          newsList: new Array(5).fill({}).map(v => ({
            categoryName: "公告",
            title: "王者大陆的端午宝藏活动公告",
            date: "06/01"
          }))
        },
        {
          name: "新闻",
          newsList: new Array(5).fill({}).map(v => ({
            categoryName: "新闻",
            title: "王者大陆的端午宝藏活动公告",
            date: "06/01"
          }))
        },
        {
          name: "公告",
          newsList: new Array(5).fill({}).map(v => ({
            categoryName: "公告",
            title: "王者大陆的端午宝藏活动公告",
            date: "06/01"
          }))
        },
        {
          name: "活动",
          newsList: new Array(5).fill({}).map(v => ({
            categoryName: "活动",
            title: "王者大陆的端午宝藏活动公告",
            date: "06/01"
          }))
        },
        {
          name: "赛事",
          newsList: new Array(5).fill({}).map(v => ({
            categoryName: "赛事",
            title: "王者大陆的端午宝藏活动公告",
            date: "06/01"
          }))
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "../scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    background: #ffffff;
    border-radius: 0.1538rem;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 0.0769rem solid $border-color;
  border-bottom: 0.0769rem solid $border-color;
  .nav-item {
    width: 25%;
    border-left: 0.0769rem solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}
</style>
