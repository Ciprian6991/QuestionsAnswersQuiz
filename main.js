const state = {
    page: "home",
    allQuizzez: []
}

var questionsCounter = 0

var headerContainer = document.getElementById('root');


function e(tag, atrr, childNodes) {
    const node = document.createElement(tag);

    if (atrr) {
        for (const property in atrr) {
            if (typeof atrr[property] === "function") {
                node.addEventListener(property, atrr[property])
            }
            else {
                node.setAttribute(property, atrr[property]);
            }
        }
    }

    childNodes = childNodes || [];
    childNodes = typeof childNodes == "string"
        ? [childNodes]
        : childNodes;

    childNodes.map(e => typeof e == "string" ? document.createTextNode(e) : e)
        .forEach(n => node.appendChild(n));

    return node;
}

function HeaderHome() {
    headerContainer.innerHTML = ''

    var header = e("header", {},
        [e("h1", {}, ["QUIZZEZ"]),
        e("p", { ["style"]: ["color:red"] }, ["Click Add quiz to create a new quiz"]),
        e("p", { ["style"]: ["color:yellow"] }, ["Click Edit to edit existing quiz"]),
        e("p", { ["style"]: [] }, ["Click Run to run selected quiz"])]
    );

    headerContainer.appendChild(header);
}

function isEmpty(arg) {
    for (let key in arg) {
        if (arg.hasOwnProperty(key))
            return false;
    }
    return true;
}

function Quizzez() {
    if (isEmpty(state.allQuizzez)) {
        let empty = e("header", { "id": "empty" }, [e("b", {}, ["No input yet"])]);

        headerContainer.appendChild(empty);
    }
    else {
        let quizzzez = e("header", { "id": "questionsTags" });
        for (let key in state.allQuizzez) {
            var questionArticle = e("header", { "id": "questionTag" },
                [e("h1", {}, [key]),
                e("input", { "type": "button", "value": "EDIT", "onclick": "EditQUiz()" },),
                e("input", { "type": "button", "value": "RUN", "onclick": "RUN()" },),]);
            quizzzez.appendChild(questionArticle)
        }
        headerContainer.appendChild(quizzzez)
    }
}

function RUN() {
    state.page = 'Run'
    refresh();
}

function NewQuiz() {
    state.page = 'create'
    refresh();

}

function BackHome() {
    state.page = 'home'
    refresh()
}

function Submit() {
    var form = document.getElementById('readroot');
    var text = form['usrtitle'];
    var titleName = text.value;

    var form = document.querySelectorAll('input[name="question"]')
    var usrQuestions = []
    form.forEach(element => usrQuestions.push(element.value))
    state.allQuizzez[titleName] = [usrQuestions]
    BackHome()

}

function MoreFields() {
    questionsCounter++
    question = QuestionForm();
    question.id = question.id + questionsCounter;

    var insertHere = document.getElementById('addquestion');
    insertHere.parentNode.insertBefore(question, insertHere);
}

function DeleteField() {
    let node = document.getElementById(this.parentNode.id)
    node.remove()
}

function BackButton(clickHandler) {
    var button = e("input", { "type": "button", "value": "Home", click: clickHandler },)
    headerContainer.appendChild(button);
}

function AddButton(clickHandler) {
    var button = e("input", { "type": "button", "value": "Add quiz", click: clickHandler },)
    headerContainer.appendChild(button);
}

function SubmitButton(clickHandler) {
    let button = e("input", { "type": "button", "value": "Submit", click: clickHandler },)
    headerContainer.appendChild(button);
}

function AddQuestionButton(clickHandler) {
    let button = e("input", { "type": "button", "id": "addquestion", "value": "Add question", click: clickHandler },)
    headerContainer.appendChild(button);
}

function DeleteQuestionButton(clickHandler) {
    let button = e("input", { "type": "button", "id": "deleteQuestion", "value": "Delete question", click: clickHandler },)

    return button
}

function HeaderRun() {
    headerContainer.innerHTML = ''
    let headerCreate = e("header", {}, [e("h1", {}, ["RUN"])])
    headerContainer.appendChild(headerCreate);
}

function HeaderCreate() {
    headerContainer.innerHTML = ''
    let headerCreate = e("header", {}, [e("h1", {}, ["Create"])])
    headerContainer.appendChild(headerCreate);
}

function QuestionForm() {
    let deleteButton = DeleteQuestionButton(DeleteField)
    let question = e('form', { 'id': 'writeroot' },
        [e("h5", { ["style"]: ["float:left"] }, ["New question: "]),
        e('input', { 'type': 'text', 'name': 'question' },),
            deleteButton]);

    return question
}

function Form() {
    let nameForm = e('form', { 'id': 'readroot' },
        [e("h3", {}, ["TITLE: "]),
        e('input', { 'type': 'text', 'name': 'usrtitle' },)]);
    headerContainer.appendChild(nameForm)

    let question = QuestionForm()

    headerContainer.appendChild(question)
}

function refresh() {

    switch (state.page) {
        case "home":
            {

                HeaderHome()
                AddButton(NewQuiz)
                Quizzez()
                break
            }

        case "create":
            {
                HeaderCreate()
                SubmitButton(Submit);
                BackButton(BackHome)
                Form()
                AddQuestionButton(MoreFields)
                break
            }

        case "Run":
            {
                HeaderRun()

            }


        default: break;
    }
}

refresh();