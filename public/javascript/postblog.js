// let postIndex = document.querySelectorAll('.card').length; // Start with the number of posts already rendered
// const postsPerPage = 2;



// document.getElementById('photo').addEventListener('change', function(event) {
//     const preview = document.getElementById('preview');
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = function(e) {
//         preview.src = e.target.result;
//         preview.style.display = 'block';
//     };

//     if (file) {
//         reader.readAsDataURL(file);
//     } else {
//         preview.src = '';
//         preview.style.display = 'none';
//     }
// });


// function fetchPosts() {
//     return fetch('/api/posts?offset=' + postIndex + '&limit=' + postsPerPage)
//         .then(response => response.json())
//         .then(data => {
//             postIndex += postsPerPage;
//             return data;
//         });
// }

// function createPostCard(post) {
//     const card = document.createElement('div');
//     card.className = 'card';
//     card.innerHTML = `
//         <img src="${post.photo}" alt="Post Image">
//         <h3>${post.username}</h3>
//         <p class="email">${post.email}</p>
//         <p>${post.paragraph}</p>
//     `;
//     return card;
// }

// function loadMorePosts() {
//     fetchPosts().then(posts => {
//         const postContainer = document.getElementById('post-container');
//         posts.forEach(post => {
//             const postCard = createPostCard(post);
//             postContainer.appendChild(postCard);
//         });
//     });
// }

// window.addEventListener('scroll', () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
//         loadMorePosts();
//     }
// });

// // No initial loadMorePosts() call, as the posts are already loaded server-side
