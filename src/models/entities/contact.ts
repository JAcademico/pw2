import { DataTypes } from 'sequelize';
import connection from '../connection/connection';

const Contact = connection.define(
  'contact',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
  },
  { timestamps: false },
);

connection.sync();

export default Contact;
