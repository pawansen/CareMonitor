module.exports = (sequelize, Sequelize) => {
  const HeartRates = sequelize.define(
    'heart_rate',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      measurement: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      on_date: {
        type: 'DATETIME',
        allowNull: false,
      },
      create_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      }
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  )

  return HeartRates
}
