function page(element, page, content) {
    const ajax = new Request(element);
    ajax.formSet("page", content);
    ajax.makeRequest(page);
}

function data(element, type, page) {
    const ajax = new User(element, type);
    let content = ajax.getData();
    ajax.formSet("page", content["request"]);
    ajax.formSet("data", JSON.stringify(content));
    ajax.makeRequest(page);
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
            if (a[i].value !== undefined) {
                let name = a[i].id;
                this.data[name] = a[i].value;
            }
        }
        return this.data;
    }

}

class Upload extends Request {
    constructor(e) {
        super();
        this.file = e;
    }

}
