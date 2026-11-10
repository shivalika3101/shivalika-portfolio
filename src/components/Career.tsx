import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Work <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Systems Engineer</h4>
                <h5>Tata Consultancy Services</h5>
              </div>
              <h3>2023 - 2026</h3>
            </div>
            <ul className="career-points">
              <li>
                Worked on the report generation module of Passport Seva, a
                large-scale government platform, delivering reports such as
                daily cash collection, rejected applications and application
                status for regional passport offices.
              </li>
              <li>
                Built, enhanced and maintained 150+ REST APIs using Java and
                Spring Boot.
              </li>
              <li>
                Automated the daily reporting batches and their delivery,
                cutting manual reporting effort by about 40%.
              </li>
              <li>
                Used MySQL and Redis to manage data efficiently and improve
                system performance.
              </li>
              <li>
                Debugged production issues, including recovering a failed
                overnight batch, and helped add failure alerts and validation
                checks.
              </li>
            </ul>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Internship</h4>
                <h5>Tata Power-DDL</h5>
              </div>
              <h3>2022</h3>
            </div>
            <ul className="career-points">
              <li>
                Worked on system support and networking-related tasks in a
                technical operations environment.
              </li>
              <li>
                Assisted with system setup, troubleshooting, and technical
                support.
              </li>
              <li>
                Developed an image analysis project involving image selection,
                modification, and processing.
              </li>
              <li>
                Strengthened problem-solving skills and attention to detail.
              </li>
            </ul>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Internship</h4>
                <h5>Highradius</h5>
              </div>
              <h3>2021</h3>
            </div>
            <ul className="career-points">
              <li>
                Gained exposure to real-world development environments and
                practical technical workflows.
              </li>
              <li>
                Contributed to a full-stack web-based project and understood
                how frontend and backend components interact.
              </li>
              <li>
                Worked on development and support tasks while learning
                structured processes and team collaboration.
              </li>
              <li>
                Built confidence in applying technical knowledge in a
                professional setting.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
