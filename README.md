<h1>🍰 JustBaked</h1>

<p>JustBaked is a full-stack bakery e-commerce web application that allows customers to browse coding-themed treats, place orders, and track their order status in real-time. The web app also includes a staff portal to manage menu items and orders more efficiently.</p>

<h3>🔥 Features</h3>
<h5>Customer Features</h5>
<ul>
  <li>User Authentication: Customers can create an account and log in with email/password, Google, or Apple accounts via Firebase Authentication.</li>
  <li>Browse & Order: Customers can view bakery items, add to cart, and place orders.</li>
  <li>Order Tracking: Customers can see real-time updates on the status of their orders.</li>
</ul>

<h5>Staff Features</h5>
<ul>
  <li>Menu Management: Staff can add, update, or remove menu items.</li>
  <li>Order Management: Staff can view and update order statuses, ensuring customers are informed in real-time.</li>
</ul>

<h3>🛠 Tech Stack</h3>
<ul>
  <li>Frontend: React, CSS, Bootstrap</li>
  <li>Backend: Spring Boot, JPA/Hibernate</li>
  <li>Database: MySQL for storing user info, orders, and menu items</li>
  <li>Authentication: Firebase Authentication</li>
</ul>

<h3>🚀 Getting Started</h3>
<p>To run the JustBaked app locally using Docker, follow these steps:</p>
<ol>
  <li>Clone the repo: git clone https://github.com/mhan1024/justbaked-v2.git</li>
  <li>Go to project directory: cd justbaked</li>
  <li>Set up and update environment variables by copying the example .env file: cp .env.example .env</li>
  <li>Start the application using Docker Compose: docker-compose up --build</li>
  <li>
    Once the containers are running, access the app at: <a href="http://localhost:3000">http://localhost:3000</a>
  </li>
</ol>
