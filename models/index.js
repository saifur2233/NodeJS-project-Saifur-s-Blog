const db = require('../dbconfig/config.js');

exports.connect = async () => {
  try {
    await db.sync({ force: false });
    console.log('Database conncetion successful');
  } catch (err) {
    console.log(`Database conncetion error : ${err}`);
  }
};
