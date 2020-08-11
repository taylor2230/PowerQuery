function page(element, page, content) {
    const ajax = new Request(element);
    ajax.formSet("page", content);
    ajax.makeRequest(page);
}

function data(element, type, page) {
    const ajax = new User(element, type);
    let content = ajax.getData();
    if(content === "") {
        alert("Please Complete All Required Fields")
    } else {
        ajax.formSet("page", content["request"]);
        ajax.formSet("data", JSON.stringify(content));
        ajax.makeRequest(page);
    }
}

class Request {
    constructor(id) {
        this.id = document.getElementById(id);
        this.form = new FormData();
    }

    formSet(name, content) {
        this.form.set(name, content);
    }

    async makeRequest(destiny) {
        let data = await fetch(destiny, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            body: this.form,
            contentType: "multipart/form-data"
        });
        await data.text().then(r => {
            this.id.innerHTML = r;
        });
    }

    async provideUpdate(destiny) {
        let data = await fetch(destiny, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            body: this.form,
            contentType: "multipart/form-data"
        });
        await data.text().then(r => {
            alert("Success");
        });
    }

    async requestUpdate(destiny) {
        return await fetch(destiny, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            body: this.form,
            contentType: "multipart/form-data"
        }).then(
            response => response.json()
        ).then(
            data => {
                return data.data;
            });
    }
}

class User extends Request {
    constructor(a, e) {
        super(a);
        this.type = e;
        this.data = {"request": this.type};
    }

    getData() {
        let a = document.getElementsByClassName("form-box").length === 0 ?
            document.getElementsByClassName("query-text") :
            document.getElementsByClassName("form-box");

        for (let i = 0; i < a.length; i++) {
            if ((a[i].className === "form-box" && a[i].value === "" && a.length > 2 ) || (a[i].className !== "form-box" && a[i].value === "")) {
                return "";
            } else {
                let name = a[i].id;
                this.data[name] = a[i].value;
            }
        }
        return this.data;
    }
}
