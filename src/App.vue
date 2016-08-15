<template>
  <div class="container" :class="{
      'getting-started': isGettingStarted
    }">
    <div class="side-menu">
      <ul>
        <li v-for="menu in sideMenus">
          <a v-link="{ name: menu.name }" v-text="menu.label"></a>
          <ul v-if="menu.navs">
            <li v-for="nav in menu.navs">
              <a v-link="{ name: nav.name }" v-text="nav.label"></a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <demo-phone></demo-phone>
    <div class="info-wrapper">
      <div class="logo-wrapper">
        <img src="https://github.com/PeachScript/vue-infinite-loading/raw/master/doc/logo.png" alt="LOGO" class="logo">
      </div>
      <h1>
        Vue-infinite-loading
        <small>An infinite scroll plugin for Vue.js</small>
        <span>Currently v0.3.1</span>
      </h1>
      <ul>
        <li>Light-weight, only 28 kb</li>
        <li>Compatible with any scrollable element</li>
        <li>Mobile friendly</li>
      </ul>
      <div class="handle-bar">
        <button @click="gettingStarted()">Getting started !</button>
        <a target="_blank" href="https://github.com/PeachScript/vue-infinite-loading">View on GitHub</a>
      </div>
    </div>
  </div>
</template>
<script>
  import { routes } from './config';
  import DemoPhone from './components/DemoPhone';

  export default {
    data() {
      return {
        isGettingStarted: false,
        sideMenus: routes,
      };
    },
    methods: {
      gettingStarted() {
        // this.isGettingStarted = true;
      },
    },
    components: {
      DemoPhone,
    },
  };
</script>
<style lang="less">
  @import './styles/variables';
  @import './styles/mixins';

  .container{
    position: relative;
    margin-top: 80px;
    min-height: 700px;
    padding-top: 20px;
    .info-wrapper{
      display: inline-block;
      margin-left: @g-banner-divider;
      padding: 40px 60px 0;
      transition: opacity .3s, visibility .3s;
      .logo-generator(120px);
      h1{
        margin: 30px 0 0;
        padding: 0;
        font-size: 36px;
        font-weight: normal;
        text-align: center;
        color: #eee;
        text-shadow: 2px 3px 0 rgba(0,0,0,.2);
        small, span{
          display: block;
          font-size: 16px;
          text-shadow: none;
          color: #ccc;
        }
        span{
          color: rgba(255,255,255,.3);
        }
      }
      ul{
        margin-top: 50px;
        padding-left: 0;
        list-style: none;
        color: #eee;
        font-size: 16px;
        line-height: 24px;
        li{
          &:before{
            content: '✔';
            color: @c-vue;
            padding-right: 5px;
          }
        }
      }
      .handle-bar{
        margin-top: 30px;
        text-align: center;
        a, button{
          margin: 20px 0;
          display: block;
          width: 100%;
          padding: 20px 12px;
          color: rgba(255,255,255,.6);
          font-size: 18px;
          line-height: 20px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.6);
          box-sizing: border-box;
        }
        a:hover{
          color: rgba(255,255,255,.9);
        }
        a:active{
          color: @c-deep-vue;
          background-color: #eee;
        }
        button{
          color: #fff;
          font-size: 22px;
          background-color: @c-vue;
          border-color: @c-vue;
          cursor: pointer;
          &:hover{
            background-color: lighten(@c-vue, 5%);
            border-color: lighten(@c-vue, 5%);
          }
          &:active{
            background-color: darken(@c-vue, 5%);
            border-color: darken(@c-vue, 5%);
          }
        }
      }
    }
    .side-menu{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      padding: 0 20px;
      border-right: 1px solid rgba(255,255,255,.3);
      opacity: 0;
      visibility: hidden;
      transform: translateX(-20px);
      transition: all .3s cubic-bezier(0.77, 0, 0.175, 1);
      transition-delay: .55s;
      ul{
        list-style: none;
        padding-left: 20px;
        li{
          a{
            color: #eee;
            font-size: 16px;
            text-decoration: none;
          }
          ul li a{
            color: #ccc;
            font-size: 14px;
          }
        }
      }
    }
    &.getting-started{
      .info-wrapper{
        opacity: 0;
        visibility: hidden;
      }
      .demo-wrapper{
        right: 10%;
      }
      .side-menu{
        opacity: 1;
        transform: translateX(0);
        visibility: visible;
      }
    }
  }
</style>
