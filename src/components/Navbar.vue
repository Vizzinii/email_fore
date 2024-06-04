<template>
    <nav>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
     
    </nav>
  </template>
  
  <style>
  nav {
    display: flex;
    justify-content: space-around;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1em;
  }
  nav a {
    color: white;
    text-decoration: none;
  }
  </style>
  