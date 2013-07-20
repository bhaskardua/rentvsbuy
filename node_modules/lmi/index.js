// A sample lenders' mortgage insurance (LMI) calculator for Australia. Please
// note that LMI will vary between lenders and this calculation should be used
// only as a sample guide.

var b1 = [0.41, 0.61, 0.76, 0.91, 1.22, 1.68, 1.89, 2.10];
var b2 = [0.52, 0.78, 0.99, 1.18, 1.60, 2.20, 2.47, 2.74];
var b3 = [0.72, 1.01, 1.25, 1.50, 2.02, 3.31, 3.56, 3.76];

//
// Number#toFixed which returns a number
function toFixed (value, precision) {
	if (precision == null) precision = 4;

	var power = Math.pow(10, precision);
	var fixed = (Math.round(value * power) / power).toFixed(precision);
	return parseFloat(fixed);
}

//
// LMI is simply a portion of the loan which is based on the loan-to-value
// ratio.
function rate (lvr, loan) {
	var band, index;

	if (loan < 300000)
		band = b1;
	else if (loan < 600000)
		band = b2;
	else if (loan < 1000000)
		band = b3;

	if (band === undefined)
		return 0;

	if (lvr > 0.8 && lvr < 0.82) {
		index = 0;
	} else if (lvr < 0.84) {
		index = 1;
	} else if (lvr < 0.86) {
		index = 2;
	} else if (lvr < 0.88) {
		index = 3;
	} else if (lvr < 0.9) {
		index = 4;
	} else if (lvr < 0.92) {
		index = 5;
	} else if (lvr < 0.94) {
		index = 6;
	} else {
		index = 7;
	}

	return toFixed(band[index] / 100, 5);
};

module.exports = function (lvr, loan, precision) {
	return toFixed(rate(lvr, loan) * loan, precision || 2);;
};
