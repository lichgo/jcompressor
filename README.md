# jcompressor
jcompressor is a [Closure Compliler](https://developers.google.com/closure/compiler)-based JavaScript compressor (node package) that compresses all .js files in the current directory *(JRE, Node.js and npm is required)*.

## Usage
### Install jcompressor

    npm install -g jcompressor

### Compress

1. Direct to the project folder where you would like to compress 
2. Drop into the Node REPL by executing

        node

3. Executing the line below with optimal parameters for `.compress()` function (see #API)

        require('jcompressor').compress();
    
4. Check it out :)

### API
`compress()` takes three optional parameters in order:

1. prefix: String, the prefix string added to the compressed file. `''` (empty string) by default;
2. suffix: String, the suffix string added to the compressed file. `'-min'` by default;
3. replaceOriginal: Boolean, the original files are deleted if true. `true` by default;

Take /PATH/TO/example.js as an example:  

    require('jcompressor').compress();
    //  /PATH/TO/example-min.js
    
    require('jcompressor').compress('cc-', null, false);
    //  /PATH/TO/cc-example-min.js, /PATH/TO/example.js (Still survives!)
    
    require('jcompressor').compress('', '_v1');
    //  /PATH/TO/example_v1.js


