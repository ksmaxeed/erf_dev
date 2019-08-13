import models from '../../models';

export default {

  list: async (ctx, _next) => {
    const body = ctx.request.body;

    const user = await models.user.findByPk(1, {
      include: [{
        model: models.userBook,  // 子テーブルを示す
        required: false           // true で INNER JOIN (false で OUTER JOIN)
      }]
    });

    ctx.body = {
      user
    };
  },

  addBook: async (ctx, _next) => {
    const body = ctx.request.body;
    const user = await models.user.findByPk(1);
    const userBookModel = {
      userId: user.id,
      bookName: body.bookName
    };
    models.userBook.create(userBookModel);
    ctx.body = 'ok';
  },

  deleteBook: async (ctx, _next) => {
    const body = ctx.request.body;

    const user = await models.user.findByPk(body.userId, {
      include: [{
        model: models.userBook,  // 子テーブルを示す
        required: false,          // true で INNER JOIN (false で OUTER JOIN)
        where: {id: body.userBookId}
      }]
    });

    if (user.userBooks.length > 0){
      user.userBooks[0].destroy();
      ctx.body = 'ok';
    } else {
      ctx.body = 'not found';
    }
  },

  init: async (ctx, _next) => {
    const userCount = await models.user.count();
    if (userCount > 0) {
      ctx.body = 'already initialized.';
      return;
    }

    const user1 = await models.user.create({userName: '里村'});

    const userBookModel = {
      userId: user1.id,
      bookName: 'キャッチャー イン ザ ライ'
    };
    const userBookModel2 = {
      userId: user1.id,
      bookName: 'Men and Alcohol'
    };

    models.userBook.create(userBookModel);
    models.userBook.create(userBookModel2);

    ctx.body = 'initialized';
  }
};


