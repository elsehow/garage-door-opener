_     = require('lodash')
rando = require('random-js')

codes = (prng, num) ->
  return _.map(_.range(num), prng)

# returns a list of n random numbers given seed s 
codes_from_seed = (s, n) ->
	mt = rando.engines.mt19937()
	mt.seed(s)
	return codes(mt, n)

# setup
#argv = require('minimist')(process.argv.slice(2))
#codes = codes_from_seed(argv.s, argv.n)

num_codes = 3
seed      = 15035263

codes     = codes_from_seed(seed, num_codes)
cur_code  = 0
getCode   = () => codes[cur_code % num_codes]
nextCode  = () -> cur_code = cur_code+1

server = require('dnode')({
  check: (code, cb) =>
    if code is getCode()
      console.log 'WE ARE GOOD!!!', code
      nextCode()
      cb()
})

server.listen(5004)
console.log 'listening for codes on 5004:check(code)'