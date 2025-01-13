'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Add the column without NOT NULL
    await queryInterface.addColumn('Users', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'), // Add current timestamp for existing rows
    });

    // Step 2: Alter the column to include NOT NULL constraint
    await queryInterface.changeColumn('Users', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Step to undo the migration: remove the column
    await queryInterface.removeColumn('Users', 'createdAt');
  },
};
