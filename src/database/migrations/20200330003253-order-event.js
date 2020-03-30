module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_events', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      convenience_tax: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      external_id: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('order_events');
  }
};
