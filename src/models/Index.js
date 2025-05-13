const sequelize = require('../config/database');
const Conflict = require('./Conflict');
const Event = require('./Event');
const KeyLocation = require('./KeyLocation');
const Party = require('./Party');
const NewsItem = require('./NewsItem');
const Source = require('./Source');

Conflict.hasMany(Event, { foreignKey: 'conflictId', onDelete: 'CASCADE' });
Event.belongsTo(Conflict, { foreignKey: 'conflictId' });

Conflict.hasMany(KeyLocation, { foreignKey: 'conflictId', onDelete: 'CASCADE' });
KeyLocation.belongsTo(Conflict, { foreignKey: 'conflictId' }); 

Conflict.hasMany(Party, { foreignKey: 'ConflictId', onDelete: 'CASCADE' });
Party.belongsTo(Conflict, { foreignKey: 'ConflictId' });

Conflict.hasMany(NewsItem, { foreignKey: 'conflictId', onDelete: 'CASCADE' });
NewsItem.belongsTo(Conflict, { foreignKey: 'conflictId' });

NewsItem.belongsTo(Source, { foreignKey: 'sourceId', onDelete: 'CASCADE' });
Source.hasMany(NewsItem, { foreignKey: 'sourceId' });

module.exports = {
    sequelize,
    Conflict,
    Event,
    KeyLocation,
    Party,
    NewsItem,
    Source
};