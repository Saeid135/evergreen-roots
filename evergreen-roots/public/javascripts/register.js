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

async function searchTerm() {
    document.getElementById("eliminate").style.display = "none";
    let orgName = document.getElementById("search_term").value;
    let companyJson = await fetchJSON(`api/company/search?name=${orgName}`)
    let companyHtml = `
            `
    companyHtml += companyJson.map(companyInfo => {
        let htmlCompanies = `
        <div class="v3_107">
            <div class="v3_108">
                <span class="v3_109">${escapeHTML(companyInfo.name)}</span>
            </div>
            <div class="v3_110">
                <a href="./index.html">
                    <div class="v3_111"></div>
                </a>
                <span class="v3_112">Employees:</span>
                <span class="v3_113">Select
                    employees you want to message/send a request form </span>
                <div class="v3_114">
                    <div class="v3_115"></div>
                    <span class="v3_116">Name: James Evans
                        Job: Outreach Communications Lead
                        Phone Number: 123-456-7890
                        Email: james.evans@uw.edu</span>
                </div>
            </div>
            <div class="v3_120"></div>
            <div class="v3_121">
                <p class="extra_detail"><b>Address:</b> ${escapeHTML(companyInfo.address)}</p>
                <p class="extra_detail"><b>Email:</b> ${escapeHTML(companyInfo.email)}</p>
                <p class="extra_detail"><b>Phone Number:</b> ${escapeHTML(companyInfo.number.toString())}</p>
                <p class="extra_detail" style="line-height:2.5em;"><b>About:</b> ${escapeHTML(companyInfo.about)}
                </p>
            </div>
        </div>
        `
        return htmlCompanies;
    }).join("\n");
    companyHtml += `</div>`
    document.getElementById("show_orgs").innerHTML = companyHtml;
}

async function init(){
    await loadIdentity();
}

async function addEmployee(){
    let type = document.querySelector('input[name="health_cbo_both"]:checked').value;
    let group = document.getElementById("connect_group").value
    let position = document.getElementById("position").value
    let name = document.getElementById("your_name").value
    let email = document.getElementById("connect_email").value

    await fetchJSON("/api/employee", {
        method: 'POST',
        body: {type: type, 
               group: group,
               position: position,
               name: name,
               email: email}
    })

    document.getElementsByName("health_cbo_both").value = "";
    document.getElementById("connect_group").value = "";
    document.getElementById("position").value = "";
    document.getElementById("your_name").value = "";
    document.getElementById("connect_email").value = "";
    returnHome()
}