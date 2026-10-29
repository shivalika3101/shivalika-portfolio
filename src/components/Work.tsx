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
      "Forecast hourly energy consumption for around 1,450 buildings using more than 20 million meter readings from the ASHRAE Great Energy Predictor III dataset. Merged meter, building and weather data, engineered lag, rolling-window and calendar features, and validated models on a time-based split. I built and tuned the LightGBM model, which fed into the team's soft-voting ensemble.",
    results:
      "LightGBM RMSLE 0.523. Team ensemble about 0.517, roughly 61% lower error than the median baseline (1.33).",
    stack: "Python, Pandas, NumPy, LightGBM, XGBoost, CatBoost, scikit-learn",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/ZahraSabouri/CMT307_GreatEnergyPredictor",
      },
    ],
    image: "/images/placeholder.webp",
    alt: "Building Energy Prediction results",
  },
  {
    id: "02",
    name: "WasteWise AI",
    category: "Full-Stack Machine Learning Web Application",
    tag: "Team project",
    description:
      "A web app that identifies household waste from a photo or live camera, sorts it into one of 30 categories and recommends the right bin. I built the React frontend and login flow, the protected image-classification API, prediction history and bin-verification feedback, and integrated a four-model CNN ensemble (MobileNetV2, EfficientNet-B0, ResNet50, DenseNet121) trained by teammates.",
    results:
      "A working end-to-end product that takes a user photo through the API to a model prediction and stores results in PostgreSQL.",
    // TODO: add TensorFlow or PyTorch, whichever the team used
    stack: "React, Vite, FastAPI, PostgreSQL, Docker",
    links: [{ label: "GitHub", url: "" }],
    image: "/images/placeholder.webp",
    alt: "WasteWise AI classifying an item",
  },
  {
    id: "03",
    name: "AI Jobs Market Dashboard",
    category: "Data Analysis and Visualisation",
    tag: "Solo project",
    description:
      "An interactive dashboard exploring how AI is changing the job market. Merged and cleaned two job-market datasets, defined KPIs and built six chart types with filters, plus automatically generated insights that summarise the trends for the selected view.",
    results:
      "Turns two raw datasets into a clickable, decision-ready view of AI hiring trends.",
    stack: "Python, Pandas, Streamlit, Plotly",
    links: [
      { label: "Live demo", url: "" },
      {
        label: "GitHub",
        url: "https://github.com/shivalika3101/AI-Jobs-Dashboard",
      },
    ],
    image: "/images/placeholder.webp",
    alt: "AI Jobs Market Dashboard",
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
