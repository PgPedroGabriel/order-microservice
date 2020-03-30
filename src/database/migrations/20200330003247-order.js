module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      total_price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      tickets_price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      convenience_price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      external_user_id: {
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
    return queryInterface.dropTable('orders');
  }
};
