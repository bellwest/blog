const { SSL_OP_MICROSOFT_SESS_ID_BUG } = require("constants");

let postId = 1;

const posts = [
  {
    id: 1,
    title: 'title',
    body: 'body',
  },
];

/*
POST /api/posts
{ title, body }
*/
exports.write = ctx => {
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

/*
GET /api/posts
*/
exports.list = ctx => {
  ctx.body = posts;
};

/*
GET /api/posts/:id
*/
exports.read = ctx => {
  const { id } = ctx.params;
  const post = posts.find(p => p.id.toString() === id);
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: 'post does not exist',
    };
    return;
  }
  ctx.body = post;
};

/*
DELETE /api/posts/:id
*/
exports.remove = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (!index) {
    ctx.status = 404;
    ctx.body = {
      message: 'post does not exist',
    };
    return;
  }
  posts.splice(index, 1);
  ctx.status = 204;
}

/*
PUT /api/posts/:id
{ title, body }
*/
exports.replace = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (!index) {
    ctx.status = 404;
    ctx.body = {
      message: 'post does not exist',
    };
    return;
  }
  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

/*
PATCH /api/posts/:id
{ title, body }
*/
exports.update = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (!index) {
    ctx.status = 404;
    ctx.body = {
      message: 'post does not exist',
    };
    return;
  }
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};