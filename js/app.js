(function() {
    const USERS_LINK = 'https://jsonplaceholder.typicode.com/users';
    const POSTS_LINK = 'https://jsonplaceholder.typicode.com/posts';

    let btnGetUsers = document.querySelector('.btnGetUsers')
    let usersList = document.querySelector('.users-list-body')
    let userPostsList = document.querySelector('.posts-list')
    let postsHeader = document.querySelector('.posts-list-header')

    let arrUsers = []
    let arrUserPosts = []

    //catch mouse clicks on all clickable elements inside contactList
    usersList.addEventListener("click", userList_Clicked)

    btnGetUsers.addEventListener('click', function() {
        //clear current list
        clearUsersList()

        //reload users lists from server
        getUsersList(USERS_LINK)
    })

    function userList_Clicked(elt) {
        let userId = parseInt(elt.target.getAttribute('data-id'))
            //alert('item ' + userId)

        //clear posts
        clearPostsList()

        //get all posts
        getPostsList(POSTS_LINK, userId)

        //display post filtering by userId

        //or get posts for userId only

        //display posts for current userId
    }

    function clearPostsList() {
        //clear current users list 
        arrUserPosts = []
        userPostsList.innerHTML = ''
    }

    function getPostsList(url, id) {
        fetch(url).then((response) => response.json()).then((data) => {
            console.log('Fetch Data', data)
            arrUserPosts = data
            let usr = arrUsers.find(el => el.id == id)
            postsHeader.textContent = "User " + usr.username + " posts"
            displayPostsList(id)
        })
    }

    function displayPostsList(id) {
        let userPosts = ''
            //let selectedPosts = arrUserPosts.filter(item => item.userId == id)

        arrUserPosts.forEach(function(item, i) {
            if (item.userId == id) {
                userPosts += `
                <li>
                <label>Title=${item.title} <br> ${item.body}</label>
                </li>
                `
                userPostsList.innerHTML = userPosts
            }
        })

    }

    function clearUsersList() {
        //clear current users list 
        arrUsers = []
        usersList.innerHTML = ''
    }

    function getUsersList(url) {
        fetch(url).then((response) => response.json()).then((data) => {
            console.log('Fetch Data', data)
            arrUsers = data
            displayUsersList()
        })
    }

    function displayUsersList() {
        let usersListItems = ''
        arrUsers.forEach(function(item, i) {
            usersListItems += `
                <div class="users-list-item">
                <label data-id="${item.id}">id=${item.id}; Name=${item.username}; Phone=${item.phone}</label>
                </div>
                `
            usersList.innerHTML = usersListItems
        })
    }

})();