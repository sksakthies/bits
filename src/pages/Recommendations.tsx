import { useState } from "react";
import { FiSearch, FiStar, FiCheck } from "react-icons/fi";

interface Project {
  title: string;
  description: string;
  difficultyLevel: string;
  techStack: string[];
  roadmap: { step: string; difficulty: string }[];
}

export default function Recommendations() {
  const [prompt, setPrompt] = useState<string>("");
  const [results, setResults] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [savedProjects, setSavedProjects] = useState<Map<string, boolean>>(
    new Map()
  );

  const fetchRecommendations = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/projects/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data: Project[] = await response.json();
      setResults(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProject = async (project: Project) => {
    try {
      const response = await fetch("http://localhost:5000/api/projects/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      const savedProject: Project = await response.json();
      setSavedProjects(new Map(savedProjects).set(savedProject.title, true));
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-400">
          AI-Powered Learning Roadmap
        </h1>
        <p className="text-gray-400 mb-8 text-lg text-center">
          Enter your interests or goals, and get a personalized project roadmap.
        </p>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              className="w-full p-4 text-lg rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 'Full-stack web development with React and Node.js'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={fetchRecommendations}
              className="mt-4 w-full py-3 bg-blue-600 text-lg font-bold rounded-lg hover:bg-blue-500 transition-colors"
              disabled={isLoading}
            >
              {isLoading
                ? "Generating Roadmap..."
                : "Generate Learning Roadmap"}
            </button>
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-900/50 text-red-200 rounded-lg text-center">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <div className="space-y-8">
            {results.map((project) => (
              <div
                key={project.title}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <button
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    onClick={() => saveProject(project)}
                  >
                    {savedProjects.has(project.title) ? (
                      <FiCheck className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <FiStar className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-gray-400 mb-4">{project.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-blue-400">Difficulty:</span>
                    <span className="text-gray-300">
                      {project.difficultyLevel}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">
                    Roadmap:
                  </h4>
                  <ul className="list-disc list-inside text-gray-400 text-sm">
                    {project.roadmap.map((step, index) => (
                      <li key={index}>
                        {step.step} -{" "}
                        <span className="text-blue-400">{step.difficulty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
