// Karma configuration
// Generated on Sat Feb 07 2015 17:45:05 GMT-0800 (PST)

/*
 Install NodeJS (run in sudo)
 npm install -g karma-cli
 npm install -g karma --save-dev
 npm install -g phantomjs
 npm install -g karma-jasmine --save-dev
 npm install -g karma-phantomjs-launcher --save-dev
 npm install -g karma-chrome-launcher --save-dev
 npm install -g karma-coverage
*/

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            "test/test.js"
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "test/test.js": ['coverage']
        },

        //coverageReporter: {
        //    type: 'text'
        //},
        //coverageReporter: {
        //    type: 'text',
        //    file: 'output.txt'
        //},
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        //reporters: ['progress'],
        reporters: ['progress', 'coverage'],



        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // Change to debug when you are facing some errors
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
