<template>
  <nav>
    <router-link
      v-for="(nav, $index) in navs"
      :key="$index"
      v-if="!/^http/.test(nav.link)"
      v-text="nav.text"
      :to="nav.link">
    </router-link>
    <a target="_blank" :href="nav.link" v-else>{{ nav.text }}<outbound-link/></a>

    <a
      v-if="$site.themeConfig.repo"
      target="_blank"
      :href="$site.themeConfig.repo">GitHub<outbound-link/></a>
  </nav>
</template>

<script>
export default {
  computed: {
    navs() {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || [];
    },
  },
};
</script>

<style lang="less" scoped>
@import './less/variables.less';

nav {
  float: right;
  padding: 20px 0;

  a {
    color: @c-basic;
    margin-left: 35px;
    transition: font-weight 0.2s;

    &:not(:hover) {
      text-decoration: none;
    }

    &.router-link-active {
      font-weight: bold;
      color: lighten(@c-basic, 10%);
    }
  }
}
</style>
