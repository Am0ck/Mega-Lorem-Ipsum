async function createRec(){
    console.log('POST http://localhost:4567/dogs/')
    console.log('name: '+document.getElementById("formInputName").value)
    
    const rec = { 
        name: document.getElementById("formInputName").value,
        breed: document.getElementById("formInputBreed").value 
        
    };
    console.log('POST'+JSON.stringify(rec))
    const response = fetch("http://localhost:4567/dogs/", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(rec)
    });

    // Awaiting for the resource to be deleted
    const resData = 'resource deleted...';

    // Return response data 
    //loadTable("http://localhost:4567/", document.getElementById("tab"))
    return resData;
}
async function deleteRec(id) {
  
    // Awaiting fetch which contains 
    // method, headers and content-type
    // const respons = confirm("Are you sure you want to do that?");

    // console.log(respons);
    console.log('DEL http://localhost:4567/dogs/'+id)
//     const xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     document.getElementById("tab").removeChild(document.getElementById("tab").getElementsByTagName("tbody")[0]);
//   }
//   xhttp.open("DELETE", "http://localhost:4567/dogs/"+id);
//   xhttp.send();
    // $.ajax({
    //     type: "DELETE",
    //     url: "http://localhost:4567/dogs/"+id,
    //     data: data,
    //     success: function () { },
    //     error: function () { }
    // });
     const response = fetch("http://localhost:4567/dogs/"+id, {
         method: 'DELETE',
         headers: {
             'Content-type': 'application/json'
         }
     });

    // Awaiting for the resource to be deleted
    const resData = 'resource deleted...';

    // Return response data 
    //loadTable("http://localhost:4567/", document.getElementById("tab"))
    return resData;
}

async function loadTable(url, table){
    //const respons = confirm("Are you sure you want to do that?");

    //console.log(respons);
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    //const response = await fetch(url);
    //const { headers, rows } = await response.json();

    //tableHead.innerHTML = "<tr></tr>";
    table.removeChild(table.getElementsByTagName("tbody")[0]); // Remove first instance of body

    //table.tbody.innerHTML = "<tr></tr>";
    // console.log(JSON.parse(response));
    // console.log(rows);
    // for (const headerText of headers){
    //     const headerElement = document.createElement("th");
    //     headerElement.textContent = headerText;
    //     tableHead.querySelector("tr".appendChild(headerElement))
    // }

    // for (const row of response){
    //     const rowElement = document.createElement("tr");

    //     for (const cellText of row){
    //         const cellElement = document.createElement("td");

    //         cellElement.textContent = cellText;
    //         rowElement.appendChild(cellElement);
    //     }
    //     tableBody.appendChild(rowElement);
    // }

    //     rowElement.textContent = headerText;
    //     tableHead.querySelector("tr".appendChild(headerElement))
    // }

     fetch(url)
     .then((response) => response.text())
     .then((body) => {
         console.log(JSON.parse(body));
         const jso = JSON.parse(body);
         console.log('found '+jso.length);
         for(r of jso)
         {
            //let template = '<tr><td>'+r["name"]+'</td><td>'+r["breed"]+'</td><td><a class="btn btn-secondary" role="button">Edit</a></td><td><button onclick="deleteRec('+"'"+r["_id"]+"'"+')" class="btn btn-danger" type="submit">Delete</button></td></tr>';
            let template = '<tr><td>'+r["name"]+'</td><td>'+r["breed"]+'</td><td><a class="btn btn-secondary" role="button">Edit</a></td><td><button onclick="deleteRec('+"'"+r["_id"]+"'"+')" class="btn btn-danger" type="submit">Delete</button></td></tr>';
            console.log(r["name"]);

            //const rowElement = document.createElement("tr");
            //rowElement.appendChild("<td>"+r["name"]+"</td>")
            //tableBody.appendChild("<tr><td>"+r["name"]+"</td><td>"+r["breed"]+"</td></tr>");
            table.innerHTML += template;
         }
     }); 
    // const { headers, rows } = await response.json();
    
    // console.log(data);
}

loadTable("http://localhost:4567/", document.getElementById("tab"))