function query(num)
{
    let txtarea = document.getElementsByClassName("query-text")[0];
    switch (num) {
        case 0:
            txtarea.value = "SELECT id,username,email,isAdmin FROM pq_user_login WHERE isAdmin='1';";
            break;
        case 1:
            txtarea.value = "UPDATE pq_user_login SET isAdmin='1' WHERE username='';";
            break;
        case 2:
            txtarea.value = "UPDATE pq_user_login SET isAdmin='0' WHERE username='';";
            break;
        case 3:
            txtarea.value = "SELECT id,username,email,isAdmin FROM pq_user_login WHERE isAdmin='0';";
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
    console.log(selected);
    switch (selected) {
        case "generic-bar":
            area.innerText = "Bar Chart Requirements:";
            break;
        default:
            area.innerText = "No Information"
    }
}
