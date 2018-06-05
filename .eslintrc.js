module.exports = {
    "extends": "eslint:recommended",
	"env": {
		"es6": true,
        "browser":true
	},
	rules: {
    	"indent": ["error", 2],
        "semi": [1, "always"],
        "no-multiple-empty-lines": [2, {"max": 2, "maxEOF": 1}],
        "no-console":1,
	},
    
	"plugins":[
	]
};