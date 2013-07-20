#!/usr/bin/env node
var n = require('numeral');

function calcPayments(inputs) {
    //Assigning the input to the variables P, r, N
    P = inputs[0];
    r = inputs[1];
    N = inputs[2];

    //Converting strings to floats
    P = parseFloat(P);
    r = parseFloat(r);
    N = parseFloat(N);

    //Print back the inputs
    console.log('Principal       = ' + n(P).format('0,0.00'));
    console.log('Interest        = ' + n(r).format('0.00%'));
    console.log('Tenor(in years) = ' +  n(N).format('0'));

    // R = 1 +r
    R = 1 + r;
    console.log('r   = ' + r);
    console.log('R   = ' + R);

    //Calculate and print EMI
    EMI              = (P * Math.pow(R, N)) * (1 - R) / (1 - Math.pow(R, N));
    console.log('EMI = ' + EMI);

    //Setting up arrays to hold the tabular period by period info
    var principalPerPeriod      = [P];
    var interestPerPeriod       = [r];
    var interestAmountPerPeriod = [principalPerPeriod[0] * interestPerPeriod[0]];
    var installmentPerPeriod    = [EMI];
    var repaymentPerPeriod      = [installmentPerPeriod[0] - interestAmountPerPeriod[0]];

    //Populate the array values
    for (i=1; i < N; i++) {
	principalPerPeriod[i] = principalPerPeriod[i-1] - repaymentPerPeriod[i-1];
        interestPerPeriod[i] = r;
        interestAmountPerPeriod[i] = principalPerPeriod[i] * interestPerPeriod[i]; 
	installmentPerPeriod[i] = EMI;
        repaymentPerPeriod[i] = installmentPerPeriod[i] - interestAmountPerPeriod[i];
    }

    //Printing the output table
    outrowHeader = ['Period', 'Principal', 'Interest', 'Principal Repayment', 'Interest Payment', 'EMI'];
    console.log(outrowHeader.join('\t'));

    for (i=0; i < N; i++) {
	outrowArray = [i+1,
		n(principalPerPeriod[i]).format('0,0.00'),
		n(interestPerPeriod[i]).format('0.00%'),
		n(repaymentPerPeriod[i]).format('0,0.00'),
		n(interestAmountPerPeriod[i]).format('0,0.00'),
		n(installmentPerPeriod[i]).format('0,0.00')];
	console.log(outrowArray.join('\t'));
    }
}

if(require.main == module) {
    console.error('Invoked at command line.');
    var inputs = process.argv;
    if(inputs.length > 2) {
        inputs = inputs.slice(2, inputs.length);
    } else {
        inputs = undefined;
    }
    calcPayments(inputs);
} else {
    console.error('Invoked via library call');
}
