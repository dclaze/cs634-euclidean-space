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

    return [parseFloat(nearestSilhouetteAverage.toFixed(2)), parseFloat(farthestSilhouetteAverage.toFixed(2)), parseFloat(averageSilhouetteAverage.toFixed(2)), parseFloat(centerSilhouetteAverage.toFixed(2))];
}

var suite1 = function() {
    NEAR = 0;
    FAR = 0;
    AVERAGE = 0;
    CENTER = 0;

    A = test({
        sampleSize: 50,
        p: .2,
        D: 3,
        k: 50 / 2,
        minValue: -5,
        maxValue: 5
    });
    NEAR += A[0];
    FAR += A[1];
    AVERAGE += A[2];
    CENTER += A[3];

    B = test({
        sampleSize: 50,
        p: .4,
        D: 3,
        k: 50 / 2,
        minValue: -5,
        maxValue: 5
    });

    NEAR += B[0];
    FAR += B[1];
    AVERAGE += B[2];
    CENTER += B[3];

    C = test({
        sampleSize: 50,
        p: .6,
        D: 3,
        k: 50 / 2,
        minValue: -5,
        maxValue: 5
    });

    NEAR += C[0];
    FAR += C[1];
    AVERAGE += C[2];
    CENTER += C[3];

    console.log("Trial 1");
    console.log("=======");
    console.log("NEAREST 	FARTHEST 	AVERAGE 	CENTER");
    console.log(A[0] + "\t\t" + A[1] + "\t\t" + A[2] + "\t\t" + A[3]);

    console.log("Trial 2");
    console.log("=======");
    console.log("NEAREST 	FARTHEST 	AVERAGE 	CENTER");
    console.log(B[0] + "\t\t" + B[1] + "\t\t" + B[2] + "\t\t" + B[3]);

    console.log("Trial 3");
    console.log("=======");
    console.log("NEAREST 	FARTHEST 	AVERAGE 	CENTER");
    console.log(C[0] + "\t\t" + C[1] + "\t\t" + C[2] + "\t\t" + C[3]);

    console.log("Averages");
    console.log("=======");
    console.log("NEAREST 	FARTHEST 	AVERAGE 	CENTER");
    console.log(NEAR / 3 + "\t\t" + FAR / 3 + "\t\t" + AVERAGE / 3 + "\t\t" + CENTER / 3);
}
