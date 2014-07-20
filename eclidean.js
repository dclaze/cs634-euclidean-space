var generateDistances = function(vectors) {
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
        return distances.concat(generateDistances(vectors));
    else
        return distances;
};

var vectorsToClusters = function(vectors) {
    return vectors.map(asCluster)
};

var asCluster = function(vector) {
    return new Cluster(vector);
};

var groupClusters = function(clusterData, clusterMethod, k) {
    console.time("CLUSTERS");
    var clusters = clusterData.slice(0);
    while (clusters.length > k) {
        var nearestClusterGroup = clusterMethod(clusters)[0];
        clusters.remove(nearestClusterGroup.left);
        clusters.remove(nearestClusterGroup.right);
        clusters.push(nearestClusterGroup.left.merge(nearestClusterGroup.right));
    }

    console.timeEnd("CLUSTERS");
    return clusters;
}

var generateClusterDistances = function(clusters, distanceTransform) {
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
        return distances.concat(generateClusterDistances(clusters, distanceTransform));
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
    var distanceGroups = generateClusterDistances(clusters.slice(0), getNearestPointDistance)
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
    var distanceGroups = generateClusterDistances(clusters.slice(0), getFarthestPointDistance)
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
    var distanceGroups = generateClusterDistances(clusters.slice(0), getAveragePointDistance)
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
    var distanceGroups = generateClusterDistances(clusters.slice(0), getCenterPointDistance)
        .sort(function(a, b) {
            return a.distance - b.distance;
        });

    return distanceGroups;
};
