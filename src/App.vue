<template>
  <div id="app">
      <transition :name="transitionName">
          <router-view></router-view>
      </transition>
  </div>
</template>

<script>
  export default {
      name: 'app',
      data(){
          return {
              transitionName: 'zoom-out'
          }
      },
      watch: {
          '$route'(to, from){
              if(from.path === '/'){
                  this.transitionName = 'zoom-in';
              }else{
                  const toDepth = to.path.split('/').length;
                  const fromDepth = from.path.split('/').length;
                  this.transitionName = toDepth < fromDepth ? 'zoom-in' : 'zoom-out';
              }
          }
      }
  }
</script>

<style lang="scss">
  /*@import './scss/lib/font-awesome/font-awesome.min.css';*/
  @import './scss/main.scss';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
