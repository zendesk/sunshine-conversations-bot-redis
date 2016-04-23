'use strict';

const chai = require('chai');
chai.should();
const RedisLock = require('../').RedisLock;
const fakeredis = require('fakeredis');

describe('redis lock', function() {
    let client;

    beforeEach(() => {
        client = fakeredis.createClient();
    });

    it('constructor', function() {
        const lock = new RedisLock({
            client
        });
        lock.client.should.exist;
    });

    it('acquire lock', function() {
        const lock = new RedisLock({
            client
        });

        return lock.acquireLock('foo')
            .then((result) => {
                result.should.equal(true);
            });
    });

    it('reacquire lock', function() {
        const lock = new RedisLock({
            client
        });

        return lock.acquireLock('foo')
            .then((result) => {
                return lock.acquireLock('foo');
            })
            .then((result) => {
                result.should.equal(false);
            });
    });

    it('release lock', function() {
        const lock = new RedisLock({
            client
        });

        return lock.acquireLock('foo')
            .then(() => lock.releaseLock('foo'))
            .then(() => lock.acquireLock('foo'))
            .then((result) => {
                result.should.equal(true);
            });
    });
});
