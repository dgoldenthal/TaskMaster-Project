module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        assignedTo: {
            type: DataTypes.INTEGER,
        },
        dueDate: {
            type: DataTypes.DATE,
        },
        priority: {
            type: DataTypes.ENUM('high', 'medium', 'low'),
            allowNull: false,
            defaultValue: 'medium',
        },
    });

    return Task;
};
