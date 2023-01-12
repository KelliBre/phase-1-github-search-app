const form = document.querySelector("#github-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.target[0].value;
    fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(response => response.json())
    .then(response => {
        console.log(response.items[0]);
        //avatar_url, login, url
        const userList = document.getElementById('user-list');
        userList.innerHTML = "";
        response.items.map(item => {
            const li = document.createElement("li");
            const h2 = document.createElement('h2');
            h2.textContent = item.login;
            const img = document.createElement('img');
            img.src = item.avatar_url
            h2.addEventListener("click", e => displayUserRepo(item.login, e))

            li.append(h2, img,);
            userList.append(li);

        })


    })
form.reset()

})

function displayUserRepo(userName, e){
    const repoList = document.querySelector('#repos-list');
    repoList.innerHTML= "";
    e.preventDefault()
    fetch(`https://api.github.com/users/${userName}/repos`)
    .then(response => response.json())
    .then(response => {
        response.map(repo => {
            const h3 = document.createElement("h3");
            h3.textContent = repo.name;
            console.log(h3);

            const repoLi = document.createElement('li');
            repoLi.append(h3);
            repoList.append(repoLi);
            // repoLi.append

        })

    })
}
