import firebase from 'firebase';
import _ from 'lodash';
import winston from 'winston';

let logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'error'
    }),
    new (winston.transports.File)({
      filename: "firebase-error.log",
      level: "info"
    })
  ]
});

class DbFirebase {
  getAll(tableName) {
    return new Promise((resolve, reject) => {
      try {
        let dbItems = firebase.database().ref(tableName);

        dbItems.once('value').then((snaps) => {
          /* resolve */
          var snapsValues = snaps.val();
          let result = [];
          for (let itemId in snapsValues) {
            result.push(_.assign({
              _id: itemId
            }, snapsValues[itemId]));
          }
          resolve(result);

        }, (reason) => {
          /* reject */
          logger.error(reason);
          reject(reason);
        });
      } catch (err) {
        logger.error(err);
        reject(err);
      }
    });
  }

  pushItem(tableName, item) {
    return new Promise((resolve, reject) => {
      try {
        let itemsRef = firebase.database().ref(tableName);
        itemsRef.push(item, function onPushItemComplate(reason) {
          if (reason) {
            /* reject */
            logger.error(reason);
            reject(reason);
          } else {
            /* resolve */
            resolve();
          }
        });
      } catch (err) {
        logger.error(err);
        reject(err);
      }
    });
  }
}

export default new DbFirebase();