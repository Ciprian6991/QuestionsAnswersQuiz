const state = {
    page: "home",
    allQuizzez: {
        'Masini': ['Ce marca?', 'Ce vechime?', 'Ce culoare?'],
        'Mancare': ['Fructe sau legume?', 'Cate calorii mananci pe zi?', 'Suc sau apa?']
    },
    allAnswers: {
        'Masini': {
            'Adrian': ['Skoda', '12 ani', 'Gri'],
            'Sabin': ['VW', '1 an', 'Negru']
        }
    },
    curentQuizID: ''
}

var questionsCounter = 0

var headerContainer = document.getElementById("root");


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

            let edit = EditQuizButton()
            let run = RunQuizButton(RUN)
            let del = DeleteQuizButton(DeleteQiuz)
            let res = ResultQuizButton(RESULTS)

            var questionArticle = e("header", { "id": key, "value": "questionTag" },
                [e("h1", {}, [key]),
                    res,
                    del,
                    edit,
                    run]);
            quizzzez.appendChild(questionArticle)
        }
        headerContainer.appendChild(quizzzez)
    }
}

function RESULTS() {
    state.page = "Results"
    state.curentQuizID = this.parentNode.id
    refresh();
}

function RUN() {
    state.page = "Run"
    state.curentQuizID = this.parentNode.id
    refresh();
}

function NewQuiz() {
    state.page = "create"
    refresh();

}

function BackHome() {
    state.page = "home"
    refresh()
}

function SubmitAnswerForm() {
    var form = document.getElementById('readroot');
    var text = form['usrtitle'];
    var titleName = text.value;
    var form = document.querySelectorAll("input[name='answer']")
    var usrAnswers = []
    form.forEach(element => usrAnswers.push(element.value))

    if (state.curentQuizID in state.allAnswers) {


        state.allAnswers[state.curentQuizID][titleName] = usrAnswers
    }
    else {
        state.allAnswers[state.curentQuizID] = {}
        state.allAnswers[state.curentQuizID][titleName] = usrAnswers
    }

    BackHome()
}

function SubmitQuestionForm() {
    var form = document.getElementById('readroot');
    var text = form['usrtitle'];
    var titleName = text.value;

    var form = document.querySelectorAll("input[name='question']")
    var usrQuestions = []
    form.forEach(element => usrQuestions.push(element.value))
    state.allQuizzez[titleName] = usrQuestions
    BackHome()

}

function MoreFields() {
    questionsCounter++
    question = QuestionForm();
    question.id = question.id + questionsCounter;

    var insertHere = document.getElementById("addquestion");
    insertHere.parentNode.insertBefore(question, insertHere);
}

function DeleteField() {
    let node = this.parentNode
    node.remove()
}

function DeleteQiuz() {
    delete state.allQuizzez[this.parentNode.id];
    delete state.allAnswers[this.parentNode.id]
    this.parentNode.remove()
    refresh()
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

function EditQuizButton(clickHandler) {
    let button = e("input", { "type": "button", "id": "editQuiz", "value": "EDIT", click: clickHandler },)

    return button
}

function RunQuizButton(clickHandler) {
    let button = e("input", { "type": "button", "id": "runQuiz", "value": "RUN", click: clickHandler },)

    return button
}

function DeleteQuizButton(clickHandler) {
    let button = e("input", { "type": "button", "id": "deleteQuiz", "value": "DELETE", click: clickHandler },)

    return button
}

function ResultQuizButton(clickHandler) {
    let button = e("input", { "type": "button", "id": "deleteQuiz", "value": "RESULTS", click: clickHandler },)

    return button
}

function Header(headerHandler) {
    headerContainer.innerHTML = ''

    var header = headerHandler()
    headerContainer.appendChild(header);
}

function HeaderHome() {

    let header = e("header", {},
        [e("h1", {}, ["QUIZZEZ"]),
        e("p", { ["style"]: ["color:red"] }, ["Click Add quiz to create a new quiz"]),
        e("p", { ["style"]: ["color:yellow"] }, ["Click Edit to edit existing quiz"]),
        e("p", { ["style"]: [] }, ["Click Run to run selected quiz"])]
    );

    return header;
}

function HeaderRun() {

    let header = e("header", {}, [e("h1", {}, ["RUN"])])
    return header
}

function HeaderResult() {
    let header = e("header", {}, [e("h1", {}, ["Results for " + state.curentQuizID])])
    return header
}

function HeaderCreate() {

    let header = e("header", {}, [e("h1", {}, ["Create"])])
    return header
}

function QuestionForm() {
    let deleteButton = DeleteQuestionButton(DeleteField)
    let question = e('form', { 'id': 'writeroot' },
        [e("h5", { ["style"]: ["float:left"] }, ["New question: "]),
        e("input", { "type": "text", "name": "question" },),
            deleteButton]);

    return question
}

function QuestionFormName() {
    return e("form", { "id": "readroot" },
        [e("h3", {}, ["TITLE: "]),
        e("input", { "type": "text", "name": "usrtitle" },)]);
}

function AnswerForm() {
    let index = 0
    let answerForms = e('form', { 'id': 'writeroot' },)

    state.allQuizzez[state.curentQuizID].forEach(question => {
        index++
        var answer = e('form', { 'id': 'writeroot' + index },
            [e("h5", { ["style"]: ["float:left", "clear:both"] },
                [e("h3", {}, question),
                e("input", { "type": "text", "name": "answer" },)])]);
        answerForms.appendChild(answer)
    }

    );

    return answerForms
}

function AnswerFormName() {
    return e("form", { "id": "readroot" },
        [e("h3", {}, ["Your Name: "]),
        e("input", { "type": "text", "name": "usrtitle" },)]);
}

function Form(formName, formHandler) {
    let nameForm = formName()
    headerContainer.appendChild(nameForm)

    let question = formHandler()
    headerContainer.appendChild(question)
}

function Result() {

    if (isEmpty(state.allAnswers[state.curentQuizID])) {
        let empty = e("header", { "id": "empty" }, [e("b", {}, ["No answers yet"])]);

        headerContainer.appendChild(empty);
    }
    else {

        let questionCounter = 0
        
        let answers = e("header", { "id": "answersTags" });
        for (let question in state.allQuizzez[state.curentQuizID]) {

            let curentAnswers = e("ul", { "id": "answers", "value": "answersTag" },)

            for(let user in state.allAnswers[state.curentQuizID]){
                let answer = e("li", { "id": "answer" + user, "value": "answerTag" },
                                user + ": " + state.allAnswers[state.curentQuizID][user][question])

                curentAnswers.appendChild(answer)
            }
            

            var answerArticle = e("label", { "id": "question" + questionCounter, "value": "questionTag" },
                [e("h1", {}, state.allQuizzez[state.curentQuizID][question]),
                curentAnswers]);
            answers.appendChild(answerArticle)
            questionCounter++
        }

        headerContainer.appendChild(answers)
    }
}

function refresh() {

    switch (state.page) {
        case "home":
            {
                Header(HeaderHome)
                AddButton(NewQuiz)
                Quizzez()
                break
            }

        case "create":
            {
                Header(HeaderCreate)
                SubmitButton(SubmitQuestionForm)
                BackButton(BackHome)
                Form(QuestionFormName, QuestionForm)
                AddQuestionButton(MoreFields)
                break
            }

        case "Run":
            {
                Header(HeaderRun)
                SubmitButton(SubmitAnswerForm)
                BackButton(BackHome)
                Form(AnswerFormName, AnswerForm)
                break
            }

        case "Results":
            {
                Header(HeaderResult)
                BackButton(BackHome)
                Result()
                break
            }


        default: break;
    }
}

refresh();