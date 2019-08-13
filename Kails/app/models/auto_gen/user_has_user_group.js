/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userHasUserGroup', {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'user_id'
    },
    userGroupId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_group',
        key: 'id'
      },
      field: 'user_group_id'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at'
    }
  }, {
    tableName: 'user_has_user_group',
    underscored: true,
    timestamps: true
  });
};
