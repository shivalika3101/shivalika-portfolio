import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I’m an MSc Data Science student at Cardiff University with two years
          as a backend software engineer at Tata Consultancy Services, building
          REST APIs and batch systems for a national government platform.
        </p>
        <p className="para">
          I now build machine learning models and data pipelines, from
          forecasting on 20M+ records to deploying models in web apps, using
          Python, SQL, Java and Spring Boot.
        </p>
      </div>
    </div>
  );
};

export default About;
