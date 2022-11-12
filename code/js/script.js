// loads the processed data in and then starts the visualization when completed
fetch("./data/processed/processed_data_100k_pruned.json")
    .then((response) => response.json())
    .then(function (tree) {
        let pie = new Pie(tree);
        let board = new Board(pie);
        pie.link(board); // give the pie chart access to the board
    });
