class Data {
    constructor() {
        this.newJson = [];
    }

    dataCollect() {
        return document.getElementsByClassName("data-group");
    }

    buildJson() {
        const d = this.dataCollect();
        if (d.length < 1) {
            return "len"
        }

        for (let i = 0; i < d.length; i++) {
            let children = d[i].children;
            if (children.length > 3) {
                this.newJson.push(this.hierarchyJson(children));
            } else {
                let jsonData = {};
                jsonData["name"] = children[1].value;
                jsonData["value"] = parseFloat(children[2].value);
                this.newJson.push(jsonData);
            }
        }

        return this.newJson;
    }

    hierarchyJson(d) {
        let childData = d;
        let childJson = {};
        return childJson;
    }

}

class SaveData extends Data {
    constructor() {
        super();
    }

    sendData() {
        return null;
    }

}

class PqV {
    constructor() {
        this.data = new Data();
        this.home = document.getElementsByClassName("pq-area")[0];
        this.width = 0;
        this.height = 0;
        this.margin = {top: 0, bottom: 0, left: 0, right: 0};
    }

    setWidth(x) {
        this.width = x;
    }

    setHeight(y) {
        this.height = y;
    }

    setMargin(a, b, c, d) {
        this.margin.top = a;
        this.margin.bottom = b;
        this.margin.left = c;
        this.margin.right = d;
    }

    toJSON() {
        const d = this.data.buildJson();
        if (d === "len") {
            this.displayError("len");
        } else {
            return d;
        }
    }

    maxValue(d) {
        let max = d[0].value;

        for (let i = 1; i < d.length; i++) {
            d[i].value > max ? max = d[i].value : null;
        }

        return max;
    }

    clearArea() {
        this.home.innerHTML = '';
    }

    svgCreate(a, b, c, d) {
        return d3.select('.pq-area')
            .append('svg')
            .attr('height', this.height - this.margin.top - this.margin.bottom)
            .attr('width', this.width - this.margin.left - this.margin.right)
            .attr("viewBox", [a, b, c, d])
            .attr('class', 'pq-chart')
            .attr('preserveAspectRatio', 'xMidYMid meet');
    }

    genericChart() {
        this.setWidth(800);
        this.setHeight(400);
        this.setMargin(25, 25, 25, 25);
    }

    displayError(warn) {
        let message = document.createElement("DIV");
        message.className = "warning";

        if (warn === "len") {
            message.innerText = "There are no data to visualize"
        }
        this.home.innerHTML = "";
        this.home.append(message);
    }

}

class Bar extends PqV {
    constructor() {
        super();
    }

    xScale(d) {
        return d3.scaleBand(d)
            .domain(d3.range(d.length))
            .range([this.margin.left, this.width])
            .padding(0.1);
    }

    yScale(d) {
        return d3.scaleLinear()
            .domain([0, super.maxValue(d)])
            .range([this.height - this.margin.bottom, this.margin.top]);
    }

    barChart() {
        super.clearArea();
        super.genericChart();

        const data = super.toJSON().sort(function (a, b) {
            return d3.ascending(a.value, b.value);
        });
        const max = super.maxValue(data);
        let svg;
        if(max > 9999999) {
            svg = super.svgCreate(-95, 0, 975, this.height);
        }else if(max > 999999) {
            svg = super.svgCreate(-65, 0, 925, this.height);
        } else if(max > 99999) {
            svg = super.svgCreate(-50, 0, 890, this.height);
        } else if(max > 9999) {
            svg = super.svgCreate(-45, 0, 875, this.height);
        } else if(max > 999) {
            svg = super.svgCreate(-35, 0, 875, this.height);
        } else {
            svg = super.svgCreate(0, 0, 820, this.height);
        }

        const x = this.xScale(data);
        const y = this.yScale(data);

        svg
            .attr('height', "100%")
            .attr('width', "100%")
            .attr('class', 'gbar')
            .append('g')
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', (d, i) => x(i))
            .attr('y', (d) => y(d.value))
            .attr('height', d => y(0) - y(d.value))
            .attr('width', x.bandwidth())
            .attr('class', 'rectangle')
            .attr('id', d => d.value)
            .attr('onmouseover', "console.log(this.id)");

        function xAxis(g) {
            g.attr('transform', 'translate(0, 375)')
                .call(d3.axisBottom(x).tickFormat(i => data[i].name))
                .attr('font-size', '18px')
        }

        function yAxis(g) {
            g.attr('transform', 'translate(25, 0)')
                .call(d3.axisLeft(y).ticks(3, data.format))
                .attr('font-size', '18px')
        }

        svg.append('g').call(yAxis);
        svg.append('g').call(xAxis);
        svg.node();

    }
}

class HBar extends Bar {
    constructor() {
        super();
    }

    hBarChart() {
        super.clearArea();
        super.setHeight(400);
        super.setWidth(800);
        super.setMargin(0, 0, 25, 0);

        const data = super.toJSON().sort(function (a, b) {
            return d3.descending(a.value, b.value);
        });

        const svg = super.svgCreate(-50, 0, this.width+75, this.width);

        const x = d3.scaleLinear()
            .domain([0, super.maxValue(data)])
            .range([this.margin.top, this.width]);

        const y = d3.scaleBand(data)
            .domain(d3.range(data.length))
            .range([this.margin.left, this.width - this.margin.right])
            .padding(0.1);

        svg
            .attr("width", "100%")
            .attr('class', 'hbar')
            .append('g')
            .attr('fill', 'royalblue')
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('class', 'rectangle')
            .attr('x', 0)
            .attr('y', (d, i) => y(i))
            .attr('width', d => x(0) + x(d.value))
            .attr('height', y.bandwidth())
            .attr('class', 'rectangle')
            .attr('id', d => d.value)
            .attr('onmouseover', "console.log(this.id)");

        function xAxis(g) {
            g.attr('transform', 'translate(0, 775)')
                .call(d3.axisBottom(x).ticks(3))
                .attr('font-size', '20px')
        }

        function yAxis(g) {
            g.attr('transform', 'translate(0, 25)')
                .call(d3.axisLeft(y).tickFormat(i => data[i].name))
                .attr('font-size', '20px')
        }

        svg.append('g').call(yAxis);
        svg.append('g').call(xAxis);
        svg.node();
    }
}

class Sbar extends Bar {
    constructor() {
        super();
    }

    stackedChart() {

    }

}

class SHbar extends Bar {
    constructor() {
        super();
    }

    stackedHorChart() {

    }
}

class ZBar extends Bar {
    constructor() {
        super();
    }

    zoomBarChart() {

    }

}

class Pie extends PqV {
    constructor() {
        super();
    }

    colors() {
        return ['#483C46', '#3C6E71', '#70AE6E', '#BEEE62', '#F4743B', '#2176AE', '#57B8FF', '#B66D0D', '#FBB13C', '#FE6847'];
    }

    pieChart() {
        super.clearArea();
        super.setHeight(400);
        super.setWidth(500);
        super.setMargin(0, 0, 0, 0);
        const data = super.toJSON();
        let svg = super.svgCreate(0, 0, 470, 400);
        const pieColors = d3.scaleOrdinal()
            .domain(data)
            .range(this.colors());
        const radius = Math.min(this.width, this.height) / 2;

        let g = svg
            .attr("width", "100%")
            .attr("height", "100%")
            .attr('class', 'pie')
            .append('g')
            .attr('transform', "translate(" + this.width / 2 + "," + this.height / 2 + ")");

        // Generate the pie
        let pie = d3.pie().value((d) => {
            return d.value
        });

        // Generate the arcs
        let arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        let label = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 120);

        //Generate groups
        let arcs = g.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        //Draw arc paths
        arcs.append("path")
            .attr("fill", (d, i) => {
                return pieColors(i);
            })
            .attr("d", arc);

        arcs.append("text")
            .attr('class', 'label')
            .attr("transform", (d) => {
                return "translate(" + label.centroid(d) + ")";
            })
            .text((d, i) => {
                return data[i].name + ' (' + data[i].value + ')';
            });
        svg.node();
    }
}

class Donut extends Pie {
    constructor() {
        super();
    }

    donutChart() {
        super.clearArea();
        super.setHeight(400);
        super.setWidth(500);
        super.setMargin(0, 0, 0, 0);
        const data = super.toJSON();
        let svg = super.svgCreate(0, 0, 470, 400);
        const pieColors = d3.scaleOrdinal()
            .domain(data)
            .range(super.colors());
        const radius = Math.min(this.width, this.height) / 2;

        let g = svg
            .attr("width", "100%")
            .attr("height", "100%")
            .attr('class', 'dpie')
            .append('g')
            .attr('transform', "translate(" + this.width / 2 + "," + this.height / 2 + ")");

        // Generate the pie
        let pie = d3.pie().value((d) => {
            return d.value
        });

        // Generate the arcs
        let arc = d3.arc()
            .innerRadius(100)
            .outerRadius(radius);

        let label = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 120);

        //Generate groups
        let arcs = g.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        //Draw arc paths
        arcs.append("path")
            .attr("fill", (d, i) => {
                return pieColors(i);
            })
            .attr("d", arc);

        arcs.append("text")
            .attr('class', 'label')
            .attr("transform", (d) => {
                return "translate(" + label.centroid(d) + ")";
            })
            .text((d, i) => {
                return data[i].name + ' (' + data[i].value + ')';
            });
        svg.node();
    }
}

class Line extends PqV {
    constructor() {
        super();
    }

    maxX(d) {
        let max = parseFloat(d[0].name);

        for (let i = 1; i < d.length; i++) {
            d[i].name > max ? max = d[i].name : null;
        }

        return max;
    }

    lineChart() {
        super.clearArea();
        super.genericChart();

        const data = super.toJSON();

        let xAxis = d3.scaleLinear()
            .domain([0, this.maxX(data)])
            .range([0, this.width]);

        let yAxis = d3.scaleLinear()
            .domain([0, super.maxValue(data)])
            .range([this.height, 0]);

        let line = d3.line()
            .x((d) => {
                return xAxis(parseInt(d.name));
            })
            .y((d) => {
                return yAxis(d.value)
            });

        const max = super.maxValue(data);

        let svg;
        if(max > 999999) {
            svg = super.svgCreate(-90, -12, 900, 455);
        }else if(max > 99999) {
            svg = super.svgCreate(-75, -12, 900, 455);
        } else if(max > 99) {
            svg = super.svgCreate(-55, -12, 900, 455);
        } else if(max > 9) {
            svg = super.svgCreate(-45, -12, 900, 455);
        } else {
            svg = super.svgCreate(-35, -12, 850, 455);
        }

        svg
            .attr('width', "100%")
            .attr('height', "100%")
            .attr('class', 'line')
            .append('g')
            .attr('class', 'x-axis')
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(xAxis));

        svg
            .append('g')
            .attr("class", "y-axis")
            .call(d3.axisLeft(yAxis));

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

        svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", function (d) {
                return max > 999999 ? xAxis(parseFloat(d.name) * .10) : xAxis(parseFloat(d.name));
            })
            .attr("cy", function (d) {
                return yAxis(d.value)
            })
            .attr("r", 5);
    }
}
