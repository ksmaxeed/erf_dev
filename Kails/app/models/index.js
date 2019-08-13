import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import {env} from '../../config/config.js';
import database from '../../config/database.js';

const config = database[env];
const basename = path.basename(module.filename);
const db = {};
const sequelize = (config.use_env_variable) ? new Sequelize(process.env[config.use_env_variable])
  : new Sequelize(config.database, config.username, config.password, config);

const entitiesDir = 'auto_gen';

/**
 *  import all models
 */
fs.readdirSync(path.join(__dirname, entitiesDir))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, entitiesDir, file));
    db[model.name] = model;
  });

/**
 *  setup
 *  belongsTo(), belongsToMany(), hasMany(), hasOne()
 *  based on references
 */
sequelize.modelManager.models.forEach(model => {

  const isJunctionTable = model.tableName.split('_has_').length === 2;
  if (isJunctionTable) {
    const tables = Object.getOwnPropertyNames(model.rawAttributes)
      .filter(attributeName => undefined !== model.rawAttributes[attributeName].references)
      .map(attributeName => {
          const refModel = sequelize.modelManager.models
            .find(testModel => testModel.tableName === model.rawAttributes[attributeName].references.model);
          return {
            model: refModel,
            through: {
              through: model,
              as: attributeName.split('Id')[0],
            }
          };
        }
      );

    console.log('────────────────────────────────────────────────');
    console.log(tables[0].model.tableName, 'n*────*m', tables[1].model.tableName);

    tables[1].model.belongsToMany(tables[0].model, tables[0].through);
    tables[0].model.belongsToMany(tables[1].model, tables[1].through);

  } else {
    Object.getOwnPropertyNames(model.rawAttributes).forEach(attributeName => {
      if (model.rawAttributes[attributeName].references) {

        const refModel = sequelize.modelManager.models
          .find(testModel => testModel.tableName === model.rawAttributes[attributeName].references.model);
        const belongsToOptions = {
          foreignKey: model.rawAttributes[attributeName].field.toString(),
          as: attributeName.split('Id')[0],
        };
        console.log('────────────────────────────────────────────────');

        const options = {};
        if (model.rawAttributes[attributeName].primaryKey) {
          console.log(refModel.tableName, '1 ──── 1', model.tableName);
          refModel.hasOne(model, options);
        } else {
          console.log(refModel.tableName, '1 ────*n', model.tableName);
          refModel.hasMany(model, options);
        }
        console.log(model.tableName, ' ──── 1', refModel.tableName);
        model.belongsTo(refModel, belongsToOptions);
      }
    });
  }
});
console.log('────────────────────────────────────────────────');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
