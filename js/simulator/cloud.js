const Cloud = {
  options: {
    EC2: `
      <label>Operating system</label>
      <select id="optionOS">
        <option>Amazon Linux</option>
        <option>Ubuntu</option>
        <option>Windows Server</option>
      </select>
      <label>Instance type</label>
      <select id="optionSize">
        <option>t3.micro</option>
        <option>t3.small</option>
        <option>t3.medium</option>
      </select>
      <label>Demo storage (GB)</label>
      <input id="optionStorage" type="number" min="8" max="1000" value="20">
    `,

    S3: `
      <label>Storage class</label>
      <select id="optionClass">
        <option>Standard</option>
        <option>Standard-IA</option>
        <option>Glacier Flexible Retrieval</option>
      </select>
      <label>Versioning</label>
      <select id="optionVersion">
        <option>Enabled</option>
        <option>Disabled</option>
      </select>
    `,

    VPC: `
      <label>Demo IPv4 CIDR</label>
      <input id="optionCIDR" value="10.0.0.0/16">
    `,

    RDS: `
      <label>Database engine</label>
      <select id="optionEngine">
        <option>MySQL</option>
        <option>PostgreSQL</option>
        <option>MariaDB</option>
      </select>
      <label>Demo storage (GB)</label>
      <input id="optionStorage" type="number" min="20" max="1000" value="20">
    `,

    Lambda: `
      <label>Runtime</label>
      <select id="optionRuntime">
        <option>Python</option>
        <option>Node.js</option>
      </select>
      <label>Memory (MB)</label>
      <select id="optionMemory">
        <option>128</option>
        <option>256</option>
        <option>512</option>
      </select>
    `,

    CloudFront: `
      <label>Demo origin</label>
      <select id="optionOrigin">
        <option>S3</option>
        <option>EC2</option>
      </select>
    `,

    Route53: `
      <label>Demo domain</label>
      <input id="optionDomain" placeholder="example.demo">
    `,

    IAM: `
      <label>Demo identity type</label>
      <select id="optionIdentity">
        <option>Role</option>
        <option>User</option>
        <option>Group</option>
      </select>
      <label>Permission profile</label>
      <select id="optionPermission">
        <option>Read-only demo</option>
        <option>Storage demo access</option>
      </select>
    `,

    CloudWatch: `
      <label>Demo metric</label>
      <select id="optionMetric">
        <option>CPU utilization</option>
        <option>Network traffic</option>
        <option>Request count</option>
      </select>
    `,

    DynamoDB: `
      <label>Table key</label>
      <input id="optionKey" value="id">
      <label>Demo capacity mode</label>
      <select id="optionCapacity">
        <option>On-demand</option>
        <option>Provisioned</option>
      </select>
    `,

    EBS: `
      <label>Volume type</label>
      <select id="optionVolume">
        <option>gp3</option>
        <option>io2</option>
        <option>st1</option>
      </select>
      <label>Demo size (GB)</label>
      <input id="optionStorage" type="number" min="1" max="1000" value="20">
    `,

    ELB: `
      <label>Load balancer type</label>
      <select id="optionLB">
        <option>Application Load Balancer</option>
        <option>Network Load Balancer</option>
      </select>
    `
  },

  defaults: {
    EC2:"Running",
    S3:"Available",
    VPC:"Available",
    RDS:"Available",
    Lambda:"Ready",
    CloudFront:"Deploying (demo)",
    Route53:"Available",
    IAM:"Active (demo)",
    CloudWatch:"Monitoring (demo)",
    DynamoDB:"Available",
    EBS:"Available",
    ELB:"Active (demo)"
  },

  icons: {
    EC2:"🖥️", S3:"🗄️", VPC:"🌐", RDS:"🛢️",
    Lambda:"⚡", CloudFront:"🚀", Route53:"🧭",
    IAM:"🔐", CloudWatch:"📊", DynamoDB:"⚡",
    EBS:"💾", ELB:"⚖️"
  },

  renderOptions(type) {
    return this.options[type] || "";
  },

  create(type, name, region) {
    const clean = name.trim();

    if (!clean || !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,39}$/.test(clean)) {
      throw new Error("Use a resource name with letters, numbers and hyphens. Maximum 40 characters.");
    }

    if (Store.resources().some(r => r.name.toLowerCase() === clean.toLowerCase())) {
      throw new Error("This resource name is already in use.");
    }

    const config = {};

    const fields = [
      "OS","Size","Storage","Class","Version","CIDR","Engine",
      "Runtime","Memory","Origin","Domain","Identity","Permission",
      "Metric","Key","Capacity","Volume","LB"
    ];

    fields.forEach(key => {
      const element = document.getElementById("option" + key);
      if (element) config[key.toLowerCase()] = element.value;
    });

    if (type === "EC2" || type === "RDS" || type === "EBS") {
      const size = Number(config.storage);
      if (!Number.isInteger(size) || size < 1 || size > 1000) {
        throw new Error("Choose a valid demo storage size between 1 and 1000 GB.");
      }
    }

    if (type === "VPC" &&
        !/^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/.test(config.cidr || "")) {
      throw new Error("Enter a valid IPv4 CIDR format.");
    }

    if (type === "Route53" &&
        !/^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(config.domain || "")) {
      throw new Error("Enter a valid demo domain such as example.demo.");
    }

    const resource = {
      id: "sim-" + Math.random().toString(36).slice(2, 10),
      type,
      name: clean,
      region,
      status: this.defaults[type],
      config,
      createdAt: new Date().toISOString()
    };

    Store.saveResource(resource);
    return resource;
  },

  validate() {
    const resources = Store.resources();
    const types = resources.map(r => r.type);
    const requirements = [
      ["EC2","Virtual application server"],
      ["VPC","Virtual network"],
      ["S3","Object storage"],
      ["RDS","Relational database"],
      ["CloudWatch","Monitoring service"]
    ];

    return requirements.map(([type, label]) => ({
      type,
      label,
      valid: types.includes(type)
    }));
  }
};
