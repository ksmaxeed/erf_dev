import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import index from '../controllers';

const basename = path.basename(module.filename);
const router = Router();

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    let route = require(path.join(__dirname, file));
    router.use(route.routes(), route.allowedMethods());
  });

router.get('/', index);

export default router;
