function dataModify(request)
{

    if(request === 0) {
        const list = document.getElementsByClassName("pq-data")[0].childNodes;
        let maxRow = list[list.length-2];
        let newRow = maxRow.cloneNode(true);
        let newChildren = newRow.childNodes;
        let value = parseInt(newChildren[0].innerText) + 1;
        for(let  i = 0; i < newChildren.length; i++) {
            if(newChildren[i].nodeName === "LABEL") {
                newChildren[i].innerText = value;
                newChildren[i].htmlFor = value;
            } else {
                newChildren[i].id = value;
                newChildren[i].name = value;
            }
        }
        document.getElementsByClassName("pq-data")[0].insertBefore(newRow, list[list.length-1]);
    } else if(request === 1){
        const list = document.getElementsByClassName("data-group");
        for(let i = 0;i < list.length;i++) {
            let children = list[i].childNodes;
            let newCol = children[2].cloneNode(false);
            list[i].insertBefore(newCol, children[1]);
        }
    } else if(request === -1){

        function checkbox(cl, id)
        {
            let checkbox = document.createElement("INPUT");
            checkbox.type = "checkbox";
            checkbox.className = cl;
            checkbox.id = id;
            checkbox.name = id;
            return checkbox;
        }

        function exposeChanges(obj)
        {
            const list = document.getElementsByClassName("data-group");
            let children = list[0].children;
            if(children.length > 3) {
                let parent = list[0].parentElement;
                let newDiv = document.createElement("DIV");
                newDiv.className = "modify";

                for(let i = 1; i < children.length-1;i++) {
                    let label = document.createElement("LABEL");
                    label.innerText = "Column " + i;
                    label.className = "modify-col-label";
                    label.htmlFor = "col-" + i;
                    newDiv.append(checkbox("modify-column", "col-" + i));
                    newDiv.append(label);
                }

                parent.insertBefore(newDiv, list[0]);
            }

            for(let i = 0;i < list.length;i++) {
                list[i].prepend(checkbox("modify-row", 0));
            }
            obj[0].disabled = true;
            obj[1].disabled = true;
            obj[2].innerText = "Commit Changes";
        }

        function commitChanges(obj)
        {
            obj[0].disabled = false;
            obj[1].disabled = false;
            obj[2].innerText = "Edit Data";

            const list = document.getElementsByClassName("data-group");
            const col = document.getElementsByClassName("modify");
            let nodeRemove = [];
            if(col.length > 0) {
                const colChildren = col[0].children;
                let activeCnt = 0;
                for(let i = 0;i < colChildren.length;i++) {
                    if (activeCnt < colChildren.length-1 && colChildren[i].checked) {
                        activeCnt++;
                        for (let y = 0; y < list.length; y++) {
                            list[y].children[activeCnt + 1].remove();
                        }
                    }
                }
                col[0].remove();
            }

            let cnt = 0;
            for(let i = list.length-1;i >= 0; i--) {
               let rowChildren = list[i].children;
               if(rowChildren[0].checked && cnt < list.length-1) {
                   cnt++;
                   nodeRemove.push(list[i])
               } else {
                   rowChildren[0].remove();
               }
            }

            cnt = 0;
            while(nodeRemove.length > 0) {
                try {
                    nodeRemove[cnt].remove();
                } catch (e) {
                    nodeRemove[cnt].remove();
                }
               cnt++;
            }

        }

        const editBtn = document.getElementsByClassName("pq-cmd");
        editBtn[2].innerText !== "Commit Changes" ? exposeChanges(editBtn) : commitChanges(editBtn);

    } else {
        return false;
    }
}

function buildRequest()
{
    const selected = document.getElementsByClassName("pq-opts")[0].value;

    switch (selected) {
        case "generic-bar":
            let bChart = new Bar();
            bChart.barChart();
            break;
        case "horizontal-bar":
            let hChart = new HBar();
            hChart.hBarChart();
            break;
        case "stacked-bar":
            let sBar = new Sbar();
            sBar.stackedChart();
            break;
        case "stacked--hor-bar":
            let sHBar = new SHbar();
            sHBar.stackedHorChart();
            break;
        case "zoomable-bar":
            let zBar = new ZBar();
            zBar.zoomBarChart();
            break;
        case "generic-line":
            let lChart = new Line();
            lChart.lineChart();
            break;
        case "generic-pie":
            let pChart = new Pie();
            pChart.pieChart();
            break;
        case "donut-pie":
            let dPChart = new Donut();
            dPChart.donutChart();
            break;
        default:
            assist("fail");
            break;
    }
}
