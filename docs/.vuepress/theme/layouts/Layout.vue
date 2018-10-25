<template>
  <div
    class="theme-container"
    :class="[
      { 'doc-mode': !isHomepage },
      { 'start-mode': isInitializing },
      { 'preview-mode': $page.frontmatter.previewLink },
      ...pageClasses
    ]"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <router-link :to="$localePath" id="logo"></router-link>
    <router-link :to="$localePath" v-text="$siteTitle" tag="h1"></router-link>

    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />

    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    ></div>

    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <slot
        name="sidebar-top"
        slot="top"
      />
      <slot
        name="sidebar-bottom"
        slot="bottom"
      />
    </Sidebar>

    <template v-if="$page.frontmatter.home"/>

    <transition name="content-fade" appear v-else>
      <Page :sidebar-items="sidebarItems">
        <slot
          name="page-top"
          slot="top"
        />
        <slot
          name="page-bottom"
          slot="bottom"
        />
      </Page>
    </transition>

    <Previewer/>
    <Intro/>

    <footer class="footer"
      v-if="$themeConfig.footer || $themeLocaleConfig.footer"
      v-html="$themeConfig.footer || $themeLocaleConfig.footer">
    </footer>
  </div>
</template>

<script>
import 'focus-visible';
import OfficialLayout from '@vuepress/theme-default/layouts/Layout';
import Intro from '../components/Intro';
import Previewer from '../components/Previewer';

export default {
  extends: OfficialLayout,
  data() {
    return {
      isInitializing: true,
    };
  },
  computed: {
    isHomepage() {
      return this.$page.frontmatter.home;
    },
  },
  mounted() {
    setTimeout(() => {
      this.isInitializing = false;
    }, 10);
  },
  components: {
    Intro,
    Previewer,
  },
};
</script>

<style lang="stylus">
@require '../styles/button'
@require '../styles/config'

body
  font 16px/1.42857 PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif
  background-color $c-bg

.theme-container
  // override layout styles in default theme
  .navbar
    transition all 0.3s
    border-bottom-color transparent

    .home-link
      margin-left 5px
      padding-right 40px
      pointer-events none
      visibility hidden

    .links,
    .sidebar-button
      transition all 0.3s

  .sidebar
    @media (min-width $mq-mobile + 1)
      width $s-sidebar-width * 0.82
      background $c-bg

    @media (min-width $mq-narrow + 1)
      width $s-sidebar-width

  .page
    @media (min-width $mq-mobile + 1)
      padding-left $s-sidebar-width * 0.82

    @media (min-width $mq-narrow + 1)
      padding-left $s-sidebar-width

    .content:not(.custom),
    .page-edit,
    .page-nav
      margin-left 0

  // custom layout styles
  .previewer
    position absolute
    z-index 10
    top $s-header-height + 10
    right 100% - $s-home-divide-ratio
    margin-right $s-home-middle-gap
    transition all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)
    transform-origin right bottom

    @media (max-width 1080px)
      margin-right ($s-home-middle-gap / 4)

    @media (max-width $mq-narrow)
      visibility hidden
      opacity 0
      transform scale(0)

  #logo
    position absolute
    z-index 21
    top 90px
    left $s-home-divide-ratio
    display inline-block
    margin-left 216px + $s-home-middle-gap
    width 200px
    height 200px
    background url('../assets/images/logo.png') no-repeat center/100%

    @media (max-width 1080px)
      margin-left 191px + ($s-home-middle-gap / 4)

    @media (max-width $mq-narrow)
      left 50%
      margin-left 0
      transform translateX(-50%)

    @media (max-width $mq-mobile)
      top 60px
      width 150px
      height 150px

    + h1
      position absolute
      z-index 21
      top 260px
      left $s-home-divide-ratio
      margin-left 164px + $s-home-middle-gap
      color $c-basic
      font-size 32px
      white-space nowrap

      @media (max-width 1080px)
        margin-left 140px + ($s-home-middle-gap / 4)

      @media (max-width $mq-narrow)
        left 50%
        margin-left 0
        transform translateX(-50%)

      @media (max-width $mq-mobile)
        top 200px
        font-size 26px

    &,
    + h1
      transition all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)

  .intro-container
    position absolute
    z-index 1
    top 316px
    left $s-home-divide-ratio
    margin-left $s-home-middle-gap
    transition all 0.3s
    transition-delay 0.6s

    @media (max-width 1080px)
      margin-left ($s-home-middle-gap / 4)

    @media (max-width $mq-narrow)
      left 50%
      margin-left 0
      transform translateX(-50%)
      transition-delay 0.3s

    @media (max-width $mq-mobile)
      top 250px

  .footer
    margin-top 800px
    padding 15px 0
    text-align center
    background-color #fff
    transition all 0.3s

    @media (max-width $mq-mobile)
      margin-top 1250px

    @media (max-width $mq-mobile-narrow)
      margin-top 1300px

    p
      margin 0
      color lighten($c-basic-light, 15%)
      font-size 14px

  &:not(.doc-mode)
    .navbar
      background transparent

      .links,
      .sidebar-button
        opacity 0
        visibility hidden
        transform translateY(10px)

    .sidebar
      visibility hidden
      opacity 0
      transform translateX(-30px)

  &.doc-mode
    .navbar,
    .navbar .links,
    .navbar .sidebar-button,
    #logo,
    #logo +h1,
    .previewer
      transition-delay 0.3s

    @media (max-width $mq-narrow)
      #logo,
      #logo +h1
        transition-delay 0s

    .sidebar
      transition all 0.3s
      transition-delay 0.6s

    .navbar
      box-shadow 0 0 8px rgba($c-basic, 0.15)

    #logo
      position fixed
      top 6px
      left $s-edge-gap
      margin-left 0
      width 46px
      height 46px

      @media (max-width $mq-narrow)
        top 9px
        width 40px
        height 40px
        transform none

      @media (max-width $mq-mobile)
        opacity 0
        visibility hidden

      + h1
        position fixed
        top 3px
        left $s-edge-gap + 60
        margin 12px 0 0
        font-size 22px

        @media (max-width $mq-narrow)
          top 6px
          left $s-edge-gap + 50
          font-size 18px
          transform none

        @media (max-width $mq-mobile)
          left $s-edge-gap + 40

    .previewer
      position fixed
      right $s-edge-gap
      margin-right 0

    .intro-container
      opacity 0
      visibility hidden
      transform translateY(30px)
      transition-delay 0s

      @media (max-width $mq-narrow)
        transform translate(-50%, 30px)

    .footer
      margin-top -80px
      opacity 0
      visibility hidden

  &.no-sidebar
    .sidebar
      @media (min-width $mq-mobile + 1)
        display block !important
        visibility hidden
        pointer-events none

  &:not(.preview-mode)
    .previewer
      opacity 0
      visibility hidden
      transform scale(0)

  &.preview-mode
    @media (min-width $mq-narrow + 1)
      .page
        margin-right $s-preview-width + $s-edge-gap

// content transition
.content-fade-enter-active,
.content-fade-leave-active
  transition: all 0.3s

.content-fade-enter,
.content-fade-leave-to
  opacity 0
  visibility hidden

.content-fade-enter
  transform: translateY(20px)

.doc-mode:not(.start-mode) .content-fade-enter-active
  transition-delay 0.6s
</style>
