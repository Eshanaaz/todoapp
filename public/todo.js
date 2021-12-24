const firebaseConfig = {
    apiKey: "AIzaSyAYBn5FBN4_1ueDuL9GjQQz6LQkNK6Gm_Q",
    authDomain: "todoapp-f6346.firebaseapp.com",
    databaseURL: "https://todoapp-f6346-default-rtdb.firebaseio.com",
    projectId: "todoapp-f6346",
    storageBucket: "todoapp-f6346.appspot.com",
    messagingSenderId: "1096984786140",
    appId: "1:1096984786140:web:57607255690a1eaf6c3019",
    measurementId: "G-5BQTBGFGH3"
  };

  const app = firebase.initializeApp(firebaseConfig);

  console.log(app.database)

  var database = app.database()

var listBox = document.getElementById("listBox")
function addTodo() {
    var input = document.getElementById("input")
    // console.log(input.value)


    if (input.value.length > 2) {

        var key = database.ref("/").push().key

        var todoObj = {
            key : key,
            todo : input.value
        }

        database.ref("todos").child(key).set(todoObj)



        

        input.value = ""

    } else {
        alert("enter correct value")
    }




}


database.ref("todos").on("child_added" , function(data){
            console.log(data.val().key)
            ///create element and li text//
        var li = document.createElement("li")
        var liTxt = document.createTextNode(data.val().todo)
        // li.innerHTML = input.value






        li.appendChild(liTxt)
        // console.log(li)

        ////create edit btn

        var editBtn = document.createElement("button")
        editBtn.innerHTML='<i class="fas fa-edit"></i>'
        var editBtnTxt = document.createTextNode("EDIT")
        editBtn.setAttribute("onclick", "editList(this)")
        editBtn.setAttribute("id" , data.val().key)
        editBtn.appendChild(editBtnTxt)
        // console.log(editBtn)
        li.appendChild(editBtn)
        ////create del btn 
        var delBtn = document.createElement("button")
        delBtn.innerHTML='<i class="fas fa-trash"></i>'
        var delBtnTxt = document.createTextNode("DEL")
        delBtn.setAttribute("onclick", "delList(this)")
        delBtn.setAttribute("id" , data.val().key)

        delBtn.appendChild(delBtnTxt)
        // console.log(delBtn)
        li.appendChild(delBtn)

        //li append in ul
        listBox.appendChild(li)
})


function delAll(){
            listBox.innerHTML = ""
            database.ref("/todos").remove()

        }

function editList(e){
    var litxt = e.parentNode.firstChild.nodeValue
    // console.log(litxt.nodeValue);
    var editLiTxt = prompt("EDIT TODO" , litxt )
    console.log(editLiTxt)
    e.parentNode.firstChild.nodeValue = editLiTxt

    console.log(e.id)
    database.ref("todos").child(e.id).update({
        todo : editLiTxt
    })
}


function delList(e){
    console.log(e.parentNode)
    e.parentNode.remove()
    console.log(e.id)
    database.ref("todos").child(e.id).remove()

}