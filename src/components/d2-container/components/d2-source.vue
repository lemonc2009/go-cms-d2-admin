<template>
  <div
    v-if="show"
    class="d2-source"
    :class="{ 'd2-source--active': isActive }"
    @click="handleClick">
    <d2-icon name="code"/> 本页源码
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: false,
      path: ''
    }
  },
  computed: {
    show () {
      return this.$env.VUE_APP_SCOURCE_LINK === 'TRUE'
    }
  },
  watch: {
    $route: {
      handler (to) {
        const pathFromMeta = this._.get(this._.last(to.matched), 'meta.source')
        const pathFromComponent = this._.get(this._.last(to.matched), 'components.default.__source')
        this.path = pathFromComponent || pathFromMeta
      },
      immediate: true
    }
  },
  mounted () {
    // 一秒后显示按钮
    setTimeout(() => {
      this.isActive = true
    }, 500)
  },
  methods: {
    // 点击按钮的时候跳转到源代码
    handleClick () {
      this.$open(`${this.$env.VUE_APP_REPO}/blob/master/${this.path}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.d2-source {
  $borderRadius: 4px;
  $paddingLR: 15px;
  $paddingTB: 7px;
  $fontSize: 12px;
  $rightOuter: calc($paddingLR / 2);
  opacity: 0;
  position: fixed;
  z-index: 9999;
  right: - $borderRadius - $rightOuter;
  bottom: 20px;
  font-size: $fontSize;
  line-height: $fontSize;
  font-weight: bold;
  border-radius: $borderRadius;
  padding: $paddingTB $paddingLR;
  padding-right: calc($borderRadius + $paddingLR);
  background-color: rgba(#000, .7);
  border: 1px solid #000;
  color: #FFF;
  transition: all .3s;
  @extend %unable-select;
  &.d2-source--active {
    opacity: 1;
  }
  &:hover {
    right: - $borderRadius;
    background-color: rgba(#000, .9);
  }
}
</style>
