const sequelize = require('./config/database');
const {} = require('./models/Index');

sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
});