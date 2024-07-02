import React from "react";

const Home = () => {
  return (
    <div>
      <div className="d-flex gap-5 justify-content-center my-3 flex-wrap">
        <img
          src="static/pexels-photo-1629212.png"
          style={{ maxWidth: "30rem" }}
          className="shadow"
          alt="hero image"
        />
        <h1 className="fs-3 fst-italic fw-normal p-2 shadow" style={{ maxWidth: "30rem" }}>
          This is your one-stop shop for capturing, organizing, and accessing
          all your important thoughts and ideas. Introducing the Notes App - a
          powerful yet user-friendly tool designed to streamline your
          note-taking experience.
        </h1>
      </div>
      <div className="mx-3 my-5">
      <h2>Here's what you can achieve with the Notes App:</h2>
      <ul className="fs-5">
        <li>
          Effortless Note Taking: Quickly jot down ideas, tasks, or anything
          that pops into your mind with a simple and intuitive interface.
        </li>
        <li>
          Seamless Organization: Create custom categories and tags to categorize
          your notes for easy retrieval later.
        </li>
        <li>
          Powerful Search: Find exactly what you're looking for in seconds with
          robust search functionality.
        </li>
        <li>
          Enhanced Security: Keep your notes confidential with optional password
          protection.
        </li>
        <li>
          Accessibility Across Devices: Access your notes anytime, anywhere,
          from your desktop, phone, or tablet.
        </li>
        <li>
          Collaboration Made Easy: Share notes with colleagues, friends, or
          family for seamless collaboration (optional feature).
        </li>
      </ul>
      <p className="fs-5">
        Get Started Today! Sign up for free and experience the power of
        organized thoughtfulness with the Notes App.
      </p>
      </div>
    </div>
  );
};

export default Home;
