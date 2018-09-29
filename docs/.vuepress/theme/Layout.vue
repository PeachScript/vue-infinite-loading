<template>
  <div>
    <header>
      <div class="container">
        <router-link :to="{ path: '/' }" id="logo"></router-link>
        <h1>Vue-infinite-loading</h1>
      </div>
    </header>
    <main class="container">
      <previewer class="previewer"></previewer>
      <div class="intro-container">
        <p>An infinite scroll plugin for Vue.js</p>
        <button class="button button-large button-basic">Get Started</button>
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
    </main>
  </div>
</template>

<script>
import 'focus-visible';
import Previewer from './Previewer';

export default {
  components: {
    Previewer,
  }
};
</script>

<style lang="less">
@import './less/button.less';

body {
  margin: 0;
  font: 16px/1.42857 PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
  background-color: #f9fbfd;
}
</style>

<style lang="less" scoped>
@import './less/variables.less';

.container {
  margin: 0 auto;
  width: 1200px;
}

header .container,
main.container {
  position: relative;
}

#logo {
  position: absolute;
  z-index: 10;
  top: 10px;
  left: 50%;
  margin-left: -600px;
  display: inline-block;
  width: 60px;
  height: 60px;
  background: url('./assets/images/logo.png') no-repeat center/100%;

  + h1 {
    position: absolute;
    top: 10px;
    left: 50%;
    margin: 12px 0 0 -520px;
    z-index: 10;
    color: @c-basic;
    font-size: 24px;

  }

  &,
  + h1 {
    transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &.router-link-active {
    top: 100px;
    left: 38%;
    margin-left: 236px;
    width: 200px;
    height: 200px;

    + h1 {
      top: 280px;
      left: 38%;
      margin-left: 179px;
      font-size: 32px;
    }
  }
}

.previewer {
  position: absolute;
  z-index: 10;
  top: 80px;
  right: 62%;
  margin-right: 20px;
}

.intro-container {
  position: absolute;
  z-index: 10;
  left: 38%;
  margin-top: 338px;
  margin-left: 20px;
  width: 640px;
  text-align: center;

  > p {
    margin: 0 0 40px;
    color: @c-basic-light;
  }

  .button + .button {
    margin-left: 20px;
  }

  .feat-list {
    list-style: none;
    display: flex;
    margin-top: 60px;
    padding: 0;

    li {
      position: relative;
      padding-top: 120px;
      flex: 1;
      color: @c-basic-light;
      word-break: break-all;

      &:not(:last-child) {
        margin-right: 20px;
      }

      &::before {
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        padding-top: 80%;
        background: no-repeat center top/90%;
        filter: grayscale(50%);
        transition: filter 0.3s;
      }

      &:first-child::before {
        background-image: url('./assets/images/icon-box.png');
      }

      &:nth-child(2)::before {
        background-image: url('./assets/images/icon-dir.png');
      }

      &:last-child::before {
        background-image: url('./assets/images/icon-msg.png');
      }

      &:hover::before {
        filter: none;
      }

      h3 {
        margin: 0 0 5px;
        color: @c-basic;
      }
    }
  }
}
</style>
