<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []
    if (icon) {
      const source = `src/assets/icon/${icon}.png`
      vnodes.push(<img src={source} />)
    }

    if (title) {
      vnodes.push(
        <span class='title-router' slot='title'>
          {title}
        </span>
      )
    }
    return vnodes
  }
}
</script>

<style lang="scss" scoped>
.title-router {
  margin-left: 10px;
  font-size: 15px;
}
</style>
