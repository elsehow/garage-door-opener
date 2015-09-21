// DNODE EXAMPLE
// in one shell, run this script with flag -r to run a receiver
// in another, run this script with -s to run a sender
// in the sender, press enter bunches of times and see what happens!!
// notice how the sender will sometimes fail to deliver the message to the receiver (simulated failure in this case), but the system goes on working!

var garagedoor = require('..')
    , argv = require('minimist')(process.argv.slice(2))
    , seed = 15035263

// nefarious function sometimes fails
var sometimes = function (fn) {
  if (Math.random() < 0.4)
    console.log('oops, nefariously failing!!!! llol')
  else
    fn()
}

// run receiver if -r
if (argv.r) {
  var r = garagedoor.receiver(seed, 0)
  var server = require('dnode')({
    check: function (code) {
      if (r.check(code)) {
        console.log('code is ok, we are autenticated.')
      }
    }
  })
  server.listen(5004)
  console.log('listening for codes on 5004:check(code)')
}

// run sender if -s
if (argv.s) {
  var s = garagedoor.sender(seed, 0)
  var d = require('dnode').connect(5004)
  d.on('remote', function (remote) {
    var send_key = function () {
      next = s.next()
      console.log('trying:', next)
      remote.check(next)
    }
    var try_key = function () {
      sometimes(send_key)
    }
    require('keypress')(process.stdin)
    process.stdin.on('keypress', try_key)
    console.log('connected to 5004.')
  })
}
