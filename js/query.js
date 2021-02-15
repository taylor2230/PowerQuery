function query(num) {
    let txtarea = document.getElementsByClassName("query-text")[0];
    switch (num) {
        case 0:
            txtarea.value = "SELECT username,email,isAdmin FROM pq_user_login WHERE isAdmin='1';";
            break;
        case 1:
            txtarea.value = "UPDATE pq_user_login SET isAdmin='1' WHERE username='';";
            break;
        case 2:
            txtarea.value = "UPDATE pq_user_login SET isAdmin='0' WHERE username='';";
            break;
        case 3:
            txtarea.value = "SELECT username,email,isAdmin FROM pq_user_login WHERE isAdmin='0';";
            break;
        case 4:
            txtarea.value = "DELETE FROM pq_user_login WHERE username='';";
            break;
        case 5:
            txtarea.value = "DELETE FROM pq_user_files WHERE username='';";
            break;
        case 6:
            txtarea.value = "FLUSH PRIVILEGES;";
            break;
        default:
            txtarea.value = "Error";
    }

}

function assist() {
    function defaultRows(d, v) {
        for (let i = 0; i < d.length; i++) {
            let children = d[i].children;
            let max = children.length - 2;
            if (max >= v) {
                while (max >= v) {
                    d[i].removeChild(children[max]);
                    max--;
                }
            } else if(max < v) {
                while(max+1 < v) {
                    d[i].insertBefore(children[1].cloneNode(), children[1]);
                    max++;
                }
            }
        }
    }

    const area = document.getElementsByClassName("pq-area")[0];
    const rows = document.getElementsByClassName("data-group");
    let selected = document.getElementsByClassName("pq-opts")[0].value;

    let message = document.createElement("DIV");
    message.className = "warning";
    area.innerHTML = '';
    area.appendChild(message);

    switch (selected) {
        case "generic-bar":
            defaultRows(rows, 2);
            message.innerText = "{Bar Chart}\n" +
                "Two Columns :: Detail & Value";
            document.getElementsByClassName("pq-cmd")[1].disabled = true;
            break;
        case "horizontal-bar":
            defaultRows(rows, 2);
            message.innerText = "{Horizontal Bar Chart}\n" +
                "Two Columns :: Detail & Value";
            document.getElementsByClassName("pq-cmd")[1].disabled = true;
            break;
        case "stacked-bar":
            defaultRows(rows, 3);
            message.innerText = "{Stacked Bar Chart}\n" +
                "Three Columns :: Parent -> Child Detail & Value";
            document.getElementsByClassName("pq-cmd")[1].disabled = false;
            break;
        case "stacked--hor-bar":
            defaultRows(rows, 3);
            message.innerText = "{Stacked Horizontal Bar Chart}\n" +
                "Three Columns :: Parent -> Child Detail & Value";
            document.getElementsByClassName("pq-cmd")[1].disabled = false;
            break;
        case "zoomable-bar":
            defaultRows(rows, 2);
            message.innerText = "{Zoomable Bar Chart}\n" +
                "Two Columns :: Detail & Value";
            document.getElementsByClassName("pq-cmd")[1].disabled = false;
            break;
        case "generic-line":
            defaultRows(rows, 2);
            message.innerText = "{Line Chart}\n" +
                "Two Columns :: x-axis & y-axis";
            document.getElementsByClassName("pq-cmd")[1].disabled = true;
            break;
        case "generic-pie":
            defaultRows(rows, 2);
            message.innerText = "{Pie Chart}\n" +
                "Two Columns :: Detail & Value";
            document.getElementsByClassName("pq-cmd")[1].disabled = true;
            break;
        case "donut-pie":
            defaultRows(rows, 2);
            message.innerText = "{Donut Pie Chart}\n" +
                "Two Columns :: Detail & Value";
            document.getElementsByClassName("pq-cmd")[1].disabled = true;
            break;
        default:
            message.innerText = "No Chart Selected"
    }
}
