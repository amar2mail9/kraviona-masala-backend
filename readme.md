<h2>Kraviona Backend Server</h2>

<p>This is the backend server for the Kraviona project, built using <strong>Node.js</strong>, <strong>Express</strong>, and <strong>MongoDB</strong>. It provides APIs for handling data, authentication, and file uploads.</p>

<h3>Initial Setup</h3>

<p>Follow these steps to set up the backend server:</p>

<ol>
  <li>Initialize a new Node.js project:
    <pre><code>npm init -y</code></pre>
  </li>
  <li>Install required dependencies:
    <pre><code>npm i express mongoose dotenv jsonwebtoken multer nodemailer</code></pre>
    <ul>
      <li><strong>express:</strong> Web framework for Node.js</li>
      <li><strong>mongoose:</strong> MongoDB object modeling</li>
      <li><strong>dotenv:</strong> Manage environment variables</li>
      <li><strong>jsonwebtoken:</strong> Authentication via JWT</li>
      <li><strong>multer:</strong> File upload handling</li>
      <li><strong>Nodemailer:</strong> Send Email</li>
    </ul>
  </li>
</ol>

<h3>Running the Server</h3>

<ol>
  <li>Create a <code>.env</code> file for environment variables (e.g., DB connection string, JWT secret).</li>
  <li>Start the server:
    <pre><code>node index.js</code></pre>
  </li>
</ol>

<h3>Project Structure</h3>

<pre><code>
kraviona-backend/
├─ node_modules/
├─ routes/        # API route files
├─ models/        # Mongoose models
├─ controllers/   # Controller logic
├─ middleware/    # Authentication, file upload etc.
├─ .env           # Environment variables
├─ package.json
└─ index.js       # Main server file
</code></pre>

<h3>Features</h3>
<ul>
  <li>RESTful APIs for data handling</li>
  <li>JWT authentication for secure endpoints</li>
  <li>File upload support using Multer</li>
  <li>MongoDB integration using Mongoose</li>
</ul>
