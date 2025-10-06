## 🍽️ Mess Katta - Dual Login Food Management System

### 🌟 Overview  
**Mess Katta** is a web application designed to bridge the gap between **mess owners** and **customers**. It provides a **dual login system** with role-based authentication, allowing:  
- 🏠 **Owners** to manage menu details and operations.  
- 🍽️ **Customers** to view menus and provide reviews.  

---

## 🚀 Features  

### 🔑 Dual Login System (Customer & Owner)  
- 👨‍🍳 **Owner:** Manages menu details and operations.  
- 👥 **Customer:** Views menus and provides reviews.  
- 🔒 **Role-based authentication using JWT** ensures secure access.  

### 🔍 Filtering & Sorting  
- 📍 Customers can **filter** menus by **price, location, or cuisine**.  
- 📊 Sorting options for better menu browsing.  

### 🏠 Owner Dashboard  
- ✅ **Add or update daily menus**, including food items, descriptions, and prices.  
- 🎮 User-friendly dashboard for **authenticated owners** only.  
- ⚙️ **Backend API endpoints** for adding/updating menus.  
- 📄 Data stored efficiently in **MongoDB collections**.  

### 📍 Real-Time Display of Menus with Locations  
- 📌 Customers can view **menu details along with mess locations**.  
- 🗺️ Integrated **Google Maps API** (or similar) for easy navigation.  
- ⚡ **React-based UI** for smooth and dynamic user experience.  

### ⭐ Customer Review System  
- 📝 Customers can **leave feedback and ratings** for specific menus.  
- 🤝 Reviews help others make informed choices & provide feedback to owners.  
- 🔗 **Backend API endpoints** to handle reviews.  
- 📄 Reviews stored in **MongoDB**, linked to menus and users.  

### 🎨 Seamless UI/UX  
- ⚡ Built with **React.js And Chakra UI** for a dynamic and responsive experience.  
- 📍 **State management using Context API**.  

### 🔒 Secure Backend API  
- 🛡️ Built with **Express.js**, providing **robust authentication** & API security.  
- 🌍 Middleware like **CORS** ensures security & cross-origin compatibility.  

### 💢 Database Design (MongoDB)  
- 📂 **Users, Menus, Reviews, and Locations** stored in separate collections.  
- 🔗 Optimized schema design for relational data using **embedded documents** or **references**.  

### 🌍 Hosting & Deployment  
- 🎯 **Frontend:** Deployed on **Netlify** for high performance.  
- 🚀 **Backend:** Deployed on **Render** with **CORS and environment variable configuration**.  

---

## 🛠️ Tech Stack  

### 💻 Frontend  
- ⛏ **React.js** 

### 🔙 Backend  
- 🏢 **Node.js & Express.js** for scalable APIs  

### 📂 Database  
- 📄 **MongoDB** for data storage  

### 🔐 Authentication  
- 🔑 **JWT (JSON Web Tokens)** for secure role-based access  

---

## 🚀 Getting Started  

### 🛠️ Installation  

```bash
# Clone the repository
git clone https://github.com/Pranav-Sutar47/MessKattaFrontend

# Navigate to the project folder
cd mess-katta

# Install dependencies
npm install
```

### 🔥 Running the Application  

#### 🌍 Backend  
```bash
cd backend
npm start
```

#### ⚛️ Frontend  
```bash
cd frontend
npm start
```

---

## 🤝 Live At  
```messkatta.netlify.app``` 🙌  

---

## 📱 Contact  
For any queries or collaboration, feel free to reach out! 📩  

💻 **Developed by:** Pranav Sutar 🚀  

---

