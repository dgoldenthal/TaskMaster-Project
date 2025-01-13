'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Add the column without the NOT NULL constraint
    await queryInterface.addColumn('Users', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'), // Set default timestamp for existing rows
    });

    // Step 2: Update existing rows to ensure no NULL values
    await queryInterface.sequelize.query(`
      UPDATE "Users" SET "updatedAt" = NOW() WHERE "updatedAt" IS NULL;
    `);

    // Step 3: Alter the column to include the NOT NULL constraint
    await queryInterface.changeColumn('Users', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the column to undo the migration
    await queryInterface.removeColumn('Users', 'updatedAt');
  },
};
