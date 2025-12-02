
let allPosts = [];
let currentPage = 1;
const limit = 10;

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=50");
  allPosts = await res.json();

  renderPage();
  renderPagination();
}

function renderPage() {
  const container = document.getElementById("albumGrid");
  container.innerHTML = "";

  const start = (currentPage - 1) * limit;
  const end = start + limit;

  const pagePosts = allPosts.slice(start, end);

  pagePosts.forEach(post => {
    const card = `
      <div class="rounded-xl overflow-hidden shadow-sm bg-white">
          <img src="https://picsum.photos/500?random=${post.id}" 
               class="w-full h-[250px] object-cover"/>
      </div>
    `;
    container.innerHTML += card;
  });
}

function renderPagination() {
  const totalPages = Math.ceil(allPosts.length / limit);
  const pagination = document.getElementById("pagination");

  pagination.innerHTML = "";


  pagination.innerHTML += `
    <li>
      <button 
        onclick="changePage(${currentPage - 1})"
        class="px-4 py-2 rounded-lg bg-gray-200"
        ${currentPage === 1 ? "disabled" : ""}
      >
        Prev
      </button>
    </li>
  `;

  
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li>
        <button 
          onclick="changePage(${i})"
          class="px-4 py-2 rounded-lg 
          ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}"
        >
          ${i}
        </button>
      </li>
    `;
  }

  
  pagination.innerHTML += `
    <li>
      <button 
        onclick="changePage(${currentPage + 1})"
        class="px-4 py-2 rounded-lg bg-gray-200"
        ${currentPage === totalPages ? "disabled" : ""}
      >
        Next
      </button>
    </li>
  `;
}

function changePage(page) {
  const totalPages = Math.ceil(allPosts.length / limit);

  if (page < 1 || page > totalPages) return;

  currentPage = page;
  renderPage();
  renderPagination();
}

getPosts();
