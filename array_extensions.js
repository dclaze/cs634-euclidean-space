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
