# Lenders Mortgage Insurance calculator

[![Build Status](https://travis-ci.org/hongymagic/lmi.png)](https://travis-ci.org/hongymagic/lmi)

Node module for calculating lenders mortgage insurance (LMI) in Australia.

# Install

```javascript
> npm install lmi --save
```

# Example

```javascript
var calculator = require('lmi');
var lmi = calculator(0.90, 680000);
// 22508
```

# Contribution

1. Write tests
2. Enable editorconfig or local .vimrc support, make sure whitespaces/code
conventions are the same
3. Make sure tests pass
