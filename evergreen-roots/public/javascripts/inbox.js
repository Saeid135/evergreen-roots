async function init() {
    let identityInfo = await fetchJSON(`api/users/myIdentity`)
    if (identityInfo.status == "loggedin") {
        await loadIdentity();
        loadMessages();
    }
    else {
        location.replace('./signin')
    }
}

async function loadMessages() {
    // let username = document.getElementsByClassName("user-q").value;
    let identityInfo = await fetchJSON(`api/users/myIdentity`);
    let username = identityInfo.userInfo.username;
    let messageJson = await fetchJSON(`api/message/search?name=${username}`);
    if (messageJson.length < 1) {
        let messageHtml = `
        <div class="v1_1129">
            <span class="v49_137">RECENT MESSAGES</span>
        </div>
        <div class="v1_1165">
            <div class="v1_1174"><span class="v1_1175">You haven't received any messages yet!</span>
        </div>
    </div>`
    document.getElementById("fill_info").innerHTML = messageHtml;
    }
    else {
    let messageHtml = ``

    messageHtml += messageJson.map(messageInfo => {
        let htmlMessage = `
        <div class="v1_1129">
            <div class="v1_1130">
                <div class="v1_1131"><span class="v1_1132">${escapeHTML(messageInfo.employeeName)} of ${escapeHTML(messageInfo.company)}</span></div>
            </div>
            <span class="v49_137">RECENT MESSAGES</span>
        </div>
        <div class="v1_1165">
            <div class="v1_1166">
                <div class="v1_1167"></div><span class="v1_1168">${escapeHTML(messageInfo.employeeName)}</span><span class="v1_1169">${escapeHTML(messageInfo.employeeEmail)}</span>
            </div> 
            <span class="v1_1173">Message request sent by:</span>
            <div class="v1_1174"><span class="v1_1175">${escapeHTML(messageInfo.employeeName)} Request Message To You and Other Employees of ${escapeHTML(messageInfo.company)}</span>
            <div class="v1_1176"><span class="v1_1177">${escapeHTML(messageInfo.message)}</span></div>
            <div class="v1_1178"></div><span class="v1_1179">${messageInfo.created_date}</span>
        </div>
    </div>
        `
        return htmlMessage;
    }).join("\n");
    document.getElementById("fill_info").innerHTML = messageHtml;
}
}