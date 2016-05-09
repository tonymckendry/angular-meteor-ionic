import { Controller } from '../entities';

export default class LoginCtrl extends Controller {
    constructor(){
      super(...arguments)
      // this.$scope.stuff = 'here is stuff'
      this.$scope.hideHamburger = true;
      console.log('login controller');

      this.$scope.login = function(){
        console.log('you clicked the button')
        this.$scope.modal.hide();
      }
    }

  }



LoginCtrl.$inject = ['$scope'];
