import { DataTypes } from 'sequelize';
import connection from '../connection/connection';
import Contact from './contact';

/* CRIANDO ENTIDADE */

const User = connection.define(
  'user',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
        len: [6, 255],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
        len: [6, 255],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
        len: [6, 255],
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    codeAccess: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false },
);

User.hasMany(Contact, {
  as: 'contacts',
  foreignKey: 'userId',
});

connection.sync();

export default User;
