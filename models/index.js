const db = require('../dbconfig/config.js');

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Database Connected');
//   })
//   .catch((err) => {
//     console.log('Error is ' + err);
//   });

exports.connect = async () => {
  console.log('hello');
  try {
    await db.sync({ force: true });
    console.log('Database conncetion successful');
  } catch (err) {
    console.log(`Database conncetion error : ${err}`);
  }
};
