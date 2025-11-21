// async function getPosts() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=60");
//   const posts = await res.json();
//   renderPosts(posts);
// }

// async function renderPosts(posts) {
//   const container = document.getElementById("albumGrid");
//   container.innerHTML = ""; 

//   posts.forEach(post => {
//     const card = `
//       <div class="rounded-xl overflow-hidden shadow-sm bg-white">
//           <img src="https://picsum.photos/500?random=${post.id}" 
//                class="w-full h-[250px] object-cover"/>
//       </div>
//     `;
//     container.innerHTML += card;
//   });
// }

// getPosts();








let posts = [];
let currentPage = 1;
const limit = 10;

// 60 ta rasm olish
async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=60");
  posts = await res.json();
  renderPage();
  renderPagination();
}

function renderPage() {
  const container = document.getElementById("albumGrid");
  container.innerHTML = "";

  const start = (currentPage - 1) * limit;
  const end = start + limit;
  const pageItems = posts.slice(start, end);

  pageItems.forEach(post => {
    const card = `
      <div class="rounded-xl overflow-hidden shadow-sm bg-white">
          <img 
            src="https://picsum.photos/500?random=${post.id}" 
            class="w-full h-[250px] object-cover"
          />
      </div>
    `;
    container.innerHTML += card;
  });
}

function renderPagination() {
  const totalPages = Math.ceil(posts.length / limit); // 60 / 10 = 6
  const pagination = document.getElementById("pagination");

  pagination.innerHTML = "";

  // ◀ PREV
  pagination.innerHTML += `
    <li>
      <button 
        onclick="changePage(${currentPage - 1})"
        class="px-3 py-1 border rounded disabled:opacity-40"
        ${currentPage === 1 ? "disabled" : ""}
      >◀</button>
    </li>
  `;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li>
        <button 
          onclick="changePage(${i})"
          class="px-3 py-1 border rounded ${i === currentPage ? "bg-black text-white" : ""}"
        >${i}</button>
      </li>
    `;
  }

  // ▶ NEXT
  pagination.innerHTML += `
    <li>
      <button 
        onclick="changePage(${currentPage + 1})"
        class="px-3 py-1 border rounded disabled:opacity-40"
        ${currentPage === totalPages ? "disabled" : ""}
      >▶</button>
    </li>
  `;
}

function changePage(page) {
  const totalPages = Math.ceil(posts.length / limit);
  if (page < 1 || page > totalPages) return;

  currentPage = page;
  renderPage();
  renderPagination();
}

getPosts();

