_        = require('lodash')
rando  	 = require('random-js')
keypress = require('keypress')

codes = (prng, num) ->
  return _.map(_.range(num), prng)

# returns a list of n random numbers given seed s 
codes_from_seed = (s, n) ->
	mt = rando.engines.mt19937()
	mt.seed(s)
	return codes(mt, n)

num_codes = 3
seed      = 15035263

codes     = codes_from_seed(seed, num_codes)
cur_code  = 0
getCode   = () => codes[cur_code % num_codes]
nextCode  = () => cur_code = cur_code+1

 
d = require('dnode').connect(5004)
d.on('remote', (remote) =>
	try_key = () =>
		c = getCode()
		remote.check(c, () ->
			console.log('DID IT!!!!!!!', c)
			nextCode())
	keypress(process.stdin)
	process.stdin.on('keypress', try_key))


