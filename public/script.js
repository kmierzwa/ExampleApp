var form = document.getElementById('formx')
form.addEventListener("submit", passy)



function passy(e)
{
    e.preventDefault()

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function()
   {


   }

   var data=
   {
    "imie":e.target.firstname.value, 
    "nazwisko":e.target.lastname.value
   }
    xhttp.open("POST", "http://localhost:3000/add ", true);
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify(data));

}

