require.config({
    paths: {
        assert: '../node_modules/rtts-assert/dist/amd/assert',
        traceur: '../bower_components/traceur-runtime/traceur-runtime'
    },
    // put any non amd or es6 module code that needs to run first here
    shim: {
        'traceur': {
            exports: '$traceurRuntime'
        }
    }
});

// load traceur runtime before entry point
require(['traceur'], function() {
    require(['main'], function() {

    });
});
