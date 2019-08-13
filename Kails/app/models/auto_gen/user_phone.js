/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userPhone', {
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
    phoneNumber: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'phone_number'
    }
  }, {
    tableName: 'user_phone',
    underscored: true,
    timestamps: true
  });
};
