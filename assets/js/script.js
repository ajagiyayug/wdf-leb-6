document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // 1. Persistent Light/Dark Theme Switcher Logic
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-theme');
    if (themeToggle) themeToggle.checked = true;
  } else {
    document.documentElement.classList.remove('dark-theme');
    if (themeToggle) themeToggle.checked = false;
  }

  if (themeToggle) {
    themeToggle.addEventListener('change', function () {
      if (this.checked) {
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // ==========================================
  // 2. Hamburger Menu Logic
  // ==========================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');

  if (hamburgerBtn && sidebar) {
    hamburgerBtn.addEventListener('click', function () {
      sidebar.classList.toggle('active');
    });
  }

  // ==========================================
  // 3. Notification Banner Logic
  // ==========================================
  const closeBannerBtn = document.getElementById('closeBannerBtn');
  const notificationBanner = document.getElementById('notificationBanner');

  if (closeBannerBtn && notificationBanner) {
    closeBannerBtn.addEventListener('click', function () {
      notificationBanner.style.display = 'none';
    });
  }

  // ==========================================
  // 4. Collapsible FAQ Accordion Logic
  // ==========================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function () {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));

      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // ==========================================
  // 5. Image/Content Slider Logic
  // ==========================================
  const track = document.getElementById('sliderTrack');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const indicatorsContainer = document.getElementById('sliderIndicators');

  if (track && slides.length > 0) {
    let currentIndex = 0;

    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(dot);
    });

    const updateSlider = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    };

    const goToSlide = (index) => {
      currentIndex = index;
      updateSlider();
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
      });
    }
  }

  // ==========================================
  // 6. Modal Popup Logic Setup
  // ==========================================
  const modal = document.getElementById('customModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalActionBtn = document.getElementById('modalActionBtn');

  const closeModal = () => modal && modal.classList.remove('active');

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalActionBtn) {
    modalActionBtn.addEventListener('click', () => {
      alert("Registration Successful!");
      closeModal();
    });
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  // ==========================================
  // 7. Form Validation Logic (FIXED & WORKING)
  // ==========================================
// ==========================================
  // 7. Form Validation Logic (WITH REAL-TIME ERROR REMOVAL)
  // ==========================================
  const form = document.getElementById('register-form');

  if (form) {
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const mobile = document.getElementById('mobile');
    const course = document.getElementById('course');
    const year = document.getElementById('year');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    // Error Display Helpers
    function showError(input, errorId) {
      const errElem = document.getElementById(errorId);
      if (errElem) errElem.style.display = 'block';
      if (input) input.classList.add('is-invalid');
    }

    function hideError(input, errorId) {
      const errElem = document.getElementById(errorId);
      if (errElem) errElem.style.display = 'none';
      if (input) input.classList.remove('is-invalid');
    }

    // Validation Regex Rules
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // ==========================================
    // Real-Time Validation Listeners (Instant Error Removal)
    // ==========================================
    if (fullName) {
      fullName.addEventListener('input', () => {
        if (nameRegex.test(fullName.value.trim())) hideError(fullName, 'nameError');
      });
    }

    if (email) {
      email.addEventListener('input', () => {
        if (emailRegex.test(email.value.trim())) hideError(email, 'emailError');
      });
    }

    if (mobile) {
      mobile.addEventListener('input', () => {
        if (mobileRegex.test(mobile.value.trim())) hideError(mobile, 'mobileError');
      });
    }

    if (course) {
      course.addEventListener('change', () => {
        if (course.value !== '') hideError(course, 'courseError');
      });
    }

    if (year) {
      year.addEventListener('change', () => {
        if (year.value !== '') hideError(year, 'yearError');
      });
    }

    if (password) {
      password.addEventListener('input', () => {
        if (passwordRegex.test(password.value)) hideError(password, 'passwordError');
        if (confirmPassword.value && confirmPassword.value === password.value) {
          hideError(confirmPassword, 'confirmPasswordError');
        }
      });
    }

    if (confirmPassword) {
      confirmPassword.addEventListener('input', () => {
        if (confirmPassword.value !== '' && confirmPassword.value === password.value) {
          hideError(confirmPassword, 'confirmPasswordError');
        }
      });
    }

    if (terms) {
      terms.addEventListener('change', () => {
        if (terms.checked) hideError(terms, 'termsError');
      });
    }

    const genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        hideError(null, 'genderError');
      });
    });

    // Live Password Strength Indicator
    if (password && strengthBar && strengthText) {
      password.addEventListener('input', () => {
        const val = password.value;
        let strength = 0;

        if (val.length >= 8) strength++;
        if (/[A-Z]/.test(val)) strength++;
        if (/[0-9]/.test(val)) strength++;
        if (/[^A-Za-z0-9]/.test(val)) strength++;

        switch (strength) {
          case 0:
          case 1:
            strengthBar.style.width = '25%';
            strengthBar.style.backgroundColor = 'red';
            strengthText.innerText = 'Weak';
            break;
          case 2:
          case 3:
            strengthBar.style.width = '60%';
            strengthBar.style.backgroundColor = 'orange';
            strengthText.innerText = 'Medium';
            break;
          case 4:
            strengthBar.style.width = '100%';
            strengthBar.style.backgroundColor = 'green';
            strengthText.innerText = 'Strong';
            break;
        }
      });
    }

    // Submit Validation with Regex
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      // 1. Full Name
      if (!nameRegex.test(fullName.value.trim())) {
        showError(fullName, 'nameError');
        isValid = false;
      } else {
        hideError(fullName, 'nameError');
      }

      // 2. Email Address
      if (!emailRegex.test(email.value.trim())) {
        showError(email, 'emailError');
        isValid = false;
      } else {
        hideError(email, 'emailError');
      }

      // 3. Mobile Number
      if (!mobileRegex.test(mobile.value.trim())) {
        showError(mobile, 'mobileError');
        isValid = false;
      } else {
        hideError(mobile, 'mobileError');
      }

      // 4. Gender Selection
      const selectedGender = document.querySelector('input[name="gender"]:checked');
      if (!selectedGender) {
        showError(null, 'genderError');
        isValid = false;
      } else {
        hideError(null, 'genderError');
      }

      // 5. Course Dropdown
      if (course.value === '') {
        showError(course, 'courseError');
        isValid = false;
      } else {
        hideError(course, 'courseError');
      }

      // 6. Year Dropdown
      if (year.value === '') {
        showError(year, 'yearError');
        isValid = false;
      } else {
        hideError(year, 'yearError');
      }

      // 7. Password
      if (!passwordRegex.test(password.value)) {
        showError(password, 'passwordError');
        isValid = false;
      } else {
        hideError(password, 'passwordError');
      }

      // 8. Confirm Password
      if (confirmPassword.value === '' || confirmPassword.value !== password.value) {
        showError(confirmPassword, 'confirmPasswordError');
        isValid = false;
      } else {
        hideError(confirmPassword, 'confirmPasswordError');
      }

      // 9. Terms Acceptance
      if (!terms.checked) {
        showError(terms, 'termsError');
        isValid = false;
      } else {
        hideError(terms, 'termsError');
      }

      // Final Success
      if (isValid) {
        alert('Form Submitted successfully!');
        form.reset();
        if (strengthBar) strengthBar.style.width = '0%';
        if (strengthText) strengthText.innerText = '';
      }
    });
  }

  // ==========================================
  // 8. Dynamic Semester Result Logic
  // ==========================================
  const semesterSelect = document.getElementById('semesterSelect');

  const resultsData = {
    "4": {
      semester: "Semester 4",
      sgpa: "8.80",
      credits: "17",
      subjects: [
        { code: "CS401", name: "Database Management Systems", credits: 4, gradePoint: 9, letterGrade: "A+" },
        { code: "CS402", name: "Operating Systems", credits: 4, gradePoint: 8, letterGrade: "A" },
        { code: "CS403", name: "Design & Analysis of Algorithms", credits: 4, gradePoint: 9, letterGrade: "A+" },
        { code: "CS404", name: "Software Engineering", credits: 3, gradePoint: 9, letterGrade: "A+" },
        { code: "CS405", name: "DBMS Lab", credits: 2, gradePoint: 10, letterGrade: "O" }
      ]
    },
    "3": {
      semester: "Semester 3",
      sgpa: "8.50",
      credits: "18",
      subjects: [
        { code: "CS301", name: "Data Structures & Algorithms", credits: 4, gradePoint: 8, letterGrade: "A" },
        { code: "CS302", name: "Computer Organization & Architecture", credits: 4, gradePoint: 8, letterGrade: "A" },
        { code: "CS303", name: "Object Oriented Programming", credits: 4, gradePoint: 9, letterGrade: "A+" },
        { code: "CS304", name: "Discrete Mathematics", credits: 4, gradePoint: 9, letterGrade: "A+" },
        { code: "CS305", name: "OOP Lab", credits: 2, gradePoint: 9, letterGrade: "A+" }
      ]
    },
    "2": {
      semester: "Semester 2",
      sgpa: "8.90",
      credits: "16",
      subjects: [
        { code: "CS201", name: "Programming in C++", credits: 4, gradePoint: 9, letterGrade: "A+" },
        { code: "CS202", name: "Digital Electronics", credits: 4, gradePoint: 9, letterGrade: "A+" },
        { code: "MA201", name: "Engineering Mathematics II", credits: 4, gradePoint: 8, letterGrade: "A" },
        { code: "PH201", name: "Engineering Physics", credits: 4, gradePoint: 9, letterGrade: "A+" }
      ]
    },
    "1": {
      semester: "Semester 1",
      sgpa: "8.60",
      credits: "16",
      subjects: [
        { code: "CS101", name: "Programming in C", credits: 4, gradePoint: 8, letterGrade: "A" },
        { code: "MA101", name: "Engineering Mathematics I", credits: 4, gradePoint: 9, letterGrade: "A+" },
        { code: "EE101", name: "Basic Electrical Engineering", credits: 4, gradePoint: 8, letterGrade: "A" },
        { code: "HU101", name: "Technical Communication", credits: 4, gradePoint: 9, letterGrade: "A+" }
      ]
    }
  };

  function renderSemesterResult(semKey) {
    const data = resultsData[semKey];
    if (!data) return;

    const displaySemester = document.getElementById('displaySemester');
    const displaySgpa = document.getElementById('displaySgpa');
    const displayCredits = document.getElementById('displayCredits');
    const resultTableBody = document.getElementById('resultTableBody');

    if (displaySemester) displaySemester.innerText = data.semester;
    if (displaySgpa) displaySgpa.innerText = data.sgpa;
    if (displayCredits) displayCredits.innerText = data.credits;

    if (resultTableBody) {
      resultTableBody.innerHTML = '';
      data.subjects.forEach(sub => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${sub.code}</td>
          <td>${sub.name}</td>
          <td>${sub.credits}</td>
          <td>${sub.gradePoint}</td>
          <td><span class="badge badge-primary">${sub.letterGrade}</span></td>
        `;
        resultTableBody.appendChild(row);
      });
    }
  }

  if (semesterSelect) {
    semesterSelect.addEventListener('change', function () {
      renderSemesterResult(this.value);
    });

    renderSemesterResult(semesterSelect.value);
  }

  // ==========================================
  // 9. COMPLETE EVENT MODULE (Fetch, Search, Filter, Sort, Pagination)
  // ==========================================
  const eventsContainer = document.getElementById('eventsContainer');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortBy = document.getElementById('sortBy');
  const paginationControls = document.getElementById('paginationControls');
  const paginationInfo = document.getElementById('paginationInfo');

  let rawEvents = [];
  let filteredEvents = [];
  let currentPage = 1;
  const itemsPerPage = 4;

  function loadEventsData() {
    if (!eventsContainer) return;

    fetch('events.json')
      .then(response => {
        if (!response.ok) throw new Error('File not found or CORS restriction');
        return response.json();
      })
      .then(data => {
        rawEvents = data;
        applyFiltersAndSort();
      })
      .catch(err => {
        console.warn("Fetch Error (Falling back to default array):", err);
        rawEvents = [
          { id: 1, title: "Smart India Hackathon 2026", category: "Hackathon", date: "2026-10-15", location: "Main Auditorium", description: "24-hour continuous coding challenge.", enrolled: 150 },
          { id: 2, title: "Web Development Workshop", category: "Workshop", date: "2026-10-20", location: "Computer Lab 3", description: "Learn modern frontend stack using HTML, CSS, JS.", enrolled: 85 },
          { id: 3, title: "Annual Sports Meet", category: "Sports", date: "2026-11-05", location: "Sports Complex", description: "Inter-department football and cricket matches.", enrolled: 210 },
          { id: 4, title: "Cultural Fest 2026", category: "Cultural", date: "2026-12-01", location: "Open Theatre", description: "Annual music and dance stage events.", enrolled: 300 }
        ];
        applyFiltersAndSort();
      });
  }

  function applyFiltersAndSort() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'All';
    const selectedSort = sortBy ? sortBy.value : 'date-asc';

    filteredEvents = rawEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(query) ||
                            event.description.toLowerCase().includes(query) ||
                            event.location.toLowerCase().includes(query);
                            
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    filteredEvents.sort((a, b) => {
      if (selectedSort === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (selectedSort === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (selectedSort === 'title-asc') return a.title.localeCompare(b.title);
      if (selectedSort === 'popular') return b.enrolled - a.enrolled;
      return 0;
    });

    currentPage = 1;
    renderEventsList();
  }

  function renderEventsList() {
    if (!eventsContainer) return;
    eventsContainer.innerHTML = '';

    if (filteredEvents.length === 0) {
      eventsContainer.innerHTML = `<p class="no-data">No matching campus events found.</p>`;
      if (paginationInfo) paginationInfo.innerText = "Showing 0 of 0 events";
      if (paginationControls) paginationControls.innerHTML = "";
      return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredEvents.slice(startIndex, endIndex);

    paginatedItems.forEach(event => {
      const card = document.createElement('div');
      card.className = 'card event-card';
      card.innerHTML = `
        <div class="event-card-header">
          <span class="badge badge-primary">${event.category}</span>
          <span class="event-date">📅 ${event.date}</span>
        </div>
        <h3 class="event-title">${event.title}</h3>
        <p class="event-location">📍 <strong>Venue:</strong> ${event.location}</p>
        <p class="event-description">${event.description}</p>
        <div class="event-footer">
          <small class="enrolled-count">👥 ${event.enrolled} Students Enrolled</small>
          <button class="btn btn-primary btn-sm view-details-btn" data-id="${event.id}">View Details</button>
        </div>
      `;
      eventsContainer.appendChild(card);
    });

    document.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const eventId = parseInt(this.getAttribute('data-id'));
        openEventModal(eventId);
      });
    });

    renderPaginationControls();
  }

  function renderPaginationControls() {
    const totalItems = filteredEvents.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    if (paginationInfo) {
      paginationInfo.innerText = `Showing ${startItem}-${endItem} of ${totalItems} events`;
    }

    if (!paginationControls) return;
    paginationControls.innerHTML = '';

    if (totalPages <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.className = `btn btn-sm ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerText = '‹ Prev';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderEventsList();
      }
    });
    paginationControls.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.className = `btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-secondary-outline'}`;
      pageBtn.innerText = i;
      pageBtn.addEventListener('click', () => {
        currentPage = i;
        renderEventsList();
      });
      paginationControls.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = `btn btn-sm ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.innerText = 'Next ›';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderEventsList();
      }
    });
    paginationControls.appendChild(nextBtn);
  }

  function openEventModal(eventId) {
    const event = rawEvents.find(e => e.id === eventId);
    if (!event || !modal) return;

    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (modalTitle) modalTitle.innerText = event.title;
    if (modalBody) {
      modalBody.innerHTML = `
        <p><strong>Category:</strong> <span class="badge">${event.category}</span></p>
        <p><strong>Date:</strong> 📅 ${event.date}</p>
        <p><strong>Venue:</strong> 📍 ${event.location}</p>
        <p><strong>Enrolled Students:</strong> 👥 ${event.enrolled}</p>
        <hr style="margin: 0.5rem 0; border: 0; border-top: 1px solid var(--border);">
        <p><strong>About Event:</strong> ${event.description}</p>
      `;
    }

    modal.classList.add('active');
  }

  if (searchInput) searchInput.addEventListener('input', applyFiltersAndSort);
  if (categoryFilter) categoryFilter.addEventListener('change', applyFiltersAndSort);
  if (sortBy) sortBy.addEventListener('change', applyFiltersAndSort);

  loadEventsData();

});