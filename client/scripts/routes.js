import { Config, Runner } from './entities';

export class RoutesConfig extends Config {
  constructor() {
    super(...arguments);

    this.isAuthorized = ['$auth', this.isAuthorized.bind(this)];
  }

  configure() {
    this.$stateProvider
      // .state('tab', {
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'client/templates/menu.html',
      })
      // .state('tab', {
      //   url: '/tab',
      //   abstract: true,
      //   templateUrl: 'client/templates/tabs.html',
      //   resolve: {
      //     user: this.isAuthorized,
      //     chats() {
      //       return Meteor.subscribe('chats');
      //     }
      //   }
      // })
      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'client/templates/login.html',
            controller: 'ChatsCtrl as chats'
          }
        }
      })
      .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'client/templates/playlists.html',
            controller: 'ChatCtrl as chat'
          }
        }
      })
      // .state('login', {
      //   url: '/login',
      //   templateUrl: 'client/templates/login.html',
      //   controller: 'LoginCtrl as logger'
      // })
      .state('confirmation', {
        url: '/confirmation/:phone',
        templateUrl: 'client/templates/confirmation.html',
        controller: 'ConfirmationCtrl as confirmation'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'client/templates/profile.html',
        controller: 'ProfileCtrl as profile',
        resolve: {
          user: this.isAuthorized
        }
      })
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'client/templates/settings.html',
            controller: 'SettingsCtrl as settings',
          }
        }
      });

    // this.$urlRouterProvider.otherwise('tab/chats');
    this.$urlRouterProvider.otherwise('app/login');
  }

  isAuthorized($auth) {
    return $auth.awaitUser();
  }
}

export class RoutesRunner extends Runner {
  run() {
    this.$rootScope.$on('$stateChangeError', (...args) => {
      const err = _.last(args);

      if (err === 'AUTH_REQUIRED') {
        this.$state.go('login');
      }
    });
  }
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
RoutesRunner.$inject = ['$rootScope', '$state'];
