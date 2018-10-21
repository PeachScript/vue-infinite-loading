<template>
  <div class="previewer">
    <a
      class="edit-link"
      target="_blank"
      v-if="!$page.frontmatter.home && $page.frontmatter.previewLink"
      :href="editLink">
      Edit in JSFiddle
    </a>
    <div class="previewer-content">
      <!-- add a wrapper to prevent overflow hidden property effect box-shadow -->
      <div class="iframe-wrapper" v-if="$page.frontmatter.previewLink">
        <iframe :src="$page.frontmatter.previewLink" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Previewer',
  computed: {
    editLink() {
      return this.$page.frontmatter.previewLink && this.$page.frontmatter.previewLink.replace(/embedded.*$/, '');
    },
  },
};
</script>

<style lang="stylus" scoped>
@require '../styles/config';

.previewer
  $ratio = 1425/700

  position relative
  width $s-preview-width
  height $s-preview-width * $ratio
  background url('../assets/images/16th-mockup.png') no-repeat center/100%

  .edit-link
    position absolute
    top 94px
    right 100%
    font-size 0.9rem
    font-weight normal
    writing-mode vertical-lr

    &:not(:hover)
      color #ccc

  .previewer-content
    $s-vertical = 28px
    $s-horizontal = 11px

    position absolute
    z-index 1
    top $s-vertical
    bottom $s-vertical
    left $s-horizontal
    right $s-horizontal
    background-color #fff
    box-shadow 0 0 0 1.5px rgba(0,0,0,0.8)
    border-radius 32px

    .iframe-wrapper
      position relative
      width 100%
      height 100%
      border-radius 32px
      overflow hidden

      iframe
        margin-top -50px
        width 100%
        height calc(100% + 50px)
</style>
