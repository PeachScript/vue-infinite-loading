<template>
  <div class="container" :class="{
      'getting-started': isGettingStarted
    }">
    <div class="header">
      <div class="logo-wrapper">
        <img src="./assets/images/logo.png" alt="LOGO" class="logo" v-link="'/'">
      </div>
      <h1>Vue-infinite-loading</h1>
    </div>
    <div class="side-menu">
      <div class="version-select">
        Doc version:
        <span class="select-wrapper">
          <select v-model="docVersion">
            <optgroup label="For Vue.js 2.0">
              <option value="2.01">v2.0</option>
              <option value="2.00">v2.0-rc</option>
            </optgroup>
            <optgroup label="For Vue.js 1.0">
              <option value="1.3">v1.3</option>
              <option value="1.2">v1.2</option>
              <option value="1.1">v1.1</option>
              <option value="1">v1.0</option>
              <option value="0">v0.3</option>
            </optgroup>
          </select>
        </span>
      </div>
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
    <div class="content">
      <div class="warning-prompt" v-show="docVersion < 2">
        Notice: This version only can be used with <strong>Vue.js 1.0</strong>, if you want to use this plugin with Vue.js 2.0, <a href="javascript:;" @click="docVersion = 2.01">switch to v2.0</a>.
      </div>
      <div class="warning-prompt" v-show="docVersion >= 2">
        Notice: This version only can be used with <strong>Vue.js 2.0</strong>, if you want to use this plugin with Vue.js 1.0, <a href="javascript:;" @click="docVersion = 1.3">switch to v1.3</a>.
      </div>
      <router-view></router-view>
    </div>
    <div class="info-wrapper">
      <div class="logo-wrapper">
        <img src="./assets/images/logo.png" alt="LOGO" class="logo">
      </div>
      <h1>
        Vue-infinite-loading
        <small>An infinite scroll plugin for Vue.js</small>
        <span>Currently v{{ currentVersion }}</span>
      </h1>
      <ul>
        <li>Mobile friendly</li>
        <li>Compatible with any scrollable element</li>
        <li>Diverse spinners as loading animation</li>
        <li>Support result display after loading</li>
        <li>Support two direction load</li>
      </ul>
      <div class="handle-bar">
        <a class="highlight" v-link="{ name: 'installation' }">Get started !</a>
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
        docVersion: 2.01,
        currentVersion: process.env.VERSION,
      };
    },
    computed: {
      isGettingStarted() {
        return this.$route.name !== undefined;
      },
      sideMenus() {
        const menus = [];
        routes.forEach((route) => {
          if (route.version === undefined || route.version <= this.docVersion) {
            menus.push(route);
          }
        });

        return menus;
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
    @header-height: 90px;
    position: relative;
    min-height: 810px;
    overflow: hidden;
    .header{
      padding-left: 40px;
      height: @header-height;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255,255,255,.3);
      transform: translateY(-@header-height);
      opacity: 0;
      transition: all .3s @a-normal;
      .logo-generator(60px);
      .logo-wrapper{
        float: left;
        margin: 10px 20px 0 0;
        img{
          cursor: pointer;
        }
      }
      h1{
        margin: 0;
        padding-top: 20px;
        font-size: 36px;
        font-weight: normal;
        color: #eee;
        text-shadow: 2px 3px 0 rgba(0,0,0,.2);
      }
    }
    .demo-wrapper{
      position: absolute;
      top: @header-height + 30px;
      right: 100% - @g-banner-divider;
      transition: right .7s @a-normal;
    }
    .info-wrapper{
      position: absolute;
      display: inline-block;
      top: @header-height + 30px;
      left: @g-banner-divider;
      padding: 40px 60px 0;
      transition: opacity .3s, visibility .3s;
      transition-delay: .5s;
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
        margin-top: 40px;
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
          background-color: transparent;
          cursor: pointer;
        }
        a:hover, button:hover{
          color: rgba(255,255,255,.9);
        }
        a:active, button:active{
          color: @c-deep-vue;
          background-color: #eee;
        }
        .highlight{
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
            color: #fff;
            background-color: darken(@c-vue, 5%);
            border-color: darken(@c-vue, 5%);
          }
        }
      }
    }
    .side-menu{
      position: absolute;
      top: @header-height + 1;
      left: 0;
      bottom: 0;
      padding: 0 20px;
      border-right: 1px solid rgba(255,255,255,.3);
      opacity: 0;
      visibility: hidden;
      transform: translateX(-20px);
      transition: all .3s @a-normal;
      .version-select{
        margin: 0 -20px;
        padding: 8px 20px;
        font-size: 14px;
        line-height: 20px;
        color: #fff;
        background-color: rgba(255,255,255,.1);
        border-bottom: 1px solid rgba(255,255,255,.3);
        .select-wrapper{
          position: relative;
          display: inline-block;
          background-color: @c-vue;
          &:hover{
            background-color: lighten(@c-vue, 5%);
          }
          &:after{
            @size: 4px;
            content: '';
            position: absolute;
            z-index: 0;
            top: 50%;
            right: 5px;
            margin-top: -@size/2 + 1;
            border: @size solid transparent;
            border-top-color: #fff;
          }
          select{
            position: relative;
            z-index: 1;
            padding: 0 5px 0 10px;
            color: #fff;
            border: 0;
            background-color: transparent;
            appearance: none;
            outline: none;
            cursor: pointer;
          }
        }
      }
      ul{
        list-style: none;
        padding-left: 20px;
        li{
          a{
            color: #eee;
            font-size: 16px;
            text-decoration: none;
            &.v-link-active{
              color: @c-vue;
            }
          }
          ul li a{
            color: #ccc;
            font-size: 14px;
          }
        }
      }
      > ul {
        padding-left: 0;
      }
    }
    .content{
      margin-left: 240px;
      margin-right: 430px;
      color: #eee;
      transform: translateY(50px);
      opacity: 0;
      transition: all .3s @a-normal;
      h3{
        font-size: 24px;
        line-height: 20px;
        color: #fff;
      }
      h4{
        margin: 40px 0 10px;
        font-size: 20px;
        line-height: 16px;
        color: #fff;
      }
      a{
        color: #eee;
        &:hover{
          color: #fff;
        }
        &:active{
          color: #ddd;
        }
      }
      code{
        padding: 1px 5px;
        background-color: rgba(255,255,255,.05);
        border: 1px solid rgba(255,255,255,.3);
      }
      pre{
        padding: 10px;
        font-size: 14px;
        line-height: 18px;
        background-color: rgba(255,255,255,.05);
        border: 1px solid rgba(255,255,255,.3);
      }
      p{
        font-size: 16px;
        line-height: 28px;
      }
      ol{
        line-height: 24px;
      }
      button{
        position: relative;
        margin-right: 10px;
        padding: 10px 20px;
        color: #fff;
        font-size: 16px;
        background-color: @c-vue;
        border: 0;
        cursor: pointer;
        &:hover{
          background-color: lighten(@c-vue, 5%);
        }
        &:active{
          background-color: darken(@c-vue, 5%);
        }
        &.active:before{
          content: '';
          position: absolute;
          right: 0;
          bottom: 0;
          border: 14px solid transparent;
          border-right-color: #fff;
          border-bottom-color: #fff;
        }
        &.active:after{
          content: '✔';
          position: absolute;
          right: 3px;
          bottom: 0;
          color: @c-vue;
          font-size: 14px;
        }
      }
      .warning-prompt{
        padding: 5px 10px;
        font-size: 14px;
        color: #F18D4B;
        background-color: #FFEDD6;
        a{
          color: #F16B03;
        }
      }
    }
    &.getting-started{
      .info-wrapper{
        opacity: 0;
        visibility: hidden;
        transition-delay: 0s;
      }
      .demo-wrapper{
        right: 100px;
        transition-delay: .1s;
      }
      .side-menu{
        opacity: 1;
        transform: translateX(0);
        visibility: visible;
        transition-delay: .55s;
      }
      .header, .content{
        opacity: 1;
        transform: translateY(0);
        transition-delay: .55s;
      }
    }
  }
  @keyframes logo{
    0%{
      transform: rotate(0deg);
    }
    20%{
      transform: rotate(-120deg);
    }
    100%{
      transform: rotate(-120deg);
    }
  }
</style>
