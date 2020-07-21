const state = {
    page:"home",
    allQuizzez:[]
}
var headerContainer = document.getElementById('Header');
headerContainer.appendChild(getHeader());

var quizzezContainer = document.getElementById('Quizzes');
var createNewQueez = document.getElementById('Create');
var runQuizzez = document.getElementById('Run');

function addTagNode(tag, atrr, childNodes){
    const node = document.createElement(tag);
    childNodes = childNodes || [];
    childNodes = typeof childNodes == "string"
        ? [childNodes]
        : childNodes;
    
    childNodes.map(e => typeof e == "string" ? document.createTextNode(e) : e)
              .forEach(n =>  node.appendChild(n));
    
    return node;
}

function getHeader() {
    return addTagNode("header", {},
                    [addTagNode("h1", {}, ["QUIZZEZ"]),
                    addTagNode("p", {}, ["Click Add to create a new quiz"]),
                    addTagNode("p", {}, ["Click Edit to edit existing quiz"]),
                    addTagNode("p", {}, ["Click Run to run selected quiz"])]
                    );
}

function getNewQuiz(){
    state.page ="create";
    refresh();
}

function showQuizzez(){
    
}

function refresh(){
    switch(state.page)
    {
        case "home":
            {
                if(state.allQuizzez.length != 0){
                
                    showQuizzez();
                }break;
            }
            
        case "create":
            window.location="create.html";
            break;

        default: break;
    }
}

refresh();