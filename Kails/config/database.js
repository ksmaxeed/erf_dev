const database = {
  development: {
    username: process.env.DATABASE_USERNAME_DEV || 'root',
    password: process.env.DATABASE_PASSWORD_DEV || '',
    database: process.env.DATABASE_NAME_DEV || 'monorails',
    host: process.env.DATABASE_HOST_DEV || '127.0.0.1',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  },
  test: {
    username: process.env.DATABASE_USERNAME_TEST || 'root',
    password: process.env.DATABASE_PASSWORD_TEST || '',
    database: process.env.DATABASE_NAME_TEST || 'monorails_test',
    host: process.env.DATABASE_HOST_TEST || '127.0.0.1',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  },
  production: {
    username: process.env.DATABASE_USERNAME_PRO || 'root',
    password: process.env.DATABASE_PASSWORD_PRO || '',
    database: process.env.DATABASE_NAME_PRO || 'monorails',
    host: process.env.DATABASE_HOST_PRO || '127.0.0.1',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 5,
      idle: 30000
    }
  }
};

module.exports = database;
