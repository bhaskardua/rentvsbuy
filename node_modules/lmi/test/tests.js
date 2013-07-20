var test = require('tap').test;
var lmi  = require('../index');

test('make sure numbers are correct', function (t) {
	function verify (lvr, loan, expected) {
		var name = '$' + loan + ' on ' + (lvr * 100).toFixed(2) + '% LVR should cost: $' + expected;
		test(name, function (t) {
			t.plan(1);
			t.equal(lmi(lvr, loan), expected, name);
		});
	}

	// $680, 000 loan with LVR of 90%
	verify(0.90, 680000, 22508);

	t.end();
});