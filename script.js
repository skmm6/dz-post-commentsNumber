const tbody = document.querySelector('#album-table > tbody')
const modalTitle = document.querySelector('#modalTitle')
const modalBody = document.querySelector('#modalBody')
const users = []

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
        json.forEach(user => {
            users.push(user)
        })

        renderAlbums()

    })

function renderAlbums() {

    fetch('https://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(json => {

            json.forEach(album => {

                let userData = users.find(user => user.id === album.userId)

                let tr = document.createElement('tr')

                let tdId = document.createElement('td')
                let tdTitle = document.createElement('td')
                let tdUsername = document.createElement('td')
                let tdEmail = document.createElement('td')

                tdId.textContent = album.id
                tdTitle.innerHTML = `<a href="#" class="modal-open" data-bs-toggle="modal" data-bs-target="#modal" data-album-id="${album.id}">${album.title}</a>`
                tdUsername.textContent = userData.name
                tdEmail.innerHTML = `<a href="mailto:${userData.email}">${userData.email}</a>`

                tr.append(tdId, tdTitle, tdUsername, tdEmail)

                tbody.append(tr)

            })

            const albumLinks = document.querySelectorAll('a[data-bs-target="#modal"]')

            albumLinks.forEach(link => {
                link.onclick = function (e) {
                    e.preventDefault()
                    modalTitle.textContent = this.textContent
                    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${this.getAttribute('data-album-id')}`)
                        .then(response => response.json())
                        .then(json => {
                            json.forEach(photo => {
                                modalBody.innerHTML += `
                                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                                    <a href="${photo.url}" class="d-block" data-lightbox="gallery">
                                        <img 
                                            class="img-thumbnail img-fluid rounded d-block w-100" 
                                            src="${photo.thumbnailUrl}">
                                    </a>
                                </div>
                                `
                            })
                        })
                }
            })

            $('#album-table').DataTable();

        })

}



const tbodypost = document.querySelector('#post-table > tbody')





    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
        json.forEach(user => {
            users.push(user)
        })

        renderPost()
        

    })

function renderPost() {

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {


            json.forEach(post => {

                let commentsNumber = 0

                fetch('https://jsonplaceholder.typicode.com/comments?postId=' + post.id)
                .then(response => response.json())
                .then(json => {
                   commentsNumber = json.length

                   let userData = users.find(user => user.id === post.userId)

                   let tr = document.createElement('tr')
   
                   let tdId = document.createElement('td')
                   let tdUserId = document.createElement('td')
                   let tdTitle = document.createElement('td')
                   let tdBody = document.createElement('td')
                   let tdComment = document.createElement('td')
   
                   tdId.textContent = post.id
                   tdUserId.textContent = userData.name
                   tdTitle.textContent = post.title
                   tdBody.textContent = post.body
                   tdComment.textContent = commentsNumber
   
                   tr.append(tdId, tdUserId, tdTitle, tdBody, tdComment)
   
                   tbodypost.append(tr)
   
                })
          
               
                
            })
           
        })
}
