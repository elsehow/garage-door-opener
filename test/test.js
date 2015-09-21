var garagedooropener = require('..')
var test = require('tape')

var sometimes = function(fn) {
  if (Math.random() < 0.4) {
    fn()
  }
}

// random seed
prng = require('random-js').engines.mt19937()
prng.autoSeed()
seed = prng()
var start_i = Math.floor(Math.random()*100)
// make a sender and receiver with the same random seed and starting index
r = garagedooropener.receiver(seed, start_i)
s = garagedooropener.sender(seed, start_i)

trials = 5013 

test(function(t) {
  t.plan(trials)
  var check_while_sometimes_sending_randomly = function(_) {
    // sometimes simulate sending messages "accidentally"
    sometimes(function() {
      // accidentally send 1-255 "accidental" messages
      for (var i = 0; i<Math.floor(Math.random()*255); i++) {
        sometimes(s.next)
      }
    })
    // get the next message
    var n = s.next()
    return t.ok(r.check(n), 'generated sender number checks out')
  }
  for (var i = 0; i<trials; i++) {
    check_while_sometimes_sending_randomly()  
  }
})

