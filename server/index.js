import Koa from "koa";
import Router from "@koa/router";
import session from 'koa-session';
import { koaBody } from 'koa-body';

const app = new Koa();
const router = new Router({
  prefix: "/api",
});

const sesKey = 'koa.sess'

app.keys = ['dGVlIGhlZQo='];
const CONFIG = {
  key: sesKey,
  maxAge: 9e4,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
  secure: false,
  sameSite: null,
};

app.use(koaBody({ json: true }))
app.use(session(CONFIG, app))

router.post("/login", async (ctx) => {
  const { username } = ctx.request.body
  ctx.session.regenerate()
  ctx.session.username = username
  ctx.session.save()
  ctx.body = {
    username
  };
  console.warn('POST /login Authorized as', username)
});

router.get("/whoami", async (ctx) => {
  console.log('whoami ctx.session', ctx.session)
  try {
    ctx.body = {
      username: ctx.session.username
    };
    console.warn('GET /whoami Welcome,', ctx.session.username)
  } catch (error) {
    console.log(error)
    ctx.status = 401
    ctx.body = {
      error: 'Unauthorised'
    }
  }
});

router.delete("/logout", async (ctx) => {
  ctx.session = null
  ctx.body = {
    done: true
  };
  console.warn('DELETE /logout Unauthorized the user')
});

app.use(router.routes());
app.listen(3000, () => {
  console.log('Listening to mini back end on port 3000')
});
