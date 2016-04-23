# Smooch Bot Redis[![Build Status](https://travis-ci.org/smooch/smooch-bot-redis.svg?branch=master)](https://travis-ci.org/smooch/smooch-bot-redis)

A state lock using redis, for use with [smooch-bot](https://github.com/smooch/smooch-bot)

```
var RedisLock = require('smooch-bot-redis').RedisLock;
var lock = new RedisLock();

lock.acquireLock('foo').then((acquired) => {
    if (acquired) {
        return lock.releaseLock('foo');
    }
});
```

## Options

  A Redis client is required.  An existing client can be passed directly using the `client` param or created for you using the `host`, `port`, or `socket` params.
  - `client` An existing client
  - `host` Redis server hostname
  - `port` Redis server portno
  - `socket` Redis server unix_socket
  - `url` Redis server url
  - `pass` Password for Redis authentication

For example:

```
var RedisLock = require('smooch-bot-redis').RedisLock;
var lock = new RedisLock({
    host: 'localhost',
    port: 6379,
});
```