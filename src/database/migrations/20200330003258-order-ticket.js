module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_tickets', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      total_price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      unit_price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      quantity: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('order_tickets');
  }
};
