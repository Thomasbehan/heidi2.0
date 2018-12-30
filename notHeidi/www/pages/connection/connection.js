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
    $routeProvider.when("/connection/:databaseId", {
        templateUrl: './pages/connection/connection.html',
        controller: function ($scope, $localStorage, $http, $routeParams) {
            console.log("connection");
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
            $scope.tables = [];
            $scope.connect = $scope.myconnections[$routeParams.databaseId];
            $http({
                method: 'GET',
                url: 'http://localhost:3000/query?host=' + $scope.connect.host + '&name=' + $scope.connect.db + '&username=' + $scope.connect.username + '&pw=' + $scope.connect.pw + '&sqlQuery=SELECT * FROM information_schema.tables WHERE TABLE_SCHEMA = \'' + $scope.connect.db + '\';'
            }).then(function successCallback(response) {
                $scope.tables = response.data;
                console.log($scope.tables);
            }, function errorCallback(response) {
                console.error(response);
            });
            $scope.connectToDB = function (dbData) {
                console.log(dbData);
                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/connect?host=' + dbData.host + '&name=' + dbData.db + '&username=' + dbData.username + '&pw=' + dbData.pw
                }).then(function successCallback(response) {
                    console.log("dbData");
                }, function errorCallback(response) {
                    console.error(response);
                });
            }
        }
    });
}
