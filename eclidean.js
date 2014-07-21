var generateRandomVectors = function(numberOfPoints, minValue, maxValue) {
    numberOfPoints = numberOfPoints || 500;
    minValue = minValue || -5;
    maxValue = maxValue || 5;

    var vectors = [];
    for (var i = 0; i < numberOfPoints; i++) {
        var x = Math.random() * (maxValue - minValue) + minValue,
            y = Math.random() * (maxValue - minValue) + minValue,
            z = Math.random() * (maxValue - minValue) + minValue,
            vector = new Vector(x, y, z);

        vectors.push(vector);
    }

    return vectors;
};

var generateDistanceGroups = function(vectors) {
    var distances = [];

    var nextVector = vectors.pop();
    for (var i = 0; i < vectors.length; i++) {
        distances.push({
            distance: nextVector.distanceTo(vectors[i]),
            left: nextVector,
            right: vectors[i]
        });
    }

    if (vectors.length > 1)
        return distances.concat(generateDistanceGroups(vectors));
    else
        return distances;
};

var vectorsToClusters = function(vectors) {
    return vectors.map(function(vector) {
        return vector.asCluster();
    })
};

var getMinimumNeighborhood = function(nextVector, vectors, M, D) {
    var neighborhood = [];
    var sortedDistancesToOtherVectorsWithinRadius =
        nextVector.distancesTo(vectors)
        .sort(function(a, b) {
            return b - a;
        });
    while (sortedDistancesToOtherVectorsWithinRadius.length && neighborhood.length < (M + 1)) {
        var nextDistance = sortedDistancesToOtherVectorsWithinRadius.pop();
        if (nextDistance > D)
            break;
        neighborhood.push(nextDistance);
    }

    return neighborhood;
}

var findOutliers = function(T, p, D) {
    var N = T.length;
    var M = parseFloat((N * (1 - p)).toPrecision(15)); // FLOATING POINTS!!!!
    var vectors = T.slice(0);
    var nonOutliers = [];

    for (var i = 0; i < vectors.length; i++) {
        var nextVector = vectors[i],
            otherVectors = vectors.filter(function(vector) {
                return vector.id != nextVector.id;
            });

        var neighborhood = getMinimumNeighborhood(nextVector, otherVectors, M, D);
        if (neighborhood.length >= M)
            nonOutliers.push(nextVector);
    }

    return vectors.remove.apply(vectors, nonOutliers);
}

var groupClusters = function(clusterData, clusterMethod, k) {
    // console.time("cluster");
    var clusters = clusterData.slice(0);
    while (clusters.length > k) {
        var nearestClusterGroup = clusterMethod(clusters)[0];
        clusters.remove(nearestClusterGroup.left);
        clusters.remove(nearestClusterGroup.right);
        clusters.push(nearestClusterGroup.left.merge(nearestClusterGroup.right));
    }

    // console.timeEnd("cluster");
    return clusters;
}

var averageDistance = function(vector, otherVectors) {
    if (otherVectors.length == 0)
        return 0;

    var distances = vector.distancesTo(otherVectors);
    var sum = distances.reduce(function(a, b) {
        return a + b;
    });
    return sum / distances.length;
}

var getSilhouetteCoefficient = function(clusters) {
    var silhouetteCoefficients = [];

    if (clusters.length == 1)
        return [1];

    for (var i = 0; i < clusters.length; i++) {
        var currentCluster = clusters[i];
        for (var j = 0; j < currentCluster.vectors.length; j++) {
            var currentVector = currentCluster.vectors[j];
            var a = averageDistance(currentVector, currentCluster.vectors.excluding(currentVector));
            var b = clusters.filter(function(cluster) {
                return cluster.id != currentCluster.id;
            }).map(function(cluster) {
                return averageDistance(currentVector, cluster.vectors)
            }).min();

            var s = parseFloat(((b - a) / Math.max(a, b)).toFixed(2));

            silhouetteCoefficients.push(s);
        }
    }

    return silhouetteCoefficients;
};

var generateClusterDistanceGroups = function(clusters, distanceTransform) {
    var distances = [];

    var nextCluster = clusters.pop();
    for (var i = 0; i < clusters.length; i++) {
        distances.push({
            distance: distanceTransform(nextCluster, clusters[i]),
            left: nextCluster,
            right: clusters[i]
        });
    }

    if (clusters.length > 1)
        return distances.concat(generateClusterDistanceGroups(clusters, distanceTransform));
    else
        return distances;
};

var getNearestPointDistance = function(clusterA, clusterB) {
    var distances = clusterA.distancesTo(clusterB);

    return distances.sort(function(a, b) {
        return a - b;
    })[0];
};

var getNearest = function(clusters) {
    var distanceGroups = generateClusterDistanceGroups(clusters.slice(0), getNearestPointDistance)
        .sort(function(a, b) {
            return a.distance - b.distance;
        });

    return distanceGroups;
};

var getFarthestPointDistance = function(clusterA, clusterB) {
    var distances = clusterA.distancesTo(clusterB);

    return distances.sort(function(a, b) {
        return b - a;
    })[0];
};

var getFarthest = function(clusters) {
    var distanceGroups = generateClusterDistanceGroups(clusters.slice(0), getFarthestPointDistance)
        .sort(function(a, b) {
            return b.distance - a.distance;
        });

    return distanceGroups;
};

var getAveragePointDistance = function(clusterA, clusterB) {
    var distances = clusterA.distancesTo(clusterB);
    var totalDistance = distances
        .reduce(function(a, b) {
            return a + b;
        });

    return totalDistance / distances.length;
};

var getAverage = function(clusters) {
    var distanceGroups = generateClusterDistanceGroups(clusters.slice(0), getAveragePointDistance)
        .sort(function(a, b) {
            return a.distance - b.distance;
        });

    return distanceGroups;
};

var getCenterPointDistance = function(clusterA, clusterB) {
    var clusterACenter = clusterA.getCenter(),
        clusterBCenter = clusterB.getCenter();

    return clusterACenter.distanceTo(clusterBCenter);
};

var getCenter = function(clusters) {
    var distanceGroups = generateClusterDistanceGroups(clusters.slice(0), getCenterPointDistance)
        .sort(function(a, b) {
            return a.distance - b.distance;
        });

    return distanceGroups;
};
