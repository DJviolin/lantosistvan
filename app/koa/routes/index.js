const router = require('koa-router')();

/*router.get('/', (ctx, next) => {
  ctx.state = { title: 'koa2 title' };
  await ctx.render('index', {});
})*/

router.get('/', (ctx) => {
  ctx.body = 'Hello World!';
});

module.exports = router;
