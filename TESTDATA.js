SAMPLE_DATA = generateRandomVectors(500, -5, 5);

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

SIMPLE_CLUSTERS = vectorsToClusters(SIMPLE_DATA);

// P1(5, 16), P2(8, 13), P3(8, 10), P4(5, 9),
SILHOUETTE_CLUSTERS = [
    new Cluster([
        new Vector(5, 16, 0),
        new Vector(8, 13, 0),
        new Vector(8, 10, 0),
        new Vector(5, 9, 0)
    ]),
    new Cluster([
        new Vector(14, 16, 0),
        new Vector(18, 17, 0)
    ]),
    new Cluster([
        new Vector(10, 3, 0),
        new Vector(12, 5, 0),
        new Vector(16, 7, 0),
        new Vector(16, 11, 0)
    ]),
];
