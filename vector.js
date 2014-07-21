var Vector = function() {
    function Vector(x, y, z) {
        this.id = UUID.newUuid();
        this.x = x;
        this.y = y;
        this.z = z;
    };

    Vector.prototype.distanceTo = function(vector) {
        return Math.sqrt(Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2) + Math.pow(vector.z - this.z, 2));
    };

    Vector.prototype.distancesTo = function(vectors) {
        var self = this;
        return vectors.map(function(vector) {
            return self.distanceTo(vector);
        });
    };

    Vector.prototype.asCluster = function() {
        return new Cluster(this);
    };

    return Vector;
}();
