import Router from 'koa-router';
import userList from '../controllers/user';

const router = Router({
  prefix: '/api'
});

router.post('/user/init', userList.init);
router.post('/user/list', userList.list);
router.post('/user/book/add', userList.addBook);
router.post('/user/book/delete', userList.deleteBook);

module.exports = router;
