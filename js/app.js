const $ = id => document.getElementById(id);

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;",
    '"':"&quot;", "'":"&#39;"
  })[c]);
}

function goTo(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));

  const target = $(page);
  if (!target) return;

  target.classList.add("active");

  const nav = document.querySelector(`[data-page="${page}"].nav-item`);
  if (nav) nav.classList.add("active");

  $("pageName").textContent =
    page.charAt(0).toUpperCase() + page.slice(1);

  $("sidebar").classList.remove("open");

  if (page === "home") renderDashboard();
  if (page === "academy") renderLessons();
  if (page === "services") renderServices();
  if (page === "simulator") renderResources();
  if (page === "architecture") renderArchitecture();
  if (page === "monitoring") renderMonitoring();
  if (page === "quiz") renderQuiz();
  if (page === "glossary") renderGlossary();
}

document.addEventListener("click", event => {
  const button = event.target.closest("[data-page]");
  if (button) goTo(button.dataset.page);
});

$("menuToggle").addEventListener("click", () => {
  $("sidebar").classList.toggle("open");
});

function renderDashboard() {
  const completed = Store.completed();
  const resources = Store.resources();
  const scores = Store.scores();

  const progress = Math.round(completed.length / lessons.length * 100);
  const best = scores.length ? Math.max(...scores.map(s => s.score)) : 0;

  $("completedCount").textContent = completed.length;
  $("progressPercent").textContent = progress + "%";
  $("resourceCount").textContent = resources.length;
  $("bestScore").textContent = best + "%";
  $("progressBar").style.width = progress + "%";
  $("progressLabel").textContent = completed.length + " of " + lessons.length + " lessons";

  $("moduleProgress").innerHTML = lessons.slice(0, 5).map(l => `
    <div class="module-progress-row">
      <span>${escapeHTML(l.title)}</span>
      <span>${completed.includes(l.id) ? "✓ Completed" : "Not started"}</span>
    </div>
  `).join("");
}

function renderLessons(filter = "") {
  const completed = Store.completed();
  const filtered = lessons.filter(l =>
    (l.title + l.category + l.description).toLowerCase().includes(filter.toLowerCase())
  );

  $("lessonList").innerHTML = filtered.map(l => `
    <article class="lesson-card">
      <div class="card-icon">${l.icon}</div>
      <div class="card-meta">MODULE ${String(l.id).padStart(2,"0")} · ${escapeHTML(l.level)}</div>
      <h3>${escapeHTML(l.title)}</h3>
      <p>${escapeHTML(l.description)}</p>
      <div class="card-action">
        ${completed.includes(l.id) ? "✓ Completed · Review lesson" : "Start lesson →"}
      </div>
      <button class="btn secondary full open-lesson" data-id="${l.id}">
        Open module
      </button>
    </article>
  `).join("") || '<div class="empty-state">No lessons found.</div>';
}

function openLesson(id) {
  const lesson = lessons.find(l => l.id === Number(id));
  if (!lesson) return;

  const completed = Store.completed().includes(lesson.id);

  $("lessonContent").innerHTML = `
    <div class="page-intro">
      <div class="eyebrow">MODULE ${lesson.id} · ${escapeHTML(lesson.category)}</div>
      <h1>${lesson.icon} ${escapeHTML(lesson.title)}</h1>
      <p>${escapeHTML(lesson.description)}</p>
    </div>

    <div class="panel lesson-body">
      ${lesson.sections.map(([heading, content]) => `
        <h2>${escapeHTML(heading)}</h2>
        <p>${escapeHTML(content)}</p>
      `).join("")}

      <h2>Learning objectives</h2>
      <ul>${lesson.objectives.map(x => `<li>${escapeHTML(x)}</li>`).join("")}</ul>

      <div class="info-box">
        <strong>Remember:</strong> Understanding the concept is more important than memorizing service names.
      </div>

      <button class="btn primary" id="completeLesson" ${completed ? "disabled" : ""}>
        ${completed ? "✓ Lesson completed" : "Mark lesson as completed"}
      </button>
      <button class="btn secondary" id="backLesson">Back to modules</button>
    </div>
  `;

  goTo("lesson");

  $("completeLesson").addEventListener("click", () => {
    Store.finishLesson(lesson.id);
    showToast("Lesson completed successfully!");
    openLesson(lesson.id);
    renderDashboard();
  });

  $("backLesson").addEventListener("click", () => goTo("academy"));
}

$("lessonList").addEventListener("click", event => {
  const button = event.target.closest(".open-lesson");
  if (button) openLesson(button.dataset.id);
});

$("lessonSearch").addEventListener("input", e => renderLessons(e.target.value));

function renderServices(filter = "") {
  const filtered = services.filter(s =>
    s.join(" ").toLowerCase().includes(filter.toLowerCase())
  );

  $("serviceList").innerHTML = filtered.map(s => `
    <article class="service-card">
      <div class="card-icon">${s[1]}</div>
      <div class="card-meta">${escapeHTML(s[2])}</div>
      <h3>${escapeHTML(s[0])}</h3>
      <p>${escapeHTML(s[3])}</p>
      <div class="card-action">Learn about service →</div>
      <button class="btn secondary full service-learn" data-name="${escapeHTML(s[0])}">
        Explore service
      </button>
    </article>
  `).join("") || '<div class="empty-state">No services found.</div>';
}

$("serviceSearch").addEventListener("input", e => renderServices(e.target.value));

$("serviceList").addEventListener("click", event => {
  const button = event.target.closest(".service-learn");
  if (!button) return;

  const name = button.dataset.name;
  const module = lessons.find(l =>
    l.title.toLowerCase().includes(name.toLowerCase()) ||
    (name === "Route 53" && l.id === 9) ||
    (name === "CloudFront" && l.id === 9) ||
    (name === "DynamoDB" && l.id === 8) ||
    (name === "EBS" && l.id === 6) ||
    (name === "ELB" && l.id === 9)
  );

  if (module) openLesson(module.id);
  else showToast("Explore this service in the learning modules.");
});

function updateResourceOptions() {
  const type = $("resourceType").value;
  $("resourceOptions").innerHTML = Cloud.renderOptions(type);
}

$("resourceType").addEventListener("change", updateResourceOptions);

$("createResource").addEventListener("click", () => {
  try {
    const resource = Cloud.create(
      $("resourceType").value,
      $("resourceName").value,
      $("resourceRegion").value
    );

    $("resourceName").value = "";
    renderResources();
    renderDashboard();

    showToast(resource.type + " demo resource created!");
  } catch (error) {
    showToast(error.message);
  }
});

function renderResources() {
  const resources = Store.resources();

  $("resourceTotal").textContent = resources.length + " resources";

  $("resourceList").innerHTML = resources.length
    ? resources.map(r => `
      <div class="resource-item">
        <div>
          <strong>${Cloud.icons[r.type]} ${escapeHTML(r.name)}</strong>
          <small>${escapeHTML(r.type)} · ${escapeHTML(r.region)}</small>
          <small>ID: ${escapeHTML(r.id)}</small>
          <small>Status: ${escapeHTML(r.status)}</small>
        </div>
        <div class="resource-actions">
          <button class="small-action inspect-resource" data-id="${escapeHTML(r.id)}">View</button>
          <button class="small-action delete-resource" data-id="${escapeHTML(r.id)}">Delete</button>
        </div>
      </div>
    `).join("")
    : '<div class="empty-state">No virtual resources yet.<br>Create your first simulated cloud resource.</div>';
}


function openResourceDetails(resource) {
  let modal = document.getElementById("resourceDetailsModal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "resourceDetailsModal";
    modal.className = "resource-modal";
    modal.innerHTML = `
      <div class="resource-modal-backdrop" data-close-resource></div>
      <section class="resource-modal-card" role="dialog"
               aria-modal="true" aria-labelledby="resourceDetailTitle">
        <div class="resource-modal-header">
          <div>
            <div class="eyebrow">SAMCLOUD RESOURCE INSPECTOR</div>
            <h2 id="resourceDetailTitle">Resource details</h2>
          </div>
          <button class="resource-modal-close" data-close-resource
                  aria-label="Close details">×</button>
        </div>
        <div id="resourceDetailBody"></div>
        <div class="resource-modal-footer">
          <span>SIMULATION ONLY · NO REAL AWS RESOURCE</span>
          <button class="btn secondary" data-close-resource>Close</button>
        </div>
      </section>`;
    document.body.appendChild(modal);

    modal.addEventListener("click", event => {
      if (event.target.closest("[data-close-resource]")) {
        modal.classList.remove("visible");
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") modal.classList.remove("visible");
    });
  }

  const config = resource.config || {};
  const details = [
    ["Resource name", resource.name],
    ["Service", resource.type],
    ["Resource ID", resource.id],
    ["Region", resource.region],
    ["Status", resource.status],
    ["Created", resource.createdAt
      ? new Date(resource.createdAt).toLocaleString()
      : "Not available"]
  ];

  const configRows = Object.entries(config).length
    ? Object.entries(config).map(([key, value]) => `
        <div class="resource-detail-row">
          <span>${escapeHTML(key.replace(/([A-Z])/g, " $1"))}</span>
          <strong>${escapeHTML(value)}</strong>
        </div>`).join("")
    : '<p class="muted">No additional configuration saved.</p>';

  $("resourceDetailTitle").textContent =
    (Cloud.icons[resource.type] || "☁") + " " + resource.name;

  $("resourceDetailBody").innerHTML = `
    <div class="resource-detail-status">
      <span class="status-dot"></span>
      ${escapeHTML(resource.status)}
      <span>DEMO RESOURCE</span>
    </div>
    <h3>Resource information</h3>
    <div class="resource-detail-list">
      ${details.map(([key, value]) => `
        <div class="resource-detail-row">
          <span>${escapeHTML(key)}</span>
          <strong>${escapeHTML(value)}</strong>
        </div>`).join("")}
    </div>
    <h3 class="resource-config-heading">Configuration</h3>
    <div class="resource-detail-list">${configRows}</div>
    <div class="resource-detail-notice">
      This is a locally stored educational resource.
      Its status and configuration do not represent a live AWS service.
    </div>
    <button class="btn primary full" id="copyResourceDetails">
      Copy resource details
    </button>
  `;

  $("copyResourceDetails").addEventListener("click", async () => {
    const text = [
      "SAMCLOUD SIMULATED RESOURCE",
      ...details.map(([key, value]) => key + ": " + value),
      "Configuration:",
      ...Object.entries(config).map(([key, value]) => key + ": " + value),
      "SIMULATION ONLY"
    ].join("\\n");

    try {
      await navigator.clipboard.writeText(text);
      showToast("Resource details copied!");
    } catch {
      showToast("Clipboard unavailable. You can inspect the details here.");
    }
  });

  modal.classList.add("visible");
}

$("resourceList").addEventListener("click", event => {
  const remove = event.target.closest(".delete-resource");
  const inspect = event.target.closest(".inspect-resource");

  if (remove) {
    Store.deleteResource(remove.dataset.id);
    renderResources();
    renderDashboard();
    showToast("Demo resource deleted.");
  }

  if (inspect) {
    const r = Store.resources().find(x => x.id === inspect.dataset.id);
    if (r) openResourceDetails(r);
  }
});

$("clearResources").addEventListener("click", () => {
  if (!Store.resources().length) {
    showToast("There are no resources to clear.");
    return;
  }

  if (confirm("Delete all simulated resources from this browser?")) {
    Store.clearResources();
    renderResources();
    renderDashboard();
    showToast("Demo environment cleared.");
  }
});

function renderArchitecture() {
  const nodes = [
    ["Route 53","DNS"],
    ["CloudFront","Content delivery"],
    ["EC2","Application server"],
    ["S3","Object storage"],
    ["RDS","Database"],
    ["CloudWatch","Monitoring"]
  ];

  $("architectureFlow").innerHTML = nodes.map(n => `
    <div class="arch-node">
      <strong>${escapeHTML(n[0])}</strong>
      <small>${escapeHTML(n[1])}</small>
    </div>
  `).join("");

  const checks = Cloud.validate();

  $("connectionChecklist").innerHTML = checks.map(c => `
    <div class="check-row">
      ${c.valid ? "✓" : "○"} ${escapeHTML(c.label)}
      <span style="float:right;color:${c.valid ? "#34d399" : "#8ca5bd"}">
        ${c.valid ? "Resource found" : "Not created"}
      </span>
    </div>
  `).join("");

  $("architectureResult").innerHTML = "";
}

$("validateArchitecture").addEventListener("click", () => {
  const results = Cloud.validate();
  const passed = results.filter(r => r.valid).length;

  renderArchitecture();

  $("architectureResult").innerHTML = `
    <div class="info-box">
      <strong>Simulation validation: ${passed}/${results.length} resource types found.</strong>
      <p>This checks resource presence only. It does not verify actual network connections or application functionality.</p>
    </div>
  `;
  renderDashboard();
});

function renderMonitoring() {
  const resources = Store.resources();

  $("monitoringContent").innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><span>🖥️</span><small>Demo resources</small><strong>${resources.length}</strong></div>
      <div class="stat-card"><span>🟢</span><small>Sample healthy status</small><strong>${resources.length}</strong></div>
      <div class="stat-card"><span>📊</span><small>Demo metrics</small><strong>3</strong></div>
      <div class="stat-card"><span>🔔</span><small>Demo alarms</small><strong>0</strong></div>
    </div>
    <div class="monitor-grid">
      ${[
        ["CPU utilization","24%"],
        ["Memory utilization","48%"],
        ["Network traffic","12 Mbps"],
        ["Disk usage","36%"]
      ].map(([name,value]) => `
        <div class="panel">
          <h3>${name}</h3>
          <div class="metric-value">${value}</div>
          <small class="muted">Illustrative sample value · Not live telemetry</small>
        </div>
      `).join("")}
    </div>
    <div class="panel">
      <h3>Virtual resource inventory</h3>
      ${resources.length ? resources.map(r => `
        <div class="check-row">${Cloud.icons[r.type]} ${escapeHTML(r.name)}
          <span style="float:right;color:#34d399">Demo status</span>
        </div>
      `).join("") : '<div class="empty-state">Create resources to view your inventory.</div>'}
    </div>
  `;
}

function renderQuiz() {
  $("quizContent").innerHTML = `
    <div class="panel">
      <div class="panel-heading">
        <h3>AWS Fundamentals Assessment</h3>
        <span class="muted">${questions.length} questions</span>
      </div>
      <form id="quizForm">
        ${questions.map((q,i) => `
          <div class="quiz-question">
            <strong>${i+1}. ${escapeHTML(q.q)}</strong>
            ${q.o.map((option,j) => `
              <label class="quiz-option">
                <input type="radio" name="q${i}" value="${j}" required>
                ${escapeHTML(option)}
              </label>
            `).join("")}
            <div class="quiz-feedback" id="feedback${i}"></div>
          </div>
        `).join("")}
        <button class="btn primary" type="submit">Submit assessment</button>
      </form>
      <div id="quizResult"></div>
    </div>
  `;

  $("quizForm").addEventListener("submit", event => {
    event.preventDefault();

    const form = new FormData(event.target);
    let score = 0;

    questions.forEach((q,i) => {
      const answer = Number(form.get("q" + i));
      const correct = answer === q.a;
      if (correct) score++;

      $("feedback" + i).textContent =
        (correct ? "✓ Correct. " : "✗ Incorrect. ") + q.e;
    });

    const percent = Math.round(score / questions.length * 100);
    Store.saveScore(percent);

    $("quizResult").innerHTML = `
      <div class="info-box">
        <h3>Assessment completed</h3>
        <div class="metric-value">${percent}%</div>
        <p>You answered ${score} out of ${questions.length} correctly.</p>
      </div>
    `;

    renderDashboard();
    showToast("Assessment submitted.");
  });
}

function renderGlossary(filter = "") {
  $("glossaryContent").innerHTML = `
    <div class="search-wrap">
      <input id="glossarySearch" placeholder="Search technical terms...">
    </div>
    <div class="panel" id="glossaryRows"></div>
  `;

  const search = $("glossarySearch");
  const rows = $("glossaryRows");

  function update() {
    const q = search.value.toLowerCase();

    const filtered = glossary.filter(item =>
      item.join(" ").toLowerCase().includes(q)
    );

    rows.innerHTML = filtered.map(([term,definition]) => `
      <div class="glossary-row">
        <strong>${escapeHTML(term)}</strong>
        <p>${escapeHTML(definition)}</p>
      </div>
    `).join("") || '<div class="empty-state">No matching terms.</div>';
  }

  search.value = filter;
  search.addEventListener("input", update);
  update();
}

$("resourceType").addEventListener("change", updateResourceOptions);

updateResourceOptions();
renderDashboard();
