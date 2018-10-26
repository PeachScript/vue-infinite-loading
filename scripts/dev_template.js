module.exports = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, maximum-scale=1, minimum-scale=1, initial-scale=1, user-scalable=no, shrink-to-fit=no">
  <title>Vue-infinite-loading Testing</title>
  <script src="../node_modules/vue/dist/vue.js"></script>
  <script src="../vue-infinite-loading.js"></script>
  <style>
    body{
      margin: 0;
    }
    .item{
      margin: 0;
      padding: 0 10px;
      font-size: 14px;
      line-height: 40px;
      color: #666;
      background-color: #fafafa;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #e3e3e3;
    }
    .item::before{
      content: 'Line: ';
    }
  </style>
</head>
<body>
  <div id="app">
    <p class="item" v-for="item in list" :key="item" v-text="item"></p>
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
  <script>
    new Vue({
      el: '#app',
      data: {
        list: []
      },
      methods: {
        infiniteHandler: function ($state) {
          if (this.list.length > 100) {
            $state.complete();
          } else {
            setTimeout(function () {
              var temp = [];
              for (var i = this.list.length; i <= this.list.length + 10; i++) {
                temp.push(i);
              }

              this.list = this.list.concat(temp);
              $state.loaded();
            }.bind(this), 1000);
          }
        }
      }
    });
  </script>
</body>
</html>
`;
