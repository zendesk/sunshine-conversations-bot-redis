'use strict';

const redis = require('redis');

class RedisLock {
    constructor(options) {
        options = options || {};
        if (options.client) {
            this.client = options.client;
        } else if (options.socket) {
            this.client = redis.createClient(options.socket, options);
        } else {
            this.client = redis.createClient(options);
        }

        if (options.pass) {
            this.client.auth(options.pass, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
    }

    acquireLock(userId) {
        return new Promise((resolve, reject) => {
            this.client.setnx(userId, 1, (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve(result === 1);
            });
        });
    }

    releaseLock(userId) {
        return new Promise((resolve, reject) => {
            this.client.del(userId, (err) => {
                if (err) {
                    return reject(err);
                }

                resolve();
            });
        });
    }
}

module.exports = RedisLock;
