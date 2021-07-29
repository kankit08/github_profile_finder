const API_URL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function get_user(username){
    try {
        const { data } = await axios(API_URL + username)
        createUsercard(data);
        get_repos(username)
    } catch (error) {
        if(error.response.status === 404){
            createErrorCard('No profile with this username found')
        }
    }
    
}

async function get_repos(username){
    try {
        const { data } = await axios(API_URL + username + '/repos?sort=created')
        addReposToCard(data)

    } catch (error) {
        createErrorCard("Problem in fetching REPOSITORY data")
    }
}

function createUsercard(user){
    const cardHTML = `
    <div class="card">
    <div>
         <a href="${user.html_url}" target="_blank"><img src="${user.avatar_url}" alt="${user.name}"
        class="avatar"></a>
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>

        <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>

        <div class="repository">
            <h3>Latest Respos</h3>
        <div id="repos"></div>
        </div>
    </div>
</div>`

    main.innerHTML = cardHTML
}

function addReposToCard(repos){
    const repos_data = document.getElementById('repos')

    
    repos
    .slice(0,10)
    .forEach(repo => {
        const repos_element = document.createElement('a')
        repos_element.classList.add('repo')
        repos_element.href = repo.html_url
        repos_element.target = '_blank'
        repos_element.innerText = repo.name

        repos_data.appendChild(repos_element)
    })
}

function createErrorCard(msg){
    const cardHTML = `
    <div class = "card">
        <h1>${msg}</h1>
    </div>
    `
    main.innerHTML = cardHTML
}

form.addEventListener('submit', e => {
    e.preventDefault()

    const user = search.value

    if (user) {
        get_user(user)

        search.value = ''
    }
})
