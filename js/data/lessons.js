const lessons = [
{
 id:1, icon:"☁️", category:"Fundamentals",
 title:"What is Cloud Computing?",
 level:"Beginner",
 description:"Understand cloud computing and why organizations use it.",
 sections:[
  ["Introduction","Cloud computing means using computing resources such as servers, storage, databases and networking through a network, usually the internet, instead of owning and managing all the physical infrastructure yourself."],
  ["Why cloud computing?","Organizations can provision resources when needed, scale capacity, use managed services and pay according to applicable usage and pricing models."],
  ["Traditional IT vs Cloud","Traditional IT often requires purchasing and maintaining physical servers. Cloud services allow organizations to request computing resources from a cloud provider."],
  ["Cloud service models","IaaS provides infrastructure components. PaaS provides a managed application platform. SaaS provides ready-to-use software."],
  ["Deployment models","Public cloud uses provider infrastructure. Private cloud is dedicated to an organization. Hybrid cloud combines environments."]
 ],
 objectives:["Explain cloud computing","Distinguish IaaS, PaaS and SaaS","Describe cloud deployment models"]
},
{
 id:2,icon:"🌐",category:"AWS Introduction",title:"Introduction to AWS",
 level:"Beginner",description:"Understand Amazon Web Services and its global cloud infrastructure.",
 sections:[
  ["What is AWS?","Amazon Web Services (AWS) is a cloud computing platform offering services for compute, storage, networking, databases, security and many other workloads."],
  ["Why AWS?","AWS provides a broad range of infrastructure and managed services. Organizations use it to host applications, store information, process data and build scalable systems."],
  ["AWS Regions","A Region is a separate geographic area where AWS operates infrastructure. Resources and service availability can vary by Region."],
  ["Availability Zones","Availability Zones are isolated locations within an AWS Region. Designing across multiple zones can improve application availability."],
  ["Edge locations","AWS edge infrastructure helps deliver content and services closer to users, including through services such as CloudFront."]
 ],
 objectives:["Define AWS","Explain Regions and Availability Zones","Understand edge infrastructure"]
},
{
 id:3,icon:"👤",category:"Account Basics",title:"AWS Account and Billing Concepts",
 level:"Beginner",description:"Understand account structure, console navigation and responsible cost management.",
 sections:[
  ["AWS account","An AWS account is a boundary for accessing and managing AWS services and resources."],
  ["Management console","The AWS Management Console is a web interface used to explore and manage AWS services."],
  ["Identity and security","Use appropriate identities, multifactor authentication and least-privilege permissions. Avoid sharing credentials."],
  ["Billing concepts","AWS charges can depend on service, usage, Region, storage, data transfer and other pricing dimensions."],
  ["Cost awareness","Before creating real resources, review pricing, budgets, billing alerts and applicable Free Tier conditions."]
 ],
 objectives:["Understand an AWS account","Recognize billing concepts","Explain basic account security"]
},
{
 id:4,icon:"🔐",category:"Security",title:"AWS IAM",
 level:"Beginner",description:"Learn identities, permissions, roles and least-privilege access.",
 sections:[
  ["What is IAM?","Identity and Access Management controls authentication and authorization for AWS resources."],
  ["Users and groups","IAM identities and groups help organize access permissions. AWS also supports other identity approaches."],
  ["Policies","Policies are permission documents that describe which actions are allowed or denied on which resources."],
  ["IAM roles","Roles provide temporary credentials to trusted principals or services when properly configured."],
  ["Least privilege","Grant only the permissions needed for a specific task. Review and remove unnecessary access."]
 ],
 objectives:["Explain IAM","Distinguish users, roles and policies","Understand least privilege"]
},
{
 id:5,icon:"🖥️",category:"Compute",title:"Amazon EC2",
 level:"Beginner",description:"Understand virtual servers, AMIs, instance types and storage.",
 sections:[
  ["What is EC2?","Amazon Elastic Compute Cloud provides resizable virtual computing capacity in AWS."],
  ["AMI","An Amazon Machine Image is a template containing the information needed to launch an instance."],
  ["Instance types","Instance types provide different combinations of compute, memory, storage and networking capabilities."],
  ["Operating systems","EC2 supports multiple operating system images, including Linux distributions and Windows Server."],
  ["Storage and networking","EC2 instances can use EBS volumes and network interfaces. Security groups control permitted network traffic."],
  ["Lifecycle","Instances have states such as pending, running, stopping, stopped and terminated."]
 ],
 objectives:["Explain EC2","Understand AMIs and instance types","Describe basic instance lifecycle"]
},
{
 id:6,icon:"🗄️",category:"Storage",title:"AWS Storage Services",
 level:"Beginner",description:"Understand S3, EBS, EFS and different storage purposes.",
 sections:[
  ["Amazon S3","S3 is an object storage service used to store and retrieve objects in buckets."],
  ["S3 objects","Objects contain data and associated metadata. Buckets organize objects."],
  ["Storage classes","S3 offers storage classes designed for different access and cost requirements."],
  ["Amazon EBS","Elastic Block Store provides block storage volumes for use with EC2."],
  ["Amazon EFS","Elastic File System provides managed shared file storage for supported workloads."]
 ],
 objectives:["Distinguish object and block storage","Explain S3 buckets","Compare S3, EBS and EFS"]
},
{
 id:7,icon:"🌍",category:"Networking",title:"Amazon VPC and Networking",
 level:"Beginner",description:"Learn private networks, subnets, routing and gateways.",
 sections:[
  ["What is a VPC?","Amazon Virtual Private Cloud provides a logically isolated network for AWS resources."],
  ["Subnets","Subnets divide a VPC IP address range into smaller network segments associated with Availability Zones."],
  ["Route tables","Route tables determine where network traffic is directed."],
  ["Internet gateway","An internet gateway allows appropriate communication between a VPC and the internet when routing and security permit it."],
  ["Security groups","Security groups are stateful virtual firewalls associated with supported network interfaces."],
  ["Network ACLs","Network access control lists are stateless subnet-level traffic controls."]
 ],
 objectives:["Explain VPC and subnets","Understand routing","Distinguish security groups and network ACLs"]
},
{
 id:8,icon:"🛢️",category:"Databases",title:"AWS Database Services",
 level:"Intermediate",description:"Understand relational and NoSQL database services.",
 sections:[
  ["Amazon RDS","Relational Database Service makes it easier to set up and operate supported relational databases."],
  ["Database engines","RDS supports engines including MySQL, PostgreSQL, MariaDB, Oracle and SQL Server, subject to current availability."],
  ["Amazon Aurora","Aurora is a relational database service compatible with MySQL and PostgreSQL."],
  ["DynamoDB","DynamoDB is a managed NoSQL database service."],
  ["Database security","Consider private networking, authentication, encryption, backups and access control."]
 ],
 objectives:["Explain relational databases","Compare RDS and DynamoDB","Understand database protection"]
},
{
 id:9,icon:"🚀",category:"Web Delivery",title:"CloudFront and Route 53",
 level:"Intermediate",description:"Understand content delivery and DNS services.",
 sections:[
  ["CloudFront","Amazon CloudFront is a content delivery network that distributes content through a global network of edge locations."],
  ["Origins","A CloudFront distribution retrieves content from configured origins, such as S3 or an application endpoint."],
  ["Caching","Caching stores eligible responses closer to users to reduce latency and origin requests."],
  ["Route 53","Amazon Route 53 is a scalable DNS and domain registration service."],
  ["DNS records","Common record types include A, AAAA, CNAME, MX and TXT, each with different purposes."]
 ],
 objectives:["Explain CDN","Understand DNS","Describe a CloudFront origin"]
},
{
 id:10,icon:"⚡",category:"Serverless",title:"AWS Lambda and API Gateway",
 level:"Intermediate",description:"Understand event-driven and serverless application patterns.",
 sections:[
  ["Serverless computing","Serverless services reduce the need to manage underlying servers, while infrastructure still exists behind the service."],
  ["AWS Lambda","Lambda runs supported code in response to configured events."],
  ["Events","Events can originate from supported AWS services, APIs and other integrations."],
  ["API Gateway","API Gateway helps create and manage APIs that applications can call."],
  ["Use cases","Examples include file-processing workflows, APIs and event-driven automation."]
 ],
 objectives:["Explain serverless","Understand Lambda triggers","Describe API Gateway"]
},
{
 id:11,icon:"📊",category:"Monitoring",title:"CloudWatch and CloudTrail",
 level:"Intermediate",description:"Learn monitoring, metrics, logs and account activity.",
 sections:[
  ["CloudWatch","Amazon CloudWatch provides monitoring and observability capabilities."],
  ["Metrics","Metrics represent measurements such as request counts, latency and supported resource utilization."],
  ["Logs","CloudWatch Logs supports collection and analysis of log events."],
  ["Alarms","CloudWatch alarms evaluate metrics or expressions against configured conditions."],
  ["CloudTrail","CloudTrail records AWS account activity and API events for auditing and investigation."]
 ],
 objectives:["Explain metrics and logs","Understand alarms","Distinguish CloudWatch and CloudTrail"]
},
{
 id:12,icon:"🏗️",category:"CloudOps",title:"Professional CloudOps Fundamentals",
 level:"Advanced",description:"Explore operational practices, resilience, backup and automation.",
 sections:[
  ["Cloud operations","CloudOps includes operating, monitoring, maintaining and improving cloud environments."],
  ["High availability","Design systems to reduce the impact of failures through redundancy and suitable architecture."],
  ["Scaling","Scaling adjusts resource capacity to meet workload requirements."],
  ["Backup and recovery","Define backup schedules, retention requirements and recovery objectives."],
  ["Automation","Automation helps make repeatable operational tasks more consistent."],
  ["Incident management","Identify incidents, assess impact, investigate causes, restore service and document lessons."]
 ],
 objectives:["Explain CloudOps responsibilities","Understand resilience","Describe monitoring and incident practices"]
}
];

const services = [
 ["EC2","🖥️","Compute","Virtual servers and computing capacity.","Compute"],
 ["S3","🗄️","Storage","Scalable object storage using buckets and objects.","Storage"],
 ["IAM","🔐","Security","Identity and permission management.","Security"],
 ["VPC","🌐","Networking","Logically isolated cloud networking.","Networking"],
 ["RDS","🛢️","Database","Managed relational database service.","Database"],
 ["DynamoDB","⚡","Database","Managed NoSQL database service.","Database"],
 ["CloudFront","🚀","Delivery","Content delivery network.","Delivery"],
 ["Route 53","🧭","Networking","DNS and domain registration service.","Networking"],
 ["Lambda","⚡","Compute","Event-driven serverless code execution.","Compute"],
 ["CloudWatch","📊","Monitoring","Metrics, logs and alarms.","Monitoring"],
 ["EBS","💾","Storage","Persistent block storage volumes.","Storage"],
 ["ELB","⚖️","Networking","Distributes application traffic across targets.","Networking"]
];

const glossary = [
 ["AMI","Amazon Machine Image — a template used to launch EC2 instances."],
 ["API","Application Programming Interface — a defined way for software components to communicate."],
 ["Availability Zone","An isolated infrastructure location within an AWS Region."],
 ["CDN","Content Delivery Network — distributes content closer to users."],
 ["DNS","Domain Name System — maps domain names to network information."],
 ["EC2","Elastic Compute Cloud — AWS virtual computing service."],
 ["IAM","Identity and Access Management — access and permission management."],
 ["IaaS","Infrastructure as a Service."],
 ["IP Address","A network address used to identify an interface."],
 ["Lambda","AWS event-driven serverless compute service."],
 ["PaaS","Platform as a Service."],
 ["Region","A geographic AWS infrastructure area."],
 ["SaaS","Software as a Service."],
 ["S3","Amazon Simple Storage Service."],
 ["Subnet","A smaller IP network range within a larger network."],
 ["VPC","Virtual Private Cloud — an isolated AWS virtual network."]
];

const questions = [
 {q:"What does EC2 provide?",o:["Object storage","Virtual computing capacity","DNS registration","Email hosting"],a:1,e:"EC2 provides virtual computing capacity."},
 {q:"Which service is used for object storage?",o:["S3","IAM","VPC","Lambda"],a:0,e:"Amazon S3 stores objects in buckets."},
 {q:"What does IAM manage?",o:["Permissions and identities","Video streaming","DNS caching","Disk partitions"],a:0,e:"IAM manages identities and permissions."},
 {q:"What is a VPC?",o:["Database engine","Virtual private network","Operating system","Programming language"],a:1,e:"A VPC is a logically isolated virtual network."},
 {q:"Which service provides managed relational databases?",o:["CloudFront","RDS","Route 53","IAM"],a:1,e:"Amazon RDS is a managed relational database service."},
 {q:"What is CloudFront primarily used for?",o:["Content delivery","Identity management","Block storage","User registration"],a:0,e:"CloudFront is a content delivery network."},
 {q:"Which service provides serverless code execution?",o:["EBS","Lambda","VPC","Route 53"],a:1,e:"AWS Lambda executes code in response to events."},
 {q:"What does DNS do?",o:["Encrypts disks","Maps domain names to network information","Creates virtual machines","Stores database rows"],a:1,e:"DNS translates domain names into records used for network resolution."},
 {q:"Which service supports metrics and alarms?",o:["CloudWatch","S3","IAM","EFS"],a:0,e:"CloudWatch provides monitoring, metrics and alarms."},
 {q:"What is least privilege?",o:["Giving everyone admin access","Granting only necessary permissions","Disabling all security","Sharing passwords"],a:1,e:"Least privilege limits permissions to what is required."}
];
