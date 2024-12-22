'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        permalink: 'user-1',
        name: 'Amit DOgra',
        email: 'dogra00amit@gmail.com',
        password: 'password1',
        enabled: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permalink: 'user-2',
        name: 'Sumit Dogra',
        email: 'dogra00sumit1.@example.com',
        password: 'password2',
        enabled: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      {
        permalink: 'user-3',
        name: 'Sahil Dogra',
        email: 'dogra00sahil.@gmail.com',
        password: 'password3',
        enabled: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        permalink: 'user-4',
        name: 'priyanka Dogra',
        email: 'dogra00pro.@example.com',
        password: 'password4',
        enabled: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        permalink: 'user-5',
        name: 'Hima Dogra',
        email: 'dogra00sdpro.@example.com',
        password: 'password5',
        enabled: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
