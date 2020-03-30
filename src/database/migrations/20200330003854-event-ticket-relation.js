module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('order_tickets', 'order_event_id', {
      type: Sequelize.STRING,
      references: { model: 'order_events', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNul: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('order_tickets', 'order_event_id');
  }
};
