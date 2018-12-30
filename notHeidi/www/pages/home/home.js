import {
    MDCRipple
} from '@material/ripple';
import {
    MDCDialog
} from '@material/dialog';
import {
    MDCTextField
} from '@material/textfield';
export default /*@ngInject*/ function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: './pages/home/home.html',
        controller: function ($scope, $localStorage, $http) {
            if ($localStorage.myconnections == undefined) {
                $localStorage.myconnections = [];
            }
            $scope.myconnections = $localStorage.myconnections;
            const dialog = [].map.call(document.querySelectorAll('.mdc-dialog'), function (el) {
                return new MDCDialog(el);
            });
            const textField = [].map.call(document.querySelectorAll('.mdc-text-field'), function (el) {
                return new MDCTextField(el);
            });
            $scope.toggleNewConnection = function () {
                if (dialog[0].isOpen) {
                    dialog[0].close();
                } else {
                    dialog[0].open();
                }
            }
            const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));
            $scope.saveConnection = function (data) {
                if (data !== undefined || data !== null) {
                    $localStorage.myconnections.push(data);
                    $scope.myconnections = $localStorage.myconnections;
                }
            }
            $scope.connectToDB = function (dbData) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/connect?host=' + dbData.host + '&name=' + dbData.db + '&username=' + dbData.username + '&pw=' + dbData.pw
                }).then(function successCallback(response) {
                    console.log("SUCCESS");
                    console.log(response);
                }, function errorCallback(response) {
                    console.error("FAILURE");
                    console.error(response);
                });
            }
        }
    });
}
