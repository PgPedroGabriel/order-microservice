module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('order_tickets', 'order_id', {
      type: Sequelize.STRING,
      references: { model: 'orders', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNul: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('order_events', 'order_id');
  }
};
