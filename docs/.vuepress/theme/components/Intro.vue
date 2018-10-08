<template>
  <div class="intro-container">
    <p>An infinite scroll plugin for Vue.js</p>
    <router-link
      class="button button-large button-basic"
      :to="'/guide/'"
      tag="button">
      Get Started
    </router-link>
    <button class="button button-large">View GitHub</button>
    <ul class="feat-list">
      <li>
        <h3>Out of the box</h3>
        BalabalaBalabalaBalabalaBalabala
      </li>
      <li>
        <h3>2-direction support</h3>
        BalabalaBalabalaBalabalaBalabala
      </li>
      <li>
        <h3>Result display</h3>
        BalabalaBalabalaBalabalaBalabala
      </li>
    </ul>
  </div>
</template>

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
