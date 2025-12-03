
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





document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('main');
  const toggleIcon = document.getElementById('toggleIcon');

  toggleBtn.addEventListener('click', () => {
    // Sidebar width toggle
    sidebar.classList.toggle('w-64');
    sidebar.classList.toggle('w-20');

    // Main content margin toggle

    mainContent.classList.toggle('lg:ml-64');
    mainContent.classList.toggle('lg:ml-20');

    // Toggle icon rotate
    toggleIcon.classList.toggle('rotate-180');

    // Sidebar ichidagi textlarni toggle qilish
    const sidebarTextItems = sidebar.querySelectorAll('li span, li a, h1, p');
    sidebarTextItems.forEach(el => {
      if (!el.querySelector('img') && !el.querySelector('i')) {
        el.classList.toggle('hidden');
      }
    });

  });
});
