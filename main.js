angular.module("EuclideanSpace", []);

angular.module("EuclideanSpace").controller("Main", function($scope, $http) {
    $scope.S = [];
    $scope.distanceResult = [];
    $scope.params = {
        sampleSize: 500,
        p: .2,
        D: 3,
        k: 500 / 2,
        minValue: -5,
        maxValue: 5
    };

    $scope.generateSampleData = function() {
        $scope.S = generateRandomVectors($scope.params.sampleSize || 100, $scope.params.minValue || -5, $scope.params.maxValue || 5);
    };

    $scope.generateDistanceResult = function() {
        $scope.distanceResult = generateDistanceGroups(generateRandomVectors($scope.params.sampleSize || 100, $scope.params.minValue || -5, $scope.params.maxValue || 5));
    };


    $scope.filterOutliers = function() {
        var S = generateRandomVectors($scope.params.sampleSize, $scope.params.minValue, $scope.params.maxValue);
        var outliers = findOutliers(S, $scope.params.p, $scope.params.D);
        $scope.S = S.remove(outliers);
    };
    // test({
    //     sampleSize: 300,
    //     p: .2,
    //     D: 3,
    //     k: 300 / 2,
    //     minValue: -5,
    //     maxValue: 5
    // });
});
