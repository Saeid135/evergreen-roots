async function init(){
    await loadIdentity();
}

async function messageinit(){
    let identityInfo = await fetchJSON(`api/users/myIdentity`)
    if(identityInfo.status == "loggedin"){
        await loadIdentity();
        fillMessage();
    }
    else {
        location.replace('./signin')
    }
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
    location.replace("./")
}

async function prepareMessage() {
    location.replace('./sendmessage.html')
}

async function searchTerm() {
    document.getElementById("eliminate").style.display = "none";
    let orgName = document.getElementById("search_term").value;
    localStorage.setItem("orgName", orgName)
    let companyJson = await fetchJSON(`api/company/search?name=${orgName}`)
    let employeeJson = await fetchJSON(`api/employee/searchorg?name=${orgName}`)
    let companyHtml = `
    <div class="v3_107">
        <div class="v3_108"></div>
        <div class="v3_110">
            <a href="./">
                <div class="v3_111"></div>
            </a>
            `
    companyHtml += employeeJson.map(employeeInfo => {
        let htmlCompanies = `
            <span class="v3_112">Employees:</span>
            <div class="v3_114">
                <div class="v3_115"></div>
                <div class="v3_116">
                <p class="employee_detail_1"><b>Name:</b> ${escapeHTML(employeeInfo.name)}</p>
                <p class="employee_detail_2"><b>Position:</b> ${escapeHTML(employeeInfo.position)}</p>
                <p class="employee_detail_3"><b>Email:</b> ${escapeHTML(employeeInfo.email)}</p>                    
                </div>
            </div>
            <div class="v259_343" onClick="prepareMessage()">
                <div class="v259_344"></div>
                <span class="v259_345">Create Request Form</span>
            </div>
        </div>
        `
        return htmlCompanies;
    }).join("\n");


    companyHtml += companyJson.map(companyInfo => {
        let htmlCompanies = `
        <div class="v3_120"></div>
        <div class="v3_121">
            <p class="extra_detail"><b>Address:</b> ${escapeHTML(companyInfo.address)}</p>
            <p class="extra_detail"><b>Email:</b> ${escapeHTML(companyInfo.email)}</p>
            <p class="extra_detail"><b>Phone Number:</b> ${escapeHTML(companyInfo.number.toString())}</p>
            <p class="extra_detail" style="line-height:2.5em;"><b>About:</b> ${escapeHTML(companyInfo.about)}</p>
        </div>
        <span class="v3_109">${escapeHTML(companyInfo.name)}</span>
    </div>
        `
        return htmlCompanies;
    }).join("\n");
    document.getElementById("show_orgs").innerHTML = companyHtml;
    companyHtml += `</div>`
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

async function fillMessage(){
    let orgName = localStorage.getItem("orgName")
    let companyJson = await fetchJSON(`api/company/search?name=${orgName}`)
    let employeeJson = await fetchJSON(`api/employee/search?name=${orgName}`)
    let companyHtml = `
    <div class="v3_107">
        <div class="v3_108"></div>
        <div class="v3_110">
            <a href="./">
                <div class="v3_111"></div>
            </a>
            <span class="v3_112">Employees:</span>
            <div class="v259_343" onClick="addMessage()">
                <div class="v259_344"></div>
                <span class="v259_345">Send Message</span>
            </div>
        </div>
        <div class="v3_120"></div>
        `
    companyHtml += companyJson.map(companyInfo => {
    let htmlCompanies = `
        <span class="v3_109">Sending Request Message to Employees at ${escapeHTML(companyInfo.name)}</span>
        <div class="v1_640">
            <textarea class="v1_641" type="text" id="send_message" name="send_message" placeholder="Type Here..."
                rows="7"></textarea>
        </div>
    `
    return htmlCompanies;
    }).join("\n");

    companyHtml += employeeJson.map(employeeInfo => {
        let htmlCompanies = `
            <div class="v1_623">
                <div class="v1_624"></div><span class="v1_625">${escapeHTML(employeeInfo.name)}</span><span class="v1_626">${escapeHTML(employeeInfo.position)}</span>
            </div>
        </div>
        `
        return htmlCompanies;
        }).join("\n");
    document.getElementById("prepare_org_message").innerHTML = companyHtml;
}

async function addMessage(){
    let orgName = localStorage.getItem("orgName");
    let companyJson = await fetchJSON(`api/company/search?name=${orgName}`);
    let employeeJson = await fetchJSON(`api/employee/search?name=${orgName}`);
    let message = document.getElementById("send_message").value;
    let company = companyJson[0].name;
    let employeeName = employeeJson[0].name;
    let employeeEmail = employeeJson[0].email;

    await fetchJSON("/api/message", {
        method: 'POST',
        body: {company: company,
               employeeName: employeeName,
               employeeEmail: employeeEmail,
               message: message}
    })
    returnHome()
}

