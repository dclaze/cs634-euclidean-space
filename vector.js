var Vector = function() {
    function Vector(x, y, z) {
    	this.id = UUID.newUuid();
        this.x = x;
        this.y = y;
        this.z = z;
    };

    Vector.prototype.distanceTo = function(vector) {
        return Math.sqrt(Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2) + Math.pow(vector.z - this.z, 2));
    }

    return Vector;
}();