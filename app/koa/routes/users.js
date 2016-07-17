const router = require('koa-router')();

router.get('/', (ctx, next) => ctx.body = 'this a users response!');

module.exports = router;
