var Cluster = function() {
    function Cluster() {
        this.id = UUID.newUuid();
        this.vectors = [];
        for (var i = 0; i < arguments.length; i++) {
            var argument = arguments[i];
            if (argument instanceof Array)
                this.vectors.push.apply(this.vectors, argument);
            else
                this.vectors.push(arguments[i]);
        }
    };

    Cluster.prototype.distancesTo = function(clusterB) {
        var otherVectors = clusterB.vectors;
        var distances = [];

        for (var i = 0; i < this.vectors.length; i++) {
            for (var j = 0; j < otherVectors.length; j++) {
                distances.push(this.vectors[i].distanceTo(otherVectors[j]));
            }
        }

        return distances;
    };

    Cluster.prototype.getCenter = function() {
        var x = this.vectors.map(function(v) {
                return v.x;
            }).reduce(function(a, b) {
                return a + b;
            }),
            y = this.vectors.map(function(v) {
                return v.y;
            }).reduce(function(a, b) {
                return a + b;
            }),
            z = this.vectors.map(function(v) {
                return v.z;
            }).reduce(function(a, b) {
                return a + b;
            }),
            total = this.vectors.length;

        return new Vector(x / total, y / total, z / total);
    };

    Cluster.prototype.merge = function(otherCluster) {
        return new Cluster(this.vectors, otherCluster.vectors);
    };

    Cluster.prototype.toString = function() {
        console.log("Cluster", this.id);
        for (var i = 0; i < this.vectors.length; i++) {
            console.log(this.vectors[i].id, this.vectors[i].x, this.vectors[i].y, this.vectors[i].z)
        }
        console.log("=======================");
    }

    return Cluster;
}();
