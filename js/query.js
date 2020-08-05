function query(num)
{
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
            txtarea.value =  "Error";
    }

}

function assist()
{
    let selected = document.getElementsByClassName("pq-opts")[0].value;
    const area = document.getElementsByClassName("pq-area")[0];

    let message = document.createElement("DIV");
    message.className = "warning";
    area.innerHTML = '';
    area.appendChild(message);

    console.log(selected);
    switch (selected) {
        case "generic-bar":
            message.innerText = "{Bar Chart}\n" +
                "Two Columns :: Detail & Value";
            document.getElementsByClassName("pq-cmd")[1].disabled = true;
            break;
        case "horizontal-bar":
            message.innerText = "{Horizontal Bar Chart}\n" +
                "Two Columns :: Detail & Value";
            document.getElementsByClassName("pq-cmd")[1].disabled = true;
            break;
        case "stacked-bar":
            message.innerText = "{Stacked Bar Chart}\n" +
                "TBD";
            document.getElementsByClassName("pq-cmd")[1].disabled = false;
            break;
        case "stacked--hor-bar":
            message.innerText = "{Stacked Horizontal Bar Chart}\n" +
                "TBD";
            document.getElementsByClassName("pq-cmd")[1].disabled = false;
            break;
        case "zoomable-bar":
            message.innerText = "{Zoomable Bar Chart}\n" +
                "TBD";
            document.getElementsByClassName("pq-cmd")[1].disabled = false;
            break;
        case "generic-line":
            message.innerText = "{Line Chart}\n" +
                "Two Columns :: x-axis & y-axis";
            document.getElementsByClassName("pq-cmd")[1].disabled = true;
            break;
        case "generic-pie":
            message.innerText = "{Pie Chart}\n" +
                "Two Columns :: Detail & Value";
            document.getElementsByClassName("pq-cmd")[1].disabled = true;
            break;
        case "donut-pie":
            message.innerText = "{Donut Pie Chart}\n" +
                "Two Columns :: Detail & Value";
            document.getElementsByClassName("pq-cmd")[1].disabled = true;
            break;
        default:
            message.innerText = "No Chart Selected"
    }
}
