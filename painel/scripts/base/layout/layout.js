'use strict';

(function() {
    function config($stateProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    '@': {
                        templateUrl: 'views/layout/layout.html'
                    },
                    'header@app': {
                        templateUrl: 'views/layout/header.html'
                    },
                    'sidebar@app': {
                        templateUrl: 'views/layout/sidebar.html',
                        controller: 'sidebarController'
                    }
                }
            });
    }

    config.$inject = ['$stateProvider'];


    /**
     * ativaApp.base.layout Module
     *
     * Description
     */
    angular.module('ativaApp.base.layout', [])

    .config(config);
})();
