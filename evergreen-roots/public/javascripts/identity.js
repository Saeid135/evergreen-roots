let myIdentity = undefined;

async function loadIdentity(){
    let identity_div = document.getElementById("identity_div");

    try{
        let identityInfo = await fetchJSON(`api/users/myIdentity`)
        
        if(identityInfo.status == "loggedin"){
            myIdentity = identityInfo.userInfo.username;
            identity_div.innerHTML = `
            <p class="user-p">Signed in</p>
            <p class="user-q">(${escapeHTML(identityInfo.userInfo.username)})</p>
            <a href="signout"><div class="user-image"></div></a>`;
        } else { //logged out
            myIdentity = undefined;
            identity_div.innerHTML = `
            <p class="user-k">Not signed in</p>
            <a href="signin"><div class="user-image"></div></a>`;
        }
    } catch(error){
        myIdentity = undefined;
        identity_div.innerHTML = `<div>
        <button class="user-image" onclick="loadIdentity()">retry</button>
        Error loading identity: <span id="identity_error_span"></span>
        </div>`;
        document.getElementById("identity_error_span").innerText = error;
    }
}
