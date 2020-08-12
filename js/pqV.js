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

        if (d[0].children.length > 3) {
            let temp = [];
            for (let i = 0; i < d.length; i++) {
                let children = d[i].children;
                temp.push(this.hierarchyJson(children));
            }

            let len = temp.length - 1;
            while (temp.length > 0) {
                let pKeys = Object.keys(temp[len]);
                let group = pKeys[0], subgroup = pKeys[1];
                for (let i = 0; i < temp.length; i++) {
                    let pKeys2 = Object.keys(temp[i]);
                    let group2 = pKeys2[0], subgroup2 = pKeys2[1];

                    try {
                        if (temp[len][group] === temp[i][group2] && subgroup !== subgroup2) {
                            temp[len][subgroup2] = temp[i][subgroup2];
                            temp.splice(i, 1);
                        }
                    } catch (e) {
                        console.log("data catch");
                    }
                }

                if (temp[len] !== undefined) {
                    let sum = function (d) {
                        let keys = Object.keys(d);
                        let total = 0;
                        for (let z = 1; z < keys.length; z++) {
                            total += parseFloat(d[keys[z]]);
                        }
                        return total;
                    };
                    temp[len].cnt = sum(temp[len]);
                    this.newJson.push(temp[len]);
                }
                temp.splice(len, 1);
                len--;
            }
        } else {
            for (let i = 0; i < d.length; i++) {
                let children = d[i].children;
                let jsonData = {};
                jsonData["name"] = children[1].value;
                jsonData["value"] = parseFloat(children[2].value);
                this.newJson.push(jsonData);
            }
        }

        return this.newJson;
    }

    hierarchyJson(d) {
        let nameCnt = 0;
        let childJson = {};
        for (let i = 1; i < d.length - 1; i++) {
            if (i === 1) {
                childJson.group = d[i].value;
            } else {
                childJson[d[i].value] = d[i + 1].value;
            }
            nameCnt++;
        }
        return childJson;
    }
}

class SaveData extends Data {
    constructor() {
        super();
        this.name = "";
    }

    description() {
        this.name = prompt("Enter the file name:");
    }

    details() {
        let userData = [];
        let chart = document.getElementsByClassName("pq-opts")[0].value;
        let data = super.buildJson();
        this.description();
        userData.push(this.name);
        userData.push(chart);
        userData.push(data);
        return userData;
    }

    data(element, type, page) {
        const ajax = new User(element, type);
        let content = this.details();
        ajax.formSet("page", type);
        ajax.formSet("data", JSON.stringify(content));
        ajax.provideUpdate(page);
    }

}

class ReloadData extends Data {
    constructor(d, n) {
        super();
        this.data = [d,n];
    }

    grabData(element, type, page) {
        const ajax = new User(element, type);
        let content = this.data;
        ajax.formSet("page", type);
        ajax.formSet("data", JSON.stringify(content));
        return ajax.requestUpdate(page);
    }

    requestPage(element, type, page) {
        const ajax = new User(element, type);
        ajax.formSet("page", type);
        ajax.makeRequest(page);
    }

}

class PqV {
    constructor(ov) {
        this.data = new Data();
        this.ov = ov;
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

        if(this.ov !== undefined) {
            return this.ov;
        } else {
            const d = this.data.buildJson();
            if (d === "len") {
                this.displayError("len");
            } else {
                return d;
            }
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
            .attr("viewBox", [a, b, c, d])
            .attr('class', 'pq-chart')
            .attr('preserveAspectRatio', 'xMinYMin meet');
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
    constructor(d) {
        super(d);
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
        if (max > 9999999) {
            svg = super.svgCreate(-95, 0, 975, this.height);
        } else if (max > 999999) {
            svg = super.svgCreate(-65, 0, 925, this.height);
        } else if (max > 99999) {
            svg = super.svgCreate(-50, 0, 890, this.height);
        } else if (max > 9999) {
            svg = super.svgCreate(-45, 0, 875, this.height);
        } else if (max > 999) {
            svg = super.svgCreate(-35, 0, 875, this.height);
        } else {
            svg = super.svgCreate(0, 0, 820, this.height);
        }

        const x = this.xScale(data);
        const y = this.yScale(data);

        svg
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
    constructor(d) {
        super(d);
    }

    hBarChart() {
        super.clearArea();
        super.setHeight(400);
        super.setWidth(800);
        super.setMargin(0, 0, 25, 0);

        const data = super.toJSON().sort(function (a, b) {
            return d3.descending(a.value, b.value);
        });

        const svg = super.svgCreate(-50, 0, this.width + 75, this.width);

        const x = d3.scaleLinear()
            .domain([0, super.maxValue(data)])
            .range([this.margin.top, this.width]);

        const y = d3.scaleBand(data)
            .domain(d3.range(data.length))
            .range([this.margin.left, this.width - this.margin.right])
            .padding(0.1);

        svg
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
            g.attr('transform', 'translate(0, 825)')
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
    constructor(d) {
        super(d);
    }

    colors() {
        return ['#483C46', '#3C6E71', '#70AE6E', '#BEEE62', '#F4743B', '#2176AE', '#57B8FF', '#B66D0D', '#FBB13C', '#FE6847'];
    }

    stackedChart() {
        super.clearArea();
        super.genericChart();

        const data = super.toJSON();

        let svg = super.svgCreate(0, 0, 830, this.height);
        svg.attr('class', 'sbar');

        let col = d3.keys(data[0]);
        let values = col.slice(1,col.length-1);

        let x = d3.scaleBand()
            .rangeRound([0, this.width-85])
            .paddingInner(0.05)
            .align(0.1);

        let y = d3.scaleLinear()
            .rangeRound([this.height, 0]);

        let z = d3.scaleOrdinal()
            .range(this.colors());

        data.sort((a, b) => {
            return b.total - a.total
        });

        x.domain(data.map((d, i) => {
            return i;
        }));

        y.domain([0, d3.max(data, function (d) {
            return d.cnt;
        })]).nice();

        z.domain(values);

        let g = svg.append('g').attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        g.append('g')
            .selectAll('g')
            .data(d3.stack().keys(values)(data))
            .enter().append('g')
            .attr('fill', d => {
                return z(d.key)
            })
            .selectAll('rect')
            .data(d => {
                return d;
            })
            .enter().append('rect')
            .attr("x", function (d, i) {
                return x(i);
            })
            .attr("y", function (d) {
                return y(d[1]);
            })
            .attr("height", function (d) {
                return y(d[0]) - y(d[1]);
            })
            .attr("width", x.bandwidth());

        g.append("g")
            .attr("class", "axis")
            .attr("font-size", 14)
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(x).tickFormat(function(d,i) {
                return data[i].group}));

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start");

        let legend = g.append("g")
            .attr("font-size", 12)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(values.slice().reverse())
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 20 + ")";
            });

        legend.append("rect")
            .attr("x", this.width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", this.width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function (d) {
                return d;
            });

        svg.node();

    }

}

class SHbar extends Bar {
    constructor(d) {
        super(d);
    }

    colors() {
        return ['#483C46', '#3C6E71', '#70AE6E', '#BEEE62', '#F4743B', '#2176AE', '#57B8FF', '#B66D0D', '#FBB13C', '#FE6847'];
    }

    stackedHorChart() {
        super.clearArea();
        super.setHeight(400);
        super.setWidth(800);
        super.setMargin(0, 0, 25, 45);

        const data = super.toJSON();

        let svg = super.svgCreate(-50, 0, this.width + 75, this.height);
        svg.attr('class', 'shbar');

        let col = d3.keys(data[0]);
        let values = col.slice(1,col.length-1);

        let x = d3.scaleLinear()
            .rangeRound([this.width-this.margin.right, 0]);

        let y = d3.scaleBand()
            .rangeRound([0, this.height])
            .paddingInner(0.05)
            .align(0.1);

        let z = d3.scaleOrdinal()
            .range(this.colors());

        data.sort((a, b) => {
            return b.total - a.total
        });

        y.domain(data.map((d, i) => {
            return i;
        }));

        x.domain([d3.max(data, function (d) {
            return d.cnt;
        }), 0]).nice();

        z.domain(values);

        let g = svg.append('g').attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        g.append('g')
            .selectAll('g')
            .data(d3.stack().keys(values)(data))
            .enter().append('g')
            .attr('fill', d => {
                return z(d.key)
            })
            .selectAll('rect')
            .data(d => {
                return d;
            })
            .enter().append('rect')
            .attr("y", function (d, i) {
                return y(i);
            })
            .attr("x", function (d) {
                return x(d[0]);
            })
            .attr("width", function (d) {
                return x(d[1]) - x(d[0]);
            })
            .attr("height", y.bandwidth());

        g.append("g")
            .attr("class", "axis")
            .attr("font-size", 16)
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(x).ticks(null, "s"));


        g.append("g")
            .attr("class", "axis")
            .attr("font-size", 16)
            .call(d3.axisLeft(y).tickFormat(function(d,i) {
                return data[i].group}))
            .append("text")
            .attr("y", 2)
            .attr("x", x(x.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start");

        let legend = g.append("g")
            .attr("class", "legend")
            .attr("font-size", 12)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(values.slice().reverse())
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 20 + ")";
            });

        legend.append("rect")
            .attr("x", this.width)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", this.width-5)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function (d) {
                return d;
            });

        svg.node();


    }
}

class ZBar extends Bar {
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

    zoomBarChart() {
        function zoom(svg) {
            const extent = [[25, 25], [800 - 25, 400 - 25]];

            svg.call(d3.zoom()
                .scaleExtent([1, 8])
                .translateExtent(extent)
                .extent(extent)
                .on("zoom", zoomed));

            function zoomed() {
                x.range([25, 800 - 25].map(d => d3.event.transform.applyX(d)));
                svg.selectAll("rect").attr("x", (d,i) => x(i)).attr("width", x.bandwidth());
                svg.selectAll(".x-axis").call(xAxis);
            }
        }

        super.clearArea();
        super.genericChart();

        const data = super.toJSON().sort(function (a, b) {
            return d3.ascending(a.value, b.value);
        });
        const max = super.maxValue(data);
        let svg;
        if (max > 9999999) {
            svg = super.svgCreate(-95, 0, 975, this.height);
        } else if (max > 999999) {
            svg = super.svgCreate(-65, 0, 925, this.height);
        } else if (max > 99999) {
            svg = super.svgCreate(-50, 0, 890, this.height);
        } else if (max > 9999) {
            svg = super.svgCreate(-45, 0, 875, this.height);
        } else if (max > 999) {
            svg = super.svgCreate(-35, 0, 875, this.height);
        } else {
            svg = super.svgCreate(0, 0, 820, this.height);
        }

        svg.call(zoom);
        const x = this.xScale(data);
        const y = this.yScale(data);

        svg
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
            .attr('id', d => d.value);

        function xAxis(g) {
            g.attr('transform', 'translate(0, 375)')
                .call(d3.axisBottom(x).tickFormat(i => data[i].name))
                .attr('font-size', '18px')
                .attr('class','x-axis')
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

class Pie extends PqV {
    constructor(d) {
        super(d);
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
    constructor(d) {
        super(d);
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
    constructor(d) {
        super(d);
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
        if (max > 999999) {
            svg = super.svgCreate(-90, -12, 900, 455);
        } else if (max > 99999) {
            svg = super.svgCreate(-75, -12, 900, 455);
        } else if (max > 99) {
            svg = super.svgCreate(-55, -12, 900, 455);
        } else if (max > 9) {
            svg = super.svgCreate(-45, -12, 900, 455);
        } else {
            svg = super.svgCreate(-35, -12, 850, 455);
        }

        svg
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
