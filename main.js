const state = {
    page:"home",
    allQuizzez:[]
}
var headerContainer = document.getElementById('root');


function e(tag, atrr, childNodes){
    const node = document.createElement(tag);

    for (const property in atrr) {
        node.setAttribute(property, atrr[property]);
      }

    childNodes = childNodes || [];
    childNodes = typeof childNodes == "string"
        ? [childNodes]
        : childNodes;
    
    childNodes.map(e => typeof e == "string" ? document.createTextNode(e) : e)
              .forEach(n =>  node.appendChild(n));
    
    return node;
}

function HeaderHome() {
    headerContainer.innerHTML=''

    var header =  e("header", {},
                    [e("h1", {}, ["QUIZZEZ"]),
                    e("p", {["style"]:["color:red"]}, ["Click Add quiz to create a new quiz"]),
                    e("p", {["style"]:["color:yellow"]}, ["Click Edit to edit existing quiz"]),
                    e("p", {["style"]:[]}, ["Click Run to run selected quiz"])]
                    );

    headerContainer.appendChild(header);
}

function Quizzez(){
    if(state.allQuizzez.length == 0)
    {
         let empty = e("header", {"id":"empty"},[e("b", {}, ["No input yet"])]);

        headerContainer.appendChild(empty);
    }
}

function NewQUiz(){
    state.page='create'
    refresh();
    
}

function Submit(){
    console.log("am apasat pe submit")
    var form = document.getElementById('readroot');
    var text = form['usrtitle'];
    let usrName = text.value;

    var form = document.querySelectorAll('writeroot')
    console.log(form)

    state.allQuizzez = {name:usrName, questions:[quest], answers:[]}

}

function MoreFields(){
    let question = QuestionForm()
    
    var insertHere = document.getElementById('addquestion');
    insertHere.parentNode.insertBefore(question,insertHere);
}

function DeleteField(atr){
    var node = document.getElementById(atr.id)
    node.remove()
}

function AddButton(){
    var button = e ("input", {"type":"button", "value":"Add quiz", "onclick" : "NewQUiz()"},)
    headerContainer.appendChild(button);
}

function SubmitButton(){
    var button = e ("input", {"type":"button", "value":"Submit", "onclick" : "Submit()"},)
    headerContainer.appendChild(button);
}

function MoreQuestionsButton(){
    var button = e ("input", {"type":"button","id":"addquestion", "value":"Add question", "onclick" : "MoreFields()"},)
    headerContainer.appendChild(button);
}

function DeleteQuestionButton(){
    var button = e ("input", {"type":"button","id":"deleteQuestion", "value":"Delete question", "onclick" : "DeleteField(this.parentNode)"},)

    return button
}

function HeaderCreate(){
    headerContainer.innerHTML=''
    var headerCreate =  e("header", {},[e("h1", {}, ["Create"])])
    headerContainer.appendChild(headerCreate);
}

function QuestionForm()
{
    var deleteButton = DeleteQuestionButton()
    var question =  e('form',{'id':'writeroot'},
                    [e("h5", {["style"]:["float:left"]}, ["New question: "]),
                    e('input', {'type':'text', 'name':'question'},),
                    deleteButton]);

    return question
}

function Form(){
    var nameForm = e('form',{'id':'readroot'},
                [e("h3", {}, ["TITLE: "]),
                e('input', {'type':'text', 'name':'usrtitle'},)]);
    headerContainer.appendChild(nameForm)

    var question =  QuestionForm()

    headerContainer.appendChild(question)
}

function refresh(){

    switch(state.page)
    {
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
                SubmitButton();
                Form()
                MoreQuestionsButton()
                break
            }
            

        default: break;
    }
}

refresh();