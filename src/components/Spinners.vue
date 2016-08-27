<template>
  <h3>Spinners</h3>
  <div class="warning-prompt" v-show="$parent.docVersion < 1">
    Warning: This feature only can be used in 1.0 version and above!
  </div>
  <p>You can choose your favorite spinner as loading animation by <code>spinner</code> property:</p>
  <pre>
&lt;infinite-loading spinner=&quot;{ spinner name }&quot;&gt;
&lt;/infinite-loading&gt;</pre>
  <h4>Available spinners</h4>
  <p>The button's name is available spinner name, and you can preview all available spinners on the right by clicking on the following buttons.</p>
  <button v-for="spinner in availableSpinners"
          v-text="spinner"
          :class="{
            active: currentSpinner === spinner
          }"
          @click="changeSpinner(spinner)"></button>
</template>
<script>
  export default {
    data() {
      return {
        availableSpinners: ['bubbles', 'circles', 'default', 'spiral', 'waveDots'],
        currentSpinner: 'default',
      };
    },
    methods: {
      changeSpinner(spinner) {
        this.currentSpinner = spinner;
        this.$parent.$dispatch('$demoPhone:changeSpinner', spinner);
      },
    },
  };
</script>
