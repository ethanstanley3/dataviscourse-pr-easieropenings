let self = null;

// the interactive Pie chart
class Pie {
    constructor(tree) {
        self = this;
        this.tree = tree;
        this.node = tree;
        console.log(self);

        // draw the pie chart for the starting board
        this.updatePie();
    }

    // gives Pie chart a reference to the chess board
    link(board){
        this.board = board;
    }

    playedMove(move){
        if(move in this.node.children){
            console.log(move + " is legal");
            return true;
        }
        return false;
    }

    update(move) {
        if (move in this.node.children) {
            this.node = this.node.children[move];
            $("#move").html(move);
            // console.log(Object.keys(this.node.children));
            // for (let key in this.node.children) {
            //     console.log(key, this.node.children[key].n);
            // }
            // $("#children").html(Object.keys(this.node.children));
            this.updatePie();
        }
        else{
            console.log("this should not have happened");
        }
    }

    // redraws pie based on data in node
    updatePie() {
        let width = 500;
        let height = 500;
        let radius = 230;
        let svg = d3
            .select("#pie_svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "white")
            .append("g")
            .attr(
                "transform",
                "translate(" + width / 2 + "," + height / 2 + ")"
            );

        let pie = d3.pie();

        let data = Object.values(this.node.children);

        console.log(data);

        if(data.length === 0){
            d3.select("#pie_svg").style("background-color", "red");
            return;
        }

        const colors = [
            "#7fc97f",
            "#beaed4",
            "#fdc086",
            "#ffff99",
            "#386cb0",
            "#f0027f",
            "#bf5b17",
            "#666666",
        ];

        // Here we tell the pie generator which attribute
        // of the object to use for the layout
        pie.value(function (d) {
            return d.n;
        });

        let pieData = pie(data);

        let arc = d3.arc();

        // Let's tell it how large we want it
        arc.outerRadius(radius);
        // We also need to give it an inner radius...
        arc.innerRadius(50);

        let groups = svg.selectAll("g").data(pieData).enter().append("g");

        // Add the path, and use the arc generator to convert the pie data to
        // an SVG shape
        groups
            .append("path")
            .attr("d", arc)
            .style("fill", (d, i) => colors[i % colors.length]);

        groups
            .append("text")
            .text((d) => {return d.endAngle - d.startAngle > 3.14/20 ? d.data.move + " - " + (100*parseFloat(d.data.wins)/parseFloat(d.data.n)).toFixed(2) + "%" : ""})
            // We need to move the label to the middle of the slice. Our arc generator
            // is smart enough to know how to do this. Notice that arc.centroid gives us the center of the visible wedge.
            .attr("transform", (d) => "translate(" + arc.centroid(d) + ")")
            // Finally some extra text styling to make it look nice:
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .style("font-size", "15px")
            .style("font-weight", "bold");
        
        groups.on("click", function(event, d){
            console.log(event);
            console.log(d);
            // self.node = d.data;
            self.board.playMoveIfGood(d.data.move);
        })

        groups.on("mouseover", function(event, d){
            self.board.highlightMove(d.data.move);
        })

        groups.on("mouseout", function(event, data){
            self.board.clearHighlighting();
        })
    }
}
