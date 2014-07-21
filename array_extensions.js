Array.prototype.remove = function(item) {
    var items = []
    if (arguments.length > 1) {
        items = arguments;
    } else {
        items = [item];
    }
    for (var i = 0; i < items.length; i++) {
        var index = this.indexOf(items[i]);
        if (index > -1)
            this.splice(index, 1);
    }


    return this;
};

Array.prototype.min = function() {
    return Math.min.apply(Math, this);
};

Array.prototype.sum = function() {
    return this.reduce(function(a, b) {
        return a + b;
    });
};

Array.prototype.average = function() {
    return this.sum() / this.length;
}

Array.prototype.excluding = function(item) {
    return this.slice(0).remove(item);
}
