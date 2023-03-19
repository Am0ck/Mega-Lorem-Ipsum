window.onclick = function(event) {
    var modal = document.getElementById('exampleModal');
    if (event.target == modal) {
        localStorage.setItem("pop-up", "False");
    }
    
}
function refresh() {    
    setTimeout(function () {
        location.reload()
    }, 100);
}
function editFormRec(id){
    document.getElementById("editForm").style.visibility = 'visible';
    localStorage.setItem("editForm", "True");
    fetch("http://localhost:4567/dogs/"+id)
     .then((response) => response.text())
     .then((body) => {
         console.log(JSON.parse(body));
         const jso = JSON.parse(body);
         console.log('found '+jso["_id"]);
         //alert(id)
         localStorage.setItem("editId",id);
         document.getElementById("editId").value = jso["_id"];
         document.getElementById("formEditName").value = jso["name"];
         document.getElementById("formEditBreed").value = jso["breed"];
         document.getElementById("formEditWeight").value = jso["weight"];
         document.getElementById("formEditAge").value = jso["age"]; 
     });
    
}
async function editRec(){
    
    let valid = true;
    console.log('PUT http://localhost:4567/dogs/')
    let id = document.getElementById("editId").value;
    //alert(id)
    const rec = { 
        name: document.getElementById("formEditName").value,
        breed: document.getElementById("formEditBreed").value,
        weight: document.getElementById("formEditWeight").value,
        age: document.getElementById("formEditAge").value
    };
    let options = {    
        method: 'PUT',   
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(rec)  
    };
    if(rec.name == "" || rec.breed == "" || rec.weight == "" || rec.age ==""){
        alert("Please input all form data");
    }
    else{
        if(isNaN(rec.weight))
        {
            valid = false;
            alert("Please enter a numerical value for weight");    
        }
        if(isNaN(rec.age))
        {
            valid = false;
            alert("Please enter a numerical value for Age");    
        }
        if(valid)
        {
            fetch("http://localhost:4567/dogs/"+id, options)
            .then(response => response.json)
            .then(data => {   
                console.log("er")
                localStorage.setItem("editForm", "False");
                
            })
            .catch(error => console.log("er"));
            refresh();
        }
    }
    console.log(rec)
    console.log(JSON.stringify(rec))
//     alert("asd")
//    alert("rld")
    
}
function getState(){
    var saved = localStorage.getItem('pop-up');
    var saved_id = localStorage.getItem('del-id');
    var editId = localStorage.getItem('editId');
    var saved_edit_form = localStorage.getItem('editForm');
    // localStorage.setItem("editForm", "True");
    //alert(saved)
    if(saved == "True")
    {
        //alert("ads")
        confdeleteRec(saved_id);
        var myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
        myModal.show()
    }
    if(saved_edit_form == "True"){
        //document.getElementById("editForm").style.visibility = 'visible';
        //alert(editId)
        editFormRec(editId)
    }
}

function togglePop(){
    var saved = localStorage.getItem('pop-up');
    if (saved = "True")
    {
        var myModalEl = document.getElementById('exampleModal');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
    }
}
function onCancel () {
    //alert("cancel")
    localStorage.setItem("pop-up", "False");
    togglePop()
  }
async function createRec(){
    let valid = true;
    //alert("PSOT")
    console.log('POST http://localhost:4567/dogs/')
    console.log('name: '+document.getElementById("formInputName").value)
    
    const rec = { 
        name: document.getElementById("formInputName").value,
        breed: document.getElementById("formInputBreed").value,
        weight: document.getElementById("formInputWeight").value,
        age: document.getElementById("formInputAge").value 
        
    };
    if(rec.name == "" || rec.breed == "" || rec.weight == "" || rec.age ==""){
        alert("Please input all form data");
    }
    else{
        if(isNaN(rec.weight))
        {
            valid = false;
            alert("Please enter a numerical value for weight");    
        }
        if(isNaN(rec.age))
        {
            valid = false;
            alert("Please enter a numerical value for Age");    
        }
        if(valid)
        {
            console.log('POST'+JSON.stringify(rec))
            const response = fetch("http://localhost:4567/dogs/", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(rec)
            });
        }
        return;
    }
    const resData = 'resource added...';
    //alert(resData)
    refresh()
    return resData;
}
async function confdeleteRec(id){
    
    localStorage.setItem("pop-up", "True");
    localStorage.setItem("del-id", id);
    var saved = localStorage.getItem('pop-up');
    console.log(saved)
    const confirm = document.getElementById('confirm')
    const cancel = document.getElementById('cancel')
    const close = document.getElementById('close')

const promise = new Promise((resolve, reject) => {
  confirm.addEventListener('click', resolve)
  cancel.addEventListener('click', reject)
  close.addEventListener('click', reject)
})
    return await promise
    .then((ev) => {
        deleteRec(id)
      window.console.log(ev)
    })
    .catch(() => onCancel())
    return ""
}
async function deleteRec(id) {
    alert('DEL http://localhost:4567/dogs/'+id)
    console.log('DEL http://localhost:4567/dogs/'+id)
     const response = fetch("http://localhost:4567/dogs/"+id, {
         method: 'DELETE',
         headers: {
             'Content-type': 'application/json'
         }
     });
    const resData = 'resource deleted...';

    localStorage.setItem("pop-up", "False");
    refresh()
    return resData;
}

async function loadTable(url, table){
    console.log('loadTable')
    
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");

    table.removeChild(table.getElementsByTagName("tbody")[0]); // Remove first instance of body

     fetch(url)
     .then((response) => response.text())
     .then((body) => {
         console.log(JSON.parse(body));
         const jso = JSON.parse(body);
         console.log('found '+jso.length);
         for(r of jso)
         {
            let template = '<tr><td>'+r["name"]+'</td><td>'+r["breed"]+'</td>'+'<td>'+r["weight"]+'</td>'+'<td>'+r["age"]+'</td><td><button onclick="editFormRec('+"'"+r["_id"]+"'"+')" class="btn btn-secondary" role="button">Edit</button></td><td><button onclick="confdeleteRec('+"'"+r["_id"]+"'"+')" class="btn btn-danger" data-mdb-toggle="modal" data-mdb-target="#exampleModal" type="submit">Delete</button></td></tr>';
            console.log(r["name"]);
            table.innerHTML += template;
         }
     }); 
}

loadTable("http://localhost:4567/", document.getElementById("tab"))