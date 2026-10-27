import {
  education,
  experience,
  profile,
  projects,
  research,
  skills,
} from "./content";
import type { Project } from "./content";
import { usePageMotion } from "./usePageMotion";

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      <a
        href={project.repository}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} source on GitHub (opens in a new tab)`}
      >
        Code on GitHub <Arrow />
      </a>
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} demo (opens in a new tab)`}
        >
          Open demo <Arrow />
        </a>
      )}
    </div>
  );
}

function ProjectEntry({ project }: { project: Project }) {
  return (
    <article
      className={`project project-${project.id}`}
      aria-labelledby={`${project.id}-title`}
      data-reveal="visible"
    >
      <header className="project-heading">
        <h3 id={`${project.id}-title`}>{project.title}</h3>
        <p className="project-category">{project.category}</p>
      </header>
      <div className="project-copy">
        <p>{project.description}</p>
        <p className="contribution">
          <span>{project.id === "career" ? "Implementation" : "My part"}</span>
          {project.contribution}
        </p>
      </div>
      {project.image && (
        <figure className="project-image">
          <img
            src={`${import.meta.env.BASE_URL}${project.image.path}`}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            loading="lazy"
            decoding="async"
          />
          <figcaption>{project.image.caption}</figcaption>
        </figure>
      )}
      <ul className="technologies" aria-label={`${project.title} technologies`}>
        {project.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <ProjectLinks project={project} />
    </article>
  );
}

export function App() {
  const root = usePageMotion();
  return (
    <div ref={root} id="top" className="notebook">
      <div className="reading-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="notebook-layout">
        <header className="site-header">
          <a
            className="wordmark"
            href="#top"
            aria-label="Chih Lin Chien, back to top"
          >
            Chih Lin Chien<span>brianjien</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#research">Research</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <p className="margin-note">
            Computer science
            <br />
            UIUC · Champaign, IL
          </p>
        </header>
        <div className="notebook-pages">
          <main id="main" tabIndex={-1}>
            <section className="hero" aria-labelledby="hero-title">
              <p className="hero-role">{profile.role} / MCS student</p>
              <h1 id="hero-title">{profile.name}</h1>
              <p className="introduction">{profile.introduction}</p>
              <p className="hero-note">
                Previously: web test automation at Moldex3D.
              </p>
              <a className="intro-link" href="#work">
                A few projects below <span aria-hidden="true">↓</span>
              </a>
            </section>
            <section
              id="work"
              className="work-section"
              aria-labelledby="work-title"
            >
              <div className="section-heading" data-reveal="visible">
                <h2 id="work-title">Projects</h2>
                <p>From coursework and GitHub</p>
              </div>
              {projects.map((project) => (
                <ProjectEntry key={project.id} project={project} />
              ))}
            </section>
            <section
              id="research"
              className="research-section"
              aria-labelledby="research-title"
            >
              <div className="section-heading" data-reveal="visible">
                <h2 id="research-title">Research</h2>
                <p>Literature & analysis</p>
              </div>
              <article
                className="research-note"
                aria-labelledby="resume-bias-title"
                data-reveal="visible"
              >
                <header className="project-heading">
                  <h3 id="resume-bias-title">{research.title}</h3>
                  <p className="project-category">{research.category}</p>
                </header>
                <div className="project-copy">
                  <p>{research.summary}</p>
                  <p className="contribution">
                    <span>My work</span>
                    {research.contribution}
                  </p>
                </div>
                <div className="research-findings">
                  <h4>What the review highlights</h4>
                  <ul>
                    {research.findings.map((finding) => (
                      <li key={finding}>{finding}</li>
                    ))}
                  </ul>
                </div>
                <details className="research-details">
                  <summary>Methods & mitigation notes</summary>
                  <div className="research-details-content">
                    <p>{research.methods}</p>
                    <ol
                      className="research-pipeline"
                      aria-label="Mitigation pipeline proposed in the literature review"
                    >
                      {research.pipeline.map((layer) => (
                        <li key={layer.stage}>
                          <h4>{layer.stage}</h4>
                          <p>{layer.description}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </details>
                <p className="research-note-caption">{research.note}</p>
                <div className="project-links research-links">
                  <a
                    href={`${import.meta.env.BASE_URL}${research.report.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Read research report (PDF, opens in a new tab)"
                  >
                    {research.report.label} <Arrow />
                  </a>
                  <a
                    href={`${import.meta.env.BASE_URL}${research.slides.path}`}
                    download={research.slides.filename}
                  >
                    {research.slides.label} <Arrow />
                  </a>
                </div>
              </article>
            </section>
            <section
              id="about"
              className="about-section"
              aria-labelledby="about-title"
            >
              <div className="section-heading" data-reveal="visible">
                <h2 id="about-title">About</h2>
              </div>
              <div className="about-copy" data-reveal="visible">
                {profile.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p>{profile.personal}</p>
              </div>
              <div className="background-grid" data-reveal="visible">
                <div className="education">
                  <h3>Education</h3>
                  {education.map((item) => (
                    <div className="education-item" key={item.school}>
                      <span className="entry-date">{item.dates}</span>
                      <h4>{item.school}</h4>
                      <p>{item.degree}</p>
                    </div>
                  ))}
                </div>
                <div className="experience">
                  <h3>Experience</h3>
                  <div className="experience-item">
                    <span className="entry-date">{experience.dates}</span>
                    <h4>{experience.company}</h4>
                    <p className="experience-role">{experience.role}</p>
                    <p>{experience.description}</p>
                  </div>
                  <div className="languages">
                    <h3>Languages</h3>
                    <p>{profile.languages}</p>
                  </div>
                </div>
              </div>
              <div className="skills-list" data-reveal="visible">
                <h3>Tools I’ve worked with</h3>
                {skills.map((group) => (
                  <div key={group.title}>
                    <h4>{group.title}</h4>
                    <p>{group.items}</p>
                  </div>
                ))}
              </div>
            </section>
            <section
              id="contact"
              className="contact-section"
              aria-labelledby="contact-title"
              data-reveal="visible"
            >
              <div className="section-heading">
                <h2 id="contact-title">Contact</h2>
              </div>
              <p>
                You can reach me by email, or find me on GitHub and LinkedIn.
              </p>
              <div className="contact-links">
                <a
                  className="email-link"
                  href={`mailto:${profile.email}`}
                  aria-label={`Email me at ${profile.email}`}
                >
                  {profile.email} <Arrow />
                </a>
                <div className="social-links">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub (opens in a new tab)"
                  >
                    GitHub <Arrow />
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn (opens in a new tab)"
                  >
                    LinkedIn <Arrow />
                  </a>
                </div>
              </div>
            </section>
          </main>
          <footer className="site-footer">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <a href="#top">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
