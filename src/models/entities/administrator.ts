import { DataTypes } from 'sequelize';
import connection from '../connection/connection';

const Administrator = connection.define(
  'administrator',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    codeAccess: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
  },
  { timestamps: false },
);

export default Administrator;
