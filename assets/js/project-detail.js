/**
 * Project Detail renderer (project-detail.html)
 * ---------------------------------------------------------------
 * Hybrid content model:
 *   1. STATIC  -> edited by hand in the `projects` object below
 *                 (title, summary, challenge, solution, features, ...)
 *   2. DYNAMIC -> refreshed from the GitHub REST API on page load
 *                 (repo description, language, stars, last update, canonical URL)
 *
 * Usage: project-detail.html?slug=dicoding-event
 * Unknown / missing slug falls back to the first project.
 *
 * Repo button behaviour:
 *   - repoUrl empty            -> disabled "Repository Unavailable" button
 *   - GitHub API answers 404   -> disabled "Repository Unavailable" button
 *   - API blocked / offline     -> button stays active, static data is kept
 */

(function () {
  "use strict";

  var SITE_NAME = "Taufiqur Rohman";
  var GITHUB_API = "https://api.github.com/repos/";
  var CACHE_PREFIX = "ghrepo:";
  var CACHE_TTL = 30 * 60 * 1000; // 30 minutes
  var FETCH_TIMEOUT = 8000; // 8 seconds

  /* ------------------------------------------------------------------
   * 1) STATIC PROJECT DATA  (edit this block when a project changes)
   * ------------------------------------------------------------------ */
  var projects = {
    "dicoding-event": {
      title: "Dicoding Event App",
      category: "Android Development",
      date: "February 2025",
      role: "Sole Developer",
      duration: "3 weeks",
      team: "Solo project",
      architecture: "MVVM + Clean Architecture",
      cover: "assets/img/portfolio/event.webp",
      gallery: [
        "assets/img/portfolio/event.webp",
        "assets/img/portfolio/portfolio-4.webp",
        "assets/img/portfolio/portfolio-6.webp",
        "assets/img/portfolio/portfolio-11.webp"
      ],
      tech: ["Kotlin", "MVVM", "Retrofit", "Room", "Hilt", "Coroutines", "Material Design"],
      summary: "A production-style Android app for browsing Dicoding events, built as the final submission of the Intermediate Android class. It focuses on a clean architecture, reliable networking, and an offline-friendly experience.",
      overview: "The app fetches the latest events from a REST API and presents them in a fast, searchable feed. Event details can be marked as favorites and are cached locally, so the app stays useful without a connection. Dependency injection, a strict MVVM layering, and unit tests keep the codebase easy to extend and maintain.",
      challenge: "Event data comes from an endpoint that must stay responsive on slow networks, while users expect instant feedback when searching, filtering, and saving favorites. The challenge was to keep the UI snappy and the data consistent between the remote API and the local database, without leaking business logic into the views.",
      solution: "I separated the app into clear layers: repository as a single source of truth, Room as the local cache, and ViewModels exposing observable UI state. Networking runs on Retrofit + coroutines with structured error handling, Hilt handles injection, and instrumented + unit tests cover the critical paths (repository mapping, ViewModel state, and favorite behaviour).",
      features: [
        "Event feed with live search and category filters",
        "Favorite events persisted with Room database",
        "Event detail page with map and registration deep links",
        "Single source of truth caching (network + local)",
        "Dependency injection with Hilt",
        "Unit and instrumentation tests on core flows"
      ],
      repoUrl: "https://github.com/taufiqurrohman132/dicoding-event-android",
      liveUrl: null,
      nextSlug: "dicoding-story",
      metaDescription: "Dicoding Event App — Android app built with Kotlin, MVVM, Retrofit and Room by Taufiqur Rohman. Architecture, challenge, solution and source code.",
      repoFallback: {
        description: "Aplikasi Android yang menampilkan daftar event dicoding terkini. Dibangun dengan arsitektur modern, sebagai Project Submission dari Dicoding level Intermediate",
        language: "Kotlin",
        stars: 1,
        updatedAt: "2026-09-21"
      }
    },

    "dicoding-story": {
      title: "Dicoding Story App",
      category: "Android Development",
      date: "July 2025",
      role: "Sole Developer",
      duration: "4 weeks",
      team: "Solo project",
      architecture: "MVVM + Paging 3",
      cover: "assets/img/portfolio/story.webp",
      gallery: [
        "assets/img/portfolio/story.webp",
        "assets/img/portfolio/portfolio-5.webp",
        "assets/img/portfolio/portfolio-7.webp",
        "assets/img/portfolio/portfolio-8.webp"
      ],
      tech: ["Kotlin", "MVVM", "Paging 3", "CameraX", "WorkManager", "Google Maps", "Retrofit"],
      summary: "A social story-sharing app built for the Dicoding Expert (IDCamp scholarship) submission, covering the full mobile development lifecycle: authentication, media upload, infinite feeds, and location-aware content.",
      overview: "Users can register, log in, publish photo stories from the camera or gallery, and browse an endless feed of stories from the community. Each story can carry a location that is shown on an interactive map, and uploads keep running in the background even when the app is not in focus.",
      challenge: "An unbounded feed can easily become slow or memory-hungry, image uploads fail on flaky connections, and token-based sessions must stay secure across screens. The task was to deliver all of it while keeping the UI smooth and the architecture consistent with production standards.",
      solution: "I used Paging 3 for the infinite feed with a network+cache strategy, CameraX for capture, and WorkManager so uploads continue in the background with retry support. Auth tokens are stored encrypted and injected at the network layer, ViewModels expose immutable state, and error/loading states are handled centrally so the UI never guesses.",
      features: [
        "Infinite scrolling story feed powered by Paging 3",
        "Publish stories from camera (CameraX) or gallery",
        "Background upload with retry via WorkManager",
        "Story locations visualized on Google Maps",
        "Secure token storage and session handling",
        "Consistent loading, empty and error states"
      ],
      repoUrl: "https://github.com/taufiqurrohman132/story-android",
      liveUrl: null,
      nextSlug: "dicoding-resep-makanan",
      metaDescription: "Dicoding Story App — Android app built with Kotlin, Paging 3, CameraX and WorkManager by Taufiqur Rohman. Case study, features and source code.",
      repoFallback: {
        description: "aplikasi Android Story sederhana yang saya kembangkan sebagai bagian dari Submission kelas Android Mahir Dicoding melalui program beasiswa IDCamp.",
        language: "Kotlin",
        stars: 1,
        updatedAt: "2025-09-20"
      }
    },

    "dicoding-resep-makanan": {
      title: "Dicoding Resep Masakan App",
      category: "Android Development",
      date: "October 2024",
      role: "Sole Developer",
      duration: "1 week",
      team: "Solo project",
      architecture: "Layered Architecture",
      cover: "assets/img/portfolio/masak.webp",
      gallery: [
        "assets/img/portfolio/masak.webp",
        "assets/img/portfolio/portfolio-1.webp",
        "assets/img/portfolio/portfolio-2.webp",
        "assets/img/portfolio/portfolio-10.webp"
      ],
      tech: ["Kotlin", "RecyclerView", "Material Design", "Resource Formatting", "Adaptive Layout"],
      summary: "The foundational project of my Android journey: a recipe browsing app created for the Dicoding beginner class, focused on solid fundamentals, clean resource handling, and a polished Material Design interface.",
      overview: "The app shows a curated list of recipes in a responsive grid, with a detail screen for ingredients and steps. Content is delivered through proper Android resources (strings, dimens, images) so the interface adapts cleanly across screen sizes and stays ready for localization.",
      challenge: "Even a seemingly simple list app has to stay readable and maintainable: content must live outside the code, layouts must adapt from small phones to tablets, and the UI must follow Material guidelines without becoming cluttered.",
      solution: "I built the interface with RecyclerView adapters kept intentionally small, all user-facing text stored in string resources, and dimensions/images managed as resources for consistency. The screen hierarchy was designed around the content so a first-time user understands the app immediately.",
      features: [
        "Recipe list rendered with RecyclerView",
        "Detail screen with ingredients and steps",
        "All copy stored in string resources",
        "Dimension and image resources for consistency",
        "Responsive layout across screen sizes",
        "Material Design components and theming"
      ],
      repoUrl: null, // TEMP TEST: verifying "Repository Unavailable" state
      liveUrl: null,
      nextSlug: "dicoding-event",
      metaDescription: "Dicoding Resep Masakan App — beginner Android project in Kotlin with RecyclerView and Material Design by Taufiqur Rohman.",
      repoFallback: {
        description: "Aplikasi Android sederhana yang menyajikan beberapa resep masakan dalam format list interaktif. Dirancang untuk memenuhi submission akhir kelas Memulai Pemrograman Android",
        language: "Kotlin",
        stars: 1,
        updatedAt: "2025-08-03"
      }
    }
  };

  /* ------------------------------------------------------------------
   * 2) Helpers
   * ------------------------------------------------------------------ */
  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    var node = byId(id);
    if (node) node.textContent = value == null || value === "" ? "—" : value;
  }

  function getSlug() {
    try {
      return new URLSearchParams(window.location.search).get("slug");
    } catch (e) {
      return null;
    }
  }

  function resolveProject() {
    var slug = getSlug();
    if (slug && projects[slug]) return { slug: slug, project: projects[slug] };
    var first = Object.keys(projects)[0];
    return { slug: first, project: projects[first] };
  }

  function formatDate(value) {
    if (!value) return null;
    var date = new Date(value);
    if (isNaN(date.getTime())) return value;
    try {
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    } catch (e) {
      return value;
    }
  }

  function parseRepoUrl(url) {
    if (!url) return null;
    var match = String(url).match(/github\.com\/([^/]+)\/([^/#?]+)/i);
    if (!match) return null;
    return { owner: match[1], repo: match[2].replace(/\.git$/i, "") };
  }

  function cacheRead(key) {
    try {
      var raw = window.localStorage.getItem(CACHE_PREFIX + key);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || !parsed.t || Date.now() - parsed.t > CACHE_TTL) return null;
      return parsed.data;
    } catch (e) {
      return null;
    }
  }

  function cacheWrite(key, data) {
    try {
      window.localStorage.setItem(
        CACHE_PREFIX + key,
        JSON.stringify({ t: Date.now(), data: data })
      );
    } catch (e) {
      /* storage full / private mode: ignore */
    }
  }

  /* ------------------------------------------------------------------
   * 3) Static render (works offline, no GitHub required)
   * ------------------------------------------------------------------ */
  function renderRepoButton(project, options) {
    var slot = byId("pd-repo-slot");
    if (!slot) return;
    options = options || {};

    slot.innerHTML = "";

    var url = options.unavailable ? null : project.repoUrl;

    if (!url) {
      var unavailable = document.createElement("span");
      unavailable.className = "btn-repo btn-repo-disabled";
      unavailable.setAttribute("role", "link");
      unavailable.setAttribute("aria-disabled", "true");
      unavailable.setAttribute("tabindex", "-1");
      unavailable.setAttribute("title", "Source code is not available for this project");
      unavailable.innerHTML = '<i class="bi bi-lock"></i><span>Repository Unavailable</span>';
      slot.appendChild(unavailable);
      return;
    }

    var link = document.createElement("a");
    link.className = "btn-view-project btn-repo";
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.innerHTML = '<i class="bi bi-github"></i><span>View Repository</span>';
    slot.appendChild(link);
  }

  function renderSlider(project) {
    var wrapper = byId("pd-slider");
    if (!wrapper) return;
    wrapper.innerHTML = "";

    project.gallery.forEach(function (src, index) {
      var slide = document.createElement("div");
      slide.className = "swiper-slide";
      var img = document.createElement("img");
      img.src = src;
      img.alt = project.title + " screenshot " + (index + 1);
      img.className = "img-fluid";
      img.loading = index === 0 ? "eager" : "lazy";
      slide.appendChild(img);
      wrapper.appendChild(slide);
    });
  }

  function renderThumbs(project) {
    var wrap = byId("pd-thumbs");
    if (!wrap) return;
    wrap.innerHTML = "";

    project.gallery.forEach(function (src, index) {
      var col = document.createElement("div");
      col.className = "col-3";
      var img = document.createElement("img");
      img.src = src;
      img.alt = project.title + " thumbnail " + (index + 1);
      img.className = "img-fluid glightbox";
      img.loading = "lazy";
      img.setAttribute("data-gallery", "project-gallery");
      img.setAttribute("data-glightbox", "title: " + project.title);
      col.appendChild(img);
      wrap.appendChild(col);
    });

    // main.js initialised GLightbox before these nodes existed, bind them now.
    if (typeof window.GLightbox === "function") {
      try {
        window.GLightbox({ selector: ".glightbox" });
      } catch (e) {
        /* lightbox is a nice-to-have */
      }
    }
  }

  function renderTech(project) {
    var wrap = byId("pd-tech");
    if (!wrap) return;
    wrap.innerHTML = "";

    project.tech.forEach(function (item) {
      var span = document.createElement("span");
      span.textContent = item;
      wrap.appendChild(span);
    });
  }

  function renderFeatures(project) {
    var wrap = byId("pd-features");
    if (!wrap) return;
    wrap.innerHTML = "";

    var half = Math.ceil(project.features.length / 2);
    [project.features.slice(0, half), project.features.slice(half)].forEach(function (chunk) {
      if (!chunk.length) return;
      var col = document.createElement("div");
      col.className = "col-md-6";
      var list = document.createElement("ul");
      list.className = "feature-list";
      chunk.forEach(function (feature) {
        var li = document.createElement("li");
        var icon = document.createElement("i");
        icon.className = "bi bi-check2-circle";
        li.appendChild(icon);
        li.appendChild(document.createTextNode(" " + feature));
        list.appendChild(li);
      });
      col.appendChild(list);
      wrap.appendChild(col);
    });
  }

  function renderStatic(resolved) {
    var project = resolved.project;
    var fallback = project.repoFallback || {};

    // Head / breadcrumbs
    document.title = project.title + " — Project Details | " + SITE_NAME;
    var meta = byId("meta-description");
    if (meta) meta.setAttribute("content", project.metaDescription || project.summary);
    setText("pd-page-title", project.title);
    setText("pd-breadcrumb", project.title);

    // Media
    renderSlider(project);
    renderThumbs(project);
    renderTech(project);

    var repoNote = byId("pd-repo-description");
    if (repoNote) {
      if (project.repoUrl && fallback.description) {
        repoNote.innerHTML = '<i class="bi bi-github"></i> ';
        repoNote.appendChild(document.createTextNode(fallback.description));
      } else {
        repoNote.hidden = true;
      }
    }

    // Header block
    setText("pd-category", project.category);
    setText("pd-date", project.date);
    setText("pd-role", project.role);
    setText("pd-title", project.title);
    setText("pd-summary", project.summary);
    setText("pd-overview", project.overview);
    setText("pd-challenge", project.challenge);
    setText("pd-solution", project.solution);

    // Live demo link (hidden when there is nothing to demo)
    var liveBox = byId("pd-livewebsite");
    var liveBtn = byId("pd-live-demo");
    if (project.liveUrl) {
      var liveLink = byId("pd-livewebsite-link");
      if (liveLink) {
        liveLink.href = project.liveUrl;
        liveLink.textContent = project.liveUrl.replace(/^https?:\/\//, "");
      }
      if (liveBox) liveBox.hidden = false;
      if (liveBtn) {
        liveBtn.href = project.liveUrl;
        liveBtn.hidden = false;
      }
    }

    // Facts card
    setText("pd-fact-role", project.role);
    setText("pd-fact-duration", project.duration);
    setText("pd-fact-team", project.team);
    setText("pd-fact-architecture", project.architecture);
    setText("pd-fact-language", fallback.language);
    setText(
      "pd-fact-stars",
      typeof fallback.stars === "number" ? String(fallback.stars) : null
    );
    setText("pd-fact-updated", formatDate(fallback.updatedAt));
    setText("pd-fact-source", project.repoUrl ? "Public" : "Not available");

    renderFeatures(project);

    // Repository button + next project
    renderRepoButton(project);

    var nextBtn = byId("pd-next-project");
    if (nextBtn) {
      if (project.nextSlug && projects[project.nextSlug]) {
        nextBtn.href = "project-detail.html?slug=" + encodeURIComponent(project.nextSlug);
        nextBtn.hidden = false;
      }
    }
  }

  /* ------------------------------------------------------------------
   * 4) Dynamic layer: GitHub REST API (description, stars, last push)
   * ------------------------------------------------------------------ */
  function fetchRepo(owner, repo) {
    var key = owner + "/" + repo;
    var cached = cacheRead(key);
    if (cached) return Promise.resolve(cached);

    var controller = typeof AbortController === "function" ? new AbortController() : null;
    var timer = null;
    if (controller) timer = setTimeout(function () { controller.abort(); }, FETCH_TIMEOUT);

    return fetch(GITHUB_API + encodeURIComponent(owner) + "/" + encodeURIComponent(repo), {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller ? controller.signal : undefined
    })
      .then(function (response) {
        if (timer) clearTimeout(timer);
        if (response.status === 404) {
          var err = new Error("repository not found");
          err.status = 404;
          throw err;
        }
        if (!response.ok) {
          var failed = new Error("github error " + response.status);
          failed.status = response.status;
          throw failed;
        }
        return response.json();
      })
      .then(function (data) {
        cacheWrite(key, data);
        return data;
      })
      .catch(function (error) {
        if (timer) clearTimeout(timer);
        throw error;
      });
  }

  function applyGithubMeta(project, data) {
    if (!data) return;

    // Canonical URL protects against repo renames / transfers.
    if (data.html_url && byId("pd-repo-slot") && byId("pd-repo-slot").querySelector("a")) {
      byId("pd-repo-slot").querySelector("a").href = data.html_url;
    }

    if (data.language) setText("pd-fact-language", data.language);
    if (typeof data.stargazers_count === "number") {
      setText("pd-fact-stars", String(data.stargazers_count));
    }
    if (data.pushed_at) setText("pd-fact-updated", formatDate(data.pushed_at));
    if (data.visibility || data.default_branch) {
      setText(
        "pd-fact-source",
        (data.visibility ? data.visibility.charAt(0).toUpperCase() + data.visibility.slice(1) : "Public") +
        (data.default_branch ? " · " + data.default_branch : "")
      );
    }

    if (data.description) {
      var note = byId("pd-repo-description");
      if (note && project.repoUrl) {
        note.hidden = false;
        note.innerHTML = '<i class="bi bi-github"></i> ';
        note.appendChild(document.createTextNode(data.description));
      }
    }
  }

  function enhanceFromGithub(project) {
    var repo = parseRepoUrl(project.repoUrl);
    if (!repo) return; // no repo configured: static disabled button stays

    fetchRepo(repo.owner, repo.repo)
      .then(function (data) {
        applyGithubMeta(project, data);
      })
      .catch(function (error) {
        // 404 = repo is private / deleted -> switch to the unavailable state.
        // Anything else (rate limit, offline, CORS) -> keep static data and
        // leave the repository button active: do not show a false negative.
        if (error && error.status === 404) {
          renderRepoButton(project, { unavailable: true });
          setText("pd-fact-source", "Not available");
          var note = byId("pd-repo-description");
          if (note) note.hidden = true;
        }
      });
  }

  /* ------------------------------------------------------------------
   * 5) Boot
   * ------------------------------------------------------------------ */
  try {
    var resolved = resolveProject();
    renderStatic(resolved);
    enhanceFromGithub(resolved.project);
  } catch (error) {
    // Never leave a blank page because of a rendering error.
    if (window.console && console.warn) console.warn("project-detail:", error);
  }
})();
