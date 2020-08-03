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
    for (var key in arg) {
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
        var quizzzez = e("header", { "id": "questionsTags" });
        for (var key in state.allQuizzez) {
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

function NewQUiz() {
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
    alert("QUiz submited!")

}

function MoreFields() {

    questionsCounter++
    question = QuestionForm();
    question.id = question.id + questionsCounter;

    var insertHere = document.getElementById('addquestion');
    insertHere.parentNode.insertBefore(question, insertHere);
}

function DeleteField(atr) {
    var node = document.getElementById(atr.id)
    node.remove()
}

function BackButton() {
    var button = e("input", { "type": "button", "value": "Home", "onclick": "BackHome()" },)
    headerContainer.appendChild(button);
}

function AddButton() {
    var button = e("input", { "type": "button", "value": "Add quiz", "onclick": "NewQUiz()" },)
    headerContainer.appendChild(button);
}

function SubmitButton(clickHandler) {
    var button = e("input", { "type": "button", "value": "Submit", click: clickHandler },)
    headerContainer.appendChild(button);
}

function MoreQuestionsButton() {
    var button = e("input", { "type": "button", "id": "addquestion", "value": "Add question", "onclick": "MoreFields()" },)
    headerContainer.appendChild(button);
}

function DeleteQuestionButton() {
    var button = e("input", { "type": "button", "id": "deleteQuestion", "value": "Delete question", "onclick": "DeleteField(this.parentNode)" },)

    return button
}

function HeaderRun() {
    headerContainer.innerHTML = ''
    var headerCreate = e("header", {}, [e("h1", {}, ["RUN"])])
    headerContainer.appendChild(headerCreate);
}

function HeaderCreate() {
    headerContainer.innerHTML = ''
    var headerCreate = e("header", {}, [e("h1", {}, ["Create"])])
    headerContainer.appendChild(headerCreate);
}

function QuestionForm() {
    var deleteButton = DeleteQuestionButton()
    var question = e('form', { 'id': 'writeroot' },
        [e("h5", { ["style"]: ["float:left"] }, ["New question: "]),
        e('input', { 'type': 'text', 'name': 'question' },),
            deleteButton]);

    return question
}

function Form() {
    var nameForm = e('form', { 'id': 'readroot' },
        [e("h3", {}, ["TITLE: "]),
        e('input', { 'type': 'text', 'name': 'usrtitle' },)]);
    headerContainer.appendChild(nameForm)

    var question = QuestionForm()

    headerContainer.appendChild(question)
}

function refresh() {

    switch (state.page) {
        case "home":
            {

                HeaderHome()
                AddButton()
                Quizzez()
                break
            }

        case "create":
            {
                HeaderCreate()
                SubmitButton(Submit);
                BackButton()
                Form()
                MoreQuestionsButton()
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