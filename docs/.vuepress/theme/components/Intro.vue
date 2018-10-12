<template>
  <div class="intro-container">
    <p v-text="$description || 'Welcome to your VuePress site'"></p>
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

  > p
    margin 0 0 40px
    color $c-basic-light

  .button + .button
    margin-left 20px

  .feat-list
    list-style none
    display flex
    margin-top 60px
    padding 0

    li
      flex 1
      color $c-basic-light
      line-height 1.42857
      word-break break-all

      &:not(:last-child)
        margin-right 40px

      &::before
        content ''
        display block
        padding-top 57%
        background no-repeat center top/90%
        filter grayscale(50%)
        transition filter 0.3s

      &:first-child::before
        background-image url('../assets/images/icon-box.png')

      &:nth-child(2)::before
        background-image url('../assets/images/icon-dir.png')

      &:last-child::before
        background-image url('../assets/images/icon-msg.png')

      &:hover::before
        filter none

      h3
        margin 0 0 5px
        color $c-basic
        font-size 1.1rem
</style>
