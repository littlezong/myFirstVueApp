<template>
  <button :class="`el-button el-button--default ${className}`" type="button" @click="handleClick">
      <i v-if="icon" :class="icon"></i>
      <slot> </slot>
  </button>
</template>

<script>
  // element-ui的Button组件在控制台报错，故重新封装下
  export default {
      props: {
          icon: {
              type: String,
              default: null
          },
          size: {
              type: String,
              default: 'default'
          }
      },
      data(){
          let className = '';
          switch (this.size){
              case 'medium':
                  className = 'el-button--medium';
                  break;
              case 'small':
                  className = 'el-button--small';
                  break;
              case 'mini':
                  className = 'el-button--mini';
                  break;
              default:
                  className = '';
                  break;
          }
          return {
              className
          }
      },
      methods: {
          handleClick(evt) {
              this.$emit('click', evt);
          }
      }
  }
</script>
