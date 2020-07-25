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

function Header() {
    var header =  e("header", {},
                    [e("h1", {}, ["QUIZZEZ"]),
                    e("p", {["style"]:["color:red"]}, ["Click Add to create a new quiz"]),
                    e("p", {["style"]:["color:yellow"]}, ["Click Edit to edit existing quiz"]),
                    e("p", {["style"]:["color:blue"]}, ["Click Run to run selected quiz"])]
                    );

    headerContainer.appendChild(header);
}

function showQuizzez(){
    
}

function refresh(){
    switch(state.page)
    {
        case "home":
            {
                Header();
            }
            
        case "create":
            break;

        default: break;
    }
}

refresh();