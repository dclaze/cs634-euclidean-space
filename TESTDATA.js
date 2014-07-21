var generateSampleVector = function(numberOfPoints, minValue, maxValue) {
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

SAMPLE_DATA = generateSampleVector(500, -5, 5);

SAMPLE_CLUSTER_DATA = vectorsToClusters(SAMPLE_DATA);

TEST_DATA = [
    new Vector(5, 16, 0),
    new Vector(5, 9, 0),
    new Vector(8, 13, 0),
    new Vector(8, 10, 0),
    new Vector(10, 3, 0),
    new Vector(12, 5, 0),
    new Vector(14, 16, 0),
    new Vector(16, 11, 0),
    new Vector(16, 7, 0),
    new Vector(18, 17, 0),
];

TEST_CLUSTER_DATA = vectorsToClusters(TEST_DATA);


SIMPLE_DATA = [
    new Vector(0, 0, 0),
    new Vector(5, 5, 0),
    new Vector(5, 0, 0),
    new Vector(0, 5, 0),
    new Vector(2.5, 2.5, 0)
];

A = SIMPLE_DATA[0];
B = SIMPLE_DATA[1];
C = SIMPLE_DATA[2];
D = SIMPLE_DATA[3];
E = SIMPLE_DATA[4];
