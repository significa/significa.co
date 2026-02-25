import { useState } from "react";

interface Project {
  id: string;
  title: string;
  tagline?: string;
  thumbnail?: string;
  industry: string[];
  deliverable: string[];
  awards: Array<{ award: string; year: number; url?: string }>;
}

interface ProjectFiltersProps {
  projects: Project[];
  industries: string[];
  deliverables: string[];
}

export default function ProjectFilters({ projects, industries, deliverables }: ProjectFiltersProps) {
  const [selectedIndustries, setSelectedIndustries] = useState<Set<string>>(new Set());
  const [selectedDeliverables, setSelectedDeliverables] = useState<Set<string>>(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter projects based on selected filters
  const filteredProjects =
    selectedIndustries.size === 0 && selectedDeliverables.size === 0
      ? projects
      : projects.filter((project) => {
          const matchesIndustry = selectedIndustries.size === 0 || project.industry.some((ind) => selectedIndustries.has(ind));
          const matchesDeliverable =
            selectedDeliverables.size === 0 || project.deliverable.some((del) => selectedDeliverables.has(del));
          return matchesIndustry && matchesDeliverable;
        });

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) => {
      const next = new Set(prev);
      if (next.has(industry)) {
        next.delete(industry);
      } else {
        next.add(industry);
      }
      return next;
    });
  };

  const toggleDeliverable = (deliverable: string) => {
    setSelectedDeliverables((prev) => {
      const next = new Set(prev);
      if (next.has(deliverable)) {
        next.delete(deliverable);
      } else {
        next.add(deliverable);
      }
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedIndustries(new Set());
    setSelectedDeliverables(new Set());
  };

  const activeFilterCount = selectedIndustries.size + selectedDeliverables.size;

  // Format label for display
  const formatLabel = (value: string) => {
    return value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="project-filters">
      {/* Filter Toggle Button */}
      <button
        className="filter-toggle"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        aria-expanded={isFilterOpen}
        aria-controls="filter-panel"
      >
        <span>Filters</span>
        {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
        <svg
          className={`chevron ${isFilterOpen ? "open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="filter-panel" id="filter-panel">
          <div className="filter-header">
            <h3>Filter projects</h3>
            {activeFilterCount > 0 && (
              <button className="clear-button" onClick={clearFilters}>
                Clear all
              </button>
            )}
          </div>

          {/* Industry Filters */}
          <div className="filter-group">
            <h4>Industry</h4>
            <div className="filter-options">
              {industries.map((industry) => (
                <label key={industry} className="filter-option">
                  <input type="checkbox" checked={selectedIndustries.has(industry)} onChange={() => toggleIndustry(industry)} />
                  <span className="checkbox-custom" />
                  <span className="filter-label">{formatLabel(industry)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Deliverable Filters */}
          <div className="filter-group">
            <h4>Deliverable</h4>
            <div className="filter-options">
              {deliverables.map((deliverable) => (
                <label key={deliverable} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedDeliverables.has(deliverable)}
                    onChange={() => toggleDeliverable(deliverable)}
                  />
                  <span className="checkbox-custom" />
                  <span className="filter-label">{formatLabel(deliverable)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="results-count">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>

      {/* Filtered Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <article key={project.id} className="project-card">
            <a href={`/projects/${project.id}`} className="project-link">
              {project.thumbnail && (
                <div className="project-thumbnail">
                  <img src={project.thumbnail} alt={project.title} loading="lazy" decoding="async" />
                </div>
              )}

              <div className="project-info">
                <h2 className="project-title">{project.title}</h2>
                {project.tagline && <p className="project-tagline">{project.tagline}</p>}

                {project.awards.length > 0 && (
                  <ul className="awards-list" role="list">
                    {project.awards.slice(0, 5).map((award, index) => (
                      <li key={index} className="award-badge">
                        <span className="award-name">{award.award}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <span className="view-project">View project →</span>
              </div>
            </a>
          </article>
        ))}
      </div>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <div className="no-results">
          <p>No projects match the selected filters.</p>
          <button className="clear-button-large" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
