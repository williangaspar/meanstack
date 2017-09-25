const Db = function (mongoose) {
  let connection = null;

  function connect(onOpen) {
    mongoose.connect('mongodb://localhost/routEasy', {useMongoClient: true}, (error) => {
      if (error) console.log(error);
    });

    connection = mongoose.connection;
  }

  function disconnect() {
    connection.disconnect();
  }

  return { connect, disconnect, mongoose };
};

module.exports = Db;
