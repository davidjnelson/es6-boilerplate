require.config({
    // put both amd and browser global modules here
    paths: {
        assert: '../node_modules/rtts-assert/dist/amd/assert',
        traceur: '../bower_components/traceur-runtime/traceur-runtime',
        jquery: '../bower_components/jquery/dist/jquery'
    },
    // put any browser global modules here
    shim: {
        'traceur': {
            exports: '$traceurRuntime'
        }
    }
});

// put amd and browser global modules here so that the requirejs optimizer knows to concatenate them
require(['traceur', 'jquery'], function() {

});
