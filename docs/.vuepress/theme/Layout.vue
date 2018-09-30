<template>
  <div
    class="theme-container"
    :class="[{ 'doc-mode': !isHomepage }, ...pageClasses]"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <router-link :to="$localePath" id="logo"></router-link>
    <h1 v-text="$siteTitle"></h1>

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

    <div
      class="custom-layout"
      v-if="$page.frontmatter.layout"
    >
      <component :is="$page.frontmatter.layout"/>
    </div>

    <Page
      v-else
      :sidebar-items="sidebarItems"
    >
      <slot
        name="page-top"
        slot="top"
      />
      <slot
        name="page-bottom"
        slot="bottom"
      />
    </Page>

    <Previewer/>
    <Intro/>

    <SWUpdatePopup :updateEvent="swUpdateEvent"/>
    <footer class="footer">
      <p>Released under the MIT License</p>
      <p>&copy;2016-present Made with ♥ under Vuepress by PeachScript</p>
    </footer>
  </div>
</template>

<script>
import 'focus-visible';
import OfficialLayout from 'vuepress/lib/default-theme/Layout';
import Intro from './components/Intro';
import Previewer from './components/Previewer';

export default {
  extends: OfficialLayout,
  computed: {
    isHomepage() {
      return this.$page.frontmatter.home;
    },
  },
  components: {
    Intro,
    Previewer,
  },
};
</script>

<style lang="stylus">
@require './styles/button';
@require './styles/config';

.theme-container
  .previewer
    position absolute
    z-index 100
    top $s-header-height + 10
    right 100% - $s-home-divide-ratio
    margin-right $s-home-middle-gap
    transition all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)

  #logo
    position absolute
    z-index 100
    top 100px
    left $s-home-divide-ratio
    display inline-block
    margin-left 216px + $s-home-middle-gap
    width 200px
    height 200px
    background url('./assets/images/logo.png') no-repeat center/100%

    + h1
      position absolute
      z-index 100
      top 280px
      left $s-home-divide-ratio
      margin-left 164px + $s-home-middle-gap
      color $c-basic
      font-size 32px

    &,
    + h1
      transition all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)

  .navbar
    transition all 0.3s

    .home-link
      display none

    .links
      transition all 0.3s

  .intro-container
    position absolute
    z-index 10
    top 346px
    left $s-home-divide-ratio
    margin-left $s-home-middle-gap
    transition all 0.3s
    transition-delay 0.6s

  .footer
    margin-top 700px
    padding 15px 0
    text-align center
    background-color #fff
    transition all 0.3s

    p
      margin 0
      color lighten($c-basic-light, 15%)
      font-size 14px

  &:not(.doc-mode)
    .navbar
      background transparent

      .links
        opacity 0
        visibility hidden
        transform translateY(10px)
  &.doc-mode
    #logo
      top 5px
      left $s-edge-gap
      margin-left 0
      width 50px
      height 50px
      transition-delay 0.3s

      + h1
        top 2px
        left $s-edge-gap + 60
        margin 12px 0 0
        font-size 24px
        transition-delay 0.3s

    .previewer
      position fixed
      right $s-edge-gap
      margin-right 0
      transition-delay 0.3s

    .intro-container
      opacity 0
      visibility hidden
      transform translateY(30px)
      transition-delay 0s

    .footer
      opacity 0
      visibility hidden
</style>
