# garage door opener

experiments in building a [rolling code](https://en.wikipedia.org/wiki/Rolling_code) in javascript

have you ever thought about how garage door openers work? or keyless entries into cars? if someone's standing by you while you unlock your lexus, couldn't an eavesdropper record the signal coming out of your key, and replay this signal later to unlock your car?

with the magic of rolling codes, we can send differnet messages (or messages over different frequencies) with each press of the button - and coordinate which key to send/listen for without trading keys often.

by transmitting a single, shared key one time, a sender can identify herself to a receiver a number of times over a potentially public channel.

rolling codes are amazingly simple. by relying on the fact that two, identical pseudorandom number generators will spit out the same numbers given the same seed, you and i can use a seed as our shared secret, then build a list of identical numbers independently. we can use these numbers to identify ourselves to one another. to an eavesdropper (someone who doesn't know our seed), the numbers we use will look perfectly random.*

*assuming a [cryptographically secure PRNG](https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator). we use the [Mersenne Twister](https://en.wikipedia.org/wiki/Mersenne_Twister) implemented in [random-js](https://www.npmjs.com/package/random-js).

# usage

use garage-door-opener to create a sender or a receiver:

```javascript
var garagedoor = require('garage-door-opener')
var my_seed    = 59823

s = garagedoor.sender(my_seed, 43)
r = garagedoor.receiver(my_seed, 43)

// sender generates the next random key
code_to_send = s.next()
// receiver makes sure this key looks good
r.check(code_to_send)
// > True

// works even if receiver misses a few messages from sender (up to 255)
s.next()
s.next()
r.check(s.next())
// > True

// good luck guessing codes if you don't know the seed!
r.check(5326294)
// > False
```

See examples/dnode_example.js for a more complete simulation.

# API

### sender

`sender(seed, start_i)`

Takes a seed (a 32-bit integer) and a code index to start at (0 by default).

Returns an object with the method `next()`, which returns the next key in its buffer.

### receiver

`receiver(seed, start_i)`

Takes a seed (a 32-bit integer) and a code index to start at (0 by default).

Returns an object with the method `check(code)`, which returns True or False depending on whether the code matches authentication criteria.

# installation

with npm do:

`npm install garage-door-opener`

# developing
 
first, `npm install`

then, `npm test`

# license

MIT
