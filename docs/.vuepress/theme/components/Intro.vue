<template>
  <div class="intro-container">
    <p v-text="$description || 'Welcome to your VuePress site'"></p>
    <p v-if="languages.length">
      <template v-for="(lang, $index) in languages">
        <router-link :to="lang.path" v-text="lang.name"></router-link><span v-if="$index < languages.length - 1"> | </span>
      </template>
    </p>
    <router-link
      class="button button-large button-basic"
      v-if="data.actionText && data.actionLink"
      :to="data.actionLink"
      v-text="data.actionText"
      tag="button">
    </router-link>
    <a :href="repoLink" class="button button-large"
      v-if="data.GitHubText && $themeConfig.repo"
      v-text="data.GitHubText">
    </a>
    <ul class="feat-list"
      v-if="data.features && data.features">
      <li v-for="(feature, index) in data.features">
        <div class="feat-img"></div>
        <h3 v-text="feature.title"></h3>
        {{ feature.details }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return { data: {} };
  },
  watch: {
    '$page.frontmatter': {
      immediate: true,
      handler(val) {
        // only read home data
        if (val && val.home) {
          this.data = val;
        }
      },
    },
  },
  computed: {
    repoLink() {
      const link = this.$themeConfig.repo;

      return /^https?:/.test(link)
        ? link
        : `https://github.com/${link}`;
    },
    languages() {
      const locales = this.$themeConfig.$locales || this.$site.locales || [];
      const localeMapping = {
        '/': 'EN',
        'en-US': 'EN',
        '/zh/': '中文',
        'zh-CN': '中文',
      };

      return Object.keys(locales).map((path) => {
        return {
          name: localeMapping[locales[path].lang] || localeMapping[path] || path.replace(/\//g).toUpperCase(),
          path: path,
        };
      });
    },
  },
};
</script>


<style lang="stylus" scoped>
@require '../styles/config';

.intro-container
  width 640px
  text-align center

  @media (max-width 1080px)
    width 590px

  @media (max-width $mq-mobile)
    width auto

  > p
    margin 0
    color $c-basic-light

    @media (max-width $mq-mobile)
      line-height 1.28

    + p
      margin-bottom 40px

    a:not(.router-link-exact-active)
      font-weight 400
      color #aaa

    span
      color #ddd

  .button
    white-space nowrap

    @media (max-width $mq-mobile)
      margin-bottom 20px

    + .button
      @media (min-width $mq-mobile + 1)
        margin-left 20px

      @media (max-width $mq-mobile)
        margin-bottom 0

  .feat-list
    list-style none
    display flex
    margin-top 50px
    padding 0

    @media (max-width $mq-mobile)
      flex-direction column
      margin-top 40px

    li
      flex 1
      color $c-basic-light
      line-height 1.42857
      word-break break-word

      &:not(:last-child)
        @media (min-width $mq-mobile + 1)
          margin-right 40px

        @media (max-width $mq-mobile)
          margin-bottom 20px

      .feat-img
        margin 0 auto
        max-width 200px

        &::before
          content ''
          display block
          padding-top 57%
          background no-repeat center top/90%
          filter grayscale(50%)
          transition filter 0.3s

      &:first-child .feat-img::before
        background-image url('../assets/images/icon-box.png')

      &:nth-child(2) .feat-img::before
        background-image url('../assets/images/icon-dir.png')

      &:last-child .feat-img::before
        background-image url('../assets/images/icon-msg.png')

      &:hover .feat-img::before
        filter none

      h3
        margin 0 0 5px
        color $c-basic
        font-size 1.1rem
</style>
