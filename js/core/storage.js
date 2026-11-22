const Store = {
  read(key, fallback) {
    try {
      const value = localStorage.getItem("samcloud_" + key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },

  write(key, value) {
    try {
      localStorage.setItem("samcloud_" + key, JSON.stringify(value));
      return true;
    } catch {
      showToast("Browser storage unavailable or full.");
      return false;
    }
  },

  completed() {
    return this.read("completed", []);
  },

  resources() {
    return this.read("resources", []);
  },

  scores() {
    return this.read("scores", []);
  },

  finishLesson(id) {
    const completed = this.completed();
    if (!completed.includes(id)) completed.push(id);
    this.write("completed", completed);
  },

  saveResource(resource) {
    const resources = this.resources();
    resources.push(resource);
    this.write("resources", resources);
  },

  deleteResource(id) {
    this.write("resources", this.resources().filter(r => r.id !== id));
  },

  clearResources() {
    this.write("resources", []);
  },

  saveScore(score) {
    const scores = this.scores();
    scores.push({ score, date: new Date().toISOString() });
    this.write("scores", scores);
  }
};
