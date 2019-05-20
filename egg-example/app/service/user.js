const {
  data: idList
} = await this.ctx.curl(`${gitUrl}/user`, {
  data: {
    id: `"$id"`
  },
  dataType: 'json'
})