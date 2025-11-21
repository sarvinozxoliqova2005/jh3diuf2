
async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=100");
  const posts = await res.json();
  renderPosts(posts);
}

async function renderPosts(posts) {
  const container = document.getElementById("albumGrid");
  container.innerHTML = "";

  posts.forEach(post => {
    const card = `
      <div class="rounded-xl overflow-hidden shadow-sm bg-white p-4">

        <!-- Rasm -->
        <a href="./album_single.html?Id=${post.id}">
        <img 
          src="https://picsum.photos/500?random=${post.id}" 
          class="w-full h-[250px] object-cover rounded-lg"
        />
        </a>

        <!-- Pastki qismi -->
        <div class="flex items-center justify-between mt-3">
          
          <!-- Title + photo count -->
          <div>
            <p class="font-medium text-gray-800">${post.title}</p>
            <p class="text-gray-500 text-sm">50 photos</p>
          </div>

          <!-- Arrow -->
          <a href="./album_single.html?Id=${post.id}" 
             class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-xl mt-3">
            →
          </a>

        </div>
      </div>
    `;

    container.innerHTML += card;
  });
}

getPosts();







// let allPosts = [];
// let currentPage = 1;
// const limit = 10;

// // --- API-dan malumot olish
// async function getPosts() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=60");
//   allPosts = await res.json();

//   renderPage();
//   renderPagination();
// }

// // --- Har bir sahifani chiqarish
// function renderPage() {
//   const container = document.getElementById("albumGrid");
//   container.innerHTML = "";

//   const start = (currentPage - 1) * limit;
//   const end = start + limit;

//   const pagePosts = allPosts.slice(start, end);

//   pagePosts.forEach(post => {
//     const card = `
//       <div class="rounded-xl overflow-hidden shadow-sm bg-white p-4">

//         <!-- Rasm -->
//         <a href="./album_single.html?Id=${post.id}">
//           <img 
//             src="https://picsum.photos/500?random=${post.id}" 
//             class="w-full h-[250px] object-cover rounded-lg"
//           />
//         </a>

//         <!-- Title + pastki qismi -->
//         <div class="flex items-center justify-between mt-3">
//           <div>
//             <p class="font-medium text-gray-800">${post.title}</p>
//             <p class="text-gray-500 text-sm">50 photos</p>
//           </div>

//           <a href="./album_single.html?Id=${post.id}" 
//              class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-xl mt-3">
//             →
//           </a>
//         </div>
//       </div>
//     `;

//     container.innerHTML += card;
//   });
// }

// // --- Pagination tugmalarini chiqarish
// function renderPagination() {
//   const totalPages = Math.ceil(allPosts.length / limit);
//   const pagination = document.getElementById("pagination");

//   pagination.innerHTML = "";

//   // PREVIOUS
//   pagination.innerHTML += `
//     <button 
//       onclick="changePage(${currentPage - 1})"
//       class="px-4 py-2 bg-gray-200 rounded-lg"
//       ${currentPage === 1 ? "disabled" : ""}
//     >Prev</button>
//   `;

//   // Raqamlar
//   for (let i = 1; i <= totalPages; i++) {
//     pagination.innerHTML += `
//       <button 
//         onclick="changePage(${i})"
//         class="px-4 py-2 rounded-lg 
//         ${i === currentPage ? "bg-black text-white" : "bg-gray-200"}"
//       >${i}</button>
//     `;
//   }

//   // NEXT
//   pagination.innerHTML += `
//     <button 
//       onclick="changePage(${currentPage + 1})"
//       class="px-4 py-2 bg-gray-200 rounded-lg"
//       ${currentPage === totalPages ? "disabled" : ""}
//     >Next</button>
//   `;
// }

// // --- Sahifa almashtirish
// function changePage(page) {
//   const totalPages = Math.ceil(allPosts.length / limit);

//   if (page < 1 || page > totalPages) return;

//   currentPage = page;
//   renderPage();
//   renderPagination();
// }

// getPosts();
