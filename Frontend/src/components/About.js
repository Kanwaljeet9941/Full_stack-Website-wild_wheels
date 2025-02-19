import React from "react";
import "./about.css";

function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Us</h1>
      </header>
      <section className="about-content">
        <h2>Our Mission</h2>
        <p>
          At Wild Wheels, we are dedicated to providing high-quality bicycles
          and exceptional customer service. Our mission is to inspire more
          people to enjoy cycling, whether for leisure, fitness, or
          transportation.
        </p>

        <h2>Our Story</h2>
        <p>
          Founded in 2025, Wild Wheels started as a small local bike shop with a
          passion for cycling. Over the years, we have grown into a trusted
          online store, serving customers across the region.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>Wide selection of premium bicycles</li>
          <li>Competitive pricing</li>
          <li>Expert advice from cycling enthusiasts</li>
          <li>Fast and reliable shipping</li>
          <li>Dedicated customer support</li>
        </ul>

        <h2>Our Team</h2>
        <p>
          Our team is made up of cycling enthusiasts and experts who are
          passionate about helping you find the perfect bike. We believe in
          building a community of riders who share our love for the sport.
        </p>
      </section>
    </div>
  );
}

export default AboutPage;
