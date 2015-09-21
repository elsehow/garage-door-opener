# garage door opener

experiments in building a [rolling code](https://en.wikipedia.org/wiki/Rolling_code) in javascript

a rolling code scheme allows a sender to authenticate herself to a receiver without coordinating on keys often. by transmitting a single, shared key one time, a sender can identify herself to a receiver a number of times (in this case, 1024 times) over a potentially public channel.

rolling codes are an amazingly simply piece of cryptography. by relying on the fact that two, identical pseudorandom number generators will spit out the same numbers given the same seed, alice and bob can use a seed as their shared secret, can build a list of pseudo-random numbers that look completely random to eavesdroppers. (assuming a [cryptographically secure PRNG](https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator) - we use the [Mersenne Twister](https://en.wikipedia.org/wiki/Mersenne_Twister) implemented in [random-js](https://www.npmjs.com/package/random-js)).

# usage

use garage-door-opener to create a sender or a receiver:

```javascript

garagedoor = require('garage-door-opener')

s = garagedoor.sender(my_seed, 43)
s.next()
> 5326294

r = garagedoor.receiver(my_seed, 43)
r.check(5326294)
> False
```

# API

Sender:

`sender(seed, start_i)`

Takes a seed (a 32-bit integer) and a code index to start at (0 by default).

Returns an object with the method `next()`, which returns the next key in its buffer.

`receiver(seed, start_i)`

Takes a seed (a 32-bit integer) and a code index to start at (0 by default).

Returns an object with the method `check(code)`, which returns True or False depending on whether the code matches authentication criteria.

# installation

with npm do:

`npm install garage-door-opener`

# license

M
