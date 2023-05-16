async function init(){
    await loadIdentity();
}

async function addCompany(){
    let type = document.querySelector('input[name="health_cbo"]:checked').value;
    let name = document.getElementById("group").value
    let address = document.getElementById("address").value
    let number = document.getElementById("phone").value
    let email = document.getElementById("email").value
    let about = document.getElementById("about").value


    await fetchJSON("/api/company", {
        method: 'POST',
        body: {type: type, 
               name: name,
               address: address,
               number: number,
               email: email,
               about: about}
    })

    document.getElementsByName("health_cbo").value = "";
    document.getElementById("group").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("about").value = "";
    returnHome()
}

async function returnHome(){
    location.replace("./index.html")
}