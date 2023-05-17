async function init(){
    await loadIdentity();
    loadCompanies();
}

async function loadCompanies(){
    document.getElementById("org_box").innerText = "Loading...";
    let companyJson = await fetchJSON(`api/company`)
    let companyHtml = `
        <div class="flex-container">
            <section class="company-section">
                <p class="results"><u>Results</u></p>
                <div class="company-container">
            `
    companyHtml += companyJson.map(companyInfo => {
        let htmlCompanies = `
        <div class="company">
        <p>${escapeHTML(companyInfo.name)}</p>
        <span class="date sub-text">${escapeHTML(companyInfo.type)}</span>
        </div>
        `
        return htmlCompanies;
    }).join("\n");
    companyHtml += `</div></section></div>`
    document.getElementById("org_box").innerHTML = companyHtml;
}