const endpoint = "https://api.github.com/users/";
let form = document.querySelector("form");
let inputUser = document.querySelector("input");
let rightContainer = document.querySelector(".right");

// ======================================================== Lấy database từ API
async function renderUser(data) {
    let newName, newBio, tem;
    data.name == null ? newName = data.login : newName = data.name;
    data.bio == null ? newBio = "~No biography~" : newBio = data.bio;
    if (data.name == undefined && data.login == undefined) {
        tem = ` <div class="card">
        <h2 class="not-found">User n
            <ion-icon name="logo-octocat"></ion-icon>t found !</h2>
        </div>`;
    } else {
        tem =
            `<div class="card">
            <div class="image"><img src="${data.avatar_url}" alt=""></div>
            <h1>${newName}</h1>
            <div class="text-wrapper">
                <p>${newBio}</p>
            </div>
            <div class="info-wrapper">
                <div class="followers btn"><span>${data.followers} Followers</span></div>
                <div class="following btn"><span>${data.following} Following</span></div>
                <div class="repos btn"><span>${data.public_repos} Repos</span></div>
            </div>
            <ul class="repos-wrapper">
            </ul>
        </div>`;
    }

    rightContainer.insertAdjacentHTML("beforeend", tem);
}

async function getUser(username) {
    const response = await fetch(`${endpoint}${username}`);
    const data = await response.json();
    await renderUser(data);
    await renderRepos(username);
}
async function renderRepos(username) {
    const response = await fetch(`${endpoint}${username}/repos?sort=created`);
    const data = await response.json();
    data.forEach(item => {
        let li = `<li>
        <a href="https://github.com/${username}/${item.name}"><span>${item.name}</span></a></li>`
        document.querySelector(".repos-wrapper").insertAdjacentHTML("beforeend", li);
    })
}

// Lấy giá trị nhập vào --> user name
form.addEventListener('submit', (e) => {
    e.preventDefault()
    rightContainer.innerHTML = "";
    getUser(inputUser.value);
})