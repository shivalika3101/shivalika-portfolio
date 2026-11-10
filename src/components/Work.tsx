import WorkImage from "./WorkImage";

import "./styles/Work.css";

interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  id: string;
  name: string;
  category: string;
  tag?: string;
  description: string;
  results?: string;
  stack: string;
  links?: ProjectLink[];
  image: string;
  alt: string;
}

// Add a link by filling in its url. Links with an empty url are hidden.
const projects: Project[] = [
  {
    id: "01",
    name: "Building Energy Prediction",
    category: "Machine Learning and Time-Series Forecasting",
    tag: "Team project (6 people)",
    description:
      "Forecast hourly energy consumption for around 1,450 buildings using more than 20 million meter readings from the ASHRAE Great Energy Predictor III dataset. I led the time-series analysis, built leakage-safe lag (24h, 72h, 168h) and rolling-window features, and trained LightGBM and XGBoost on a chronological split (Jan–Oct train, Nov–Dec validation). I tuned LightGBM with RandomizedSearchCV, and it fed into the team's soft-voting ensemble.",
    results:
      "My tuned LightGBM: RMSLE 0.509. Team CatBoost + LightGBM ensemble: about 0.50, over 60% lower error than the median baseline (1.33).",
    stack: "Python, Pandas, NumPy, LightGBM, XGBoost, CatBoost, scikit-learn",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/ZahraSabouri/CMT307_GreatEnergyPredictor",
      },
    ],
    image: "/images/energy-prediction-project.png",
    alt: "Bar chart of RMSLE: median baseline 1.33, my tuned LightGBM 0.509, team ensemble 0.50",
  },
  {
    id: "02",
    name: "WasteWise AI",
    category: "Full-Stack Machine Learning Web Application",
    tag: "Team project",
    description:
      "A web app that identifies household waste from a photo or live camera, sorts it into one of 30 categories and recommends the right bin. I built most of the React frontend and login flow, the protected (JWT) image-classification API, prediction history and bin-verification feedback, and integrated a four-model CNN ensemble (MobileNetV2, EfficientNet-B0, ResNet50, DenseNet121) trained by teammates.",
    results:
      "A working end-to-end product that takes a user photo through the API to a model prediction and stores results in PostgreSQL.",
    stack: "React, Vite, FastAPI, PostgreSQL, Docker, PyTorch, TensorFlow/Keras",
    links: [
      { label: "GitHub", url: "https://github.com/shivalika3101/WasteWise-AI" },
    ],
    image: "/images/wastewise-project.png",
    alt: "WasteWise AI home page",
  },
  {
    id: "03",
    name: "AI Jobs Market Dashboard",
    category: "Data Analysis and Visualisation",
    tag: "Solo project",
    description:
      "An interactive dashboard exploring how AI is changing the job market, built on 15,000 AI job postings (Kaggle, Jan 2024 – Apr 2025). Headline KPIs (postings, median salary, countries, remote share), filters for country, experience, work mode and year, six chart types across salary, skills, industry and trend tabs, plus plain-language insights that update with the filters.",
    results:
      "Turns a raw job-postings dataset into a clickable, decision-ready view of AI hiring trends, with a searchable table and CSV export.",
    stack: "Python, Pandas, Streamlit, Plotly",
    links: [
      {
        label: "Live demo",
        url: "https://ai-jobs-dashboard-i5zatt46vkovdwln3veuw9.streamlit.app/",
      },
      {
        label: "GitHub",
        url: "https://github.com/shivalika3101/AI-Jobs-Dashboard",
      },
    ],
    image: "/images/ai-jobs-dashboard-project.png",
    alt: "AI Job Market dashboard overview with filters, KPI cards (15,000 postings, $99,705 median salary, 20 countries, 33% fully remote) and key takeaways",
  },
  {
    id: "04",
    name: "Fluffy AI Assistant",
    category: "Python Automation Project",
    description:
      "Built a desktop voice assistant prototype that transcribes speech with Whisper and automates search, messaging and app control.",
    stack: "Python, SQLite, Whisper, Speech Recognition, Eel",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/shivalika3101/Fluffy-AI-Assistant",
      },
    ],
    image: "/images/fluffy-project.png",
    alt: "Fluffy AI Assistant interface",
  },
  {
    id: "05",
    name: "Image Analysis Project",
    category: "Python Image Processing Project",
    description:
      "Developed a GUI-based image analysis application with grayscale conversion, blur, cropping, histogram generation, edge detection, thresholding, and RGB channel operations.",
    stack: "Python, Tkinter, PIL, NumPy, scikit-image, Matplotlib",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/shivalika3101/Image-Analysis",
      },
    ],
    image: "/images/image-analysis-project.png",
    alt: "Image Analysis project interface",
  },
];

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Projects</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => {
            const links = (project.links ?? []).filter((link) => link.url);
            return (
              <div className="work-box" key={project.id}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>{project.id}</h3>

                    <div>
                      <h4>{project.name}</h4>
                      <p>{project.category}</p>
                      {project.tag && (
                        <span className="work-tag">{project.tag}</span>
                      )}
                    </div>
                  </div>
                  <h4>Overview</h4>
                  <p>{project.description}</p>
                  {project.results && (
                    <>
                      <h4>Results</h4>
                      <p>{project.results}</p>
                    </>
                  )}
                  <h4>Tech stack</h4>
                  <p>{project.stack}</p>
                  {links.length > 0 && (
                    <div className="work-links">
                      {links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="disable"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <WorkImage
                  image={project.image}
                  alt={project.alt}
                  link={links[0]?.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Work;
