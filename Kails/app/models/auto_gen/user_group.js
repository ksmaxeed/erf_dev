/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userGroup', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
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
    },
    groupName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'group_name'
    }
  }, {
    tableName: 'user_group',
    underscored: true,
    timestamps: true
  });
};
