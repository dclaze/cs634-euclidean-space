var test = function(params) {
    var S = generateRandomVectors(params.sampleSize, params.minValue, params.maxValue);
    var outliers = findOutliers(S, params.p, params.D);
    var Sprime = S.remove(outliers);

    var baseClusters = vectorsToClusters(Sprime);
    var nearest = groupClusters(baseClusters, getNearest, params.k);
    var farthest = groupClusters(baseClusters, getFarthest, params.k);
    var average = groupClusters(baseClusters, getAverage, params.k);
    var center = groupClusters(baseClusters, getCenter, params.k);

    var nearestSilhouetteAverage = getSilhouetteCoefficient(nearest).average();
    var farthestSilhouetteAverage = getSilhouetteCoefficient(farthest).average();
    var averageSilhouetteAverage = getSilhouetteCoefficient(average).average();
    var centerSilhouetteAverage = getSilhouetteCoefficient(center).average();

    console.log(nearestSilhouetteAverage, farthestSilhouetteAverage, averageSilhouetteAverage, centerSilhouetteAverage);
}

var suite1 = function() {
    test({
        sampleSize: 300,
        p: .2,
        D: 3,
        k: 300 / 2,
        minValue: -5,
        maxValue: 5
    });

    test({
        sampleSize: 300,
        p: .4,
        D: 3,
        k: 300 / 2,
        minValue: -5,
        maxValue: 5
    });

    test({
        sampleSize: 300,
        p: .6,
        D: 3,
        k: 300 / 2,
        minValue: -5,
        maxValue: 5
    });
}
