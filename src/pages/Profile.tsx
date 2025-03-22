import React, { useEffect, useState } from "react";
import profileData from "./prog.json";

interface ProfileData {
  name: string;
  bio: string;
  location: string;
  website?: string;
  email: string;
  linkedin: string;
  github: string;
  gfg: string;
  codeforces: string;
  codechef: string;
  skills: string[];
  projects: { name: string; link: string }[];
}

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

interface GitHubStats {
  public_repos: number;
  languages: string[];
  username: string;
}

const LeetCodeStatsBox: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://leetcode-stats-api.herokuapp.com/Venkat")
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching LeetCode stats:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="animate-pulse bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  if (!stats)
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl shadow-lg border border-red-100">
        Failed to load LeetCode stats
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          LeetCode Statistics
        </h2>
        <div className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
          #{stats.ranking}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Total Solved</div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalSolved}
              <span className="text-sm text-gray-500 ml-1">
                / {stats.totalQuestions}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50 p-3 rounded-xl shadow-sm border border-green-100">
              <div className="text-sm text-green-600 mb-1">Easy</div>
              <div className="text-lg font-semibold text-green-700">
                {stats.easySolved}
              </div>
              <div className="text-xs text-green-500">/ {stats.totalEasy}</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-xl shadow-sm border border-yellow-100">
              <div className="text-sm text-yellow-600 mb-1">Medium</div>
              <div className="text-lg font-semibold text-yellow-700">
                {stats.mediumSolved}
              </div>
              <div className="text-xs text-yellow-500">
                / {stats.totalMedium}
              </div>
            </div>
            <div className="bg-red-50 p-3 rounded-xl shadow-sm border border-red-100">
              <div className="text-sm text-red-600 mb-1">Hard</div>
              <div className="text-lg font-semibold text-red-700">
                {stats.hardSolved}
              </div>
              <div className="text-xs text-red-500">/ {stats.totalHard}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100">
            <div className="text-sm text-blue-500 mb-1">Acceptance Rate</div>
            <div className="text-2xl font-bold text-blue-700">
              {stats.acceptanceRate}%
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl shadow-sm border border-purple-100">
            <div className="text-sm text-purple-500 mb-1">
              Contribution Points
            </div>
            <div className="text-2xl font-bold text-purple-700">
              {stats.contributionPoints}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GitHubStatsBox: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const username = "VenkataramanaKB"; // Replace with your GitHub username

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        const userData = await userResponse.json();

        // Fetch repositories to get languages
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        const reposData = await reposResponse.json();

        // Get unique languages from repositories
        const languages = Array.from(
          new Set(
            reposData
              .map((repo: any) => repo.language)
              .filter((lang: string) => lang !== null)
          )
        );

        setStats({
          public_repos: userData.public_repos,
          languages,
          username: userData.login,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading)
    return (
      <div className="animate-pulse bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  if (!stats)
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl shadow-lg border border-red-100">
        Failed to load GitHub stats
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
          GitHub Statistics
        </h2>
        <a
          href={`https://github.com/${stats.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
        >
          @{stats.username}
        </a>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Total Repositories</div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.public_repos}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Languages Used</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {stats.languages.map((lang, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const profile = profileData as ProfileData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {profile.name}
              </h1>
              <p className="text-gray-600 mt-2 text-lg">{profile.bio}</p>
              <p className="text-gray-500 mt-1 flex items-center">
                <span className="mr-1">📍</span> {profile.location}
              </p>
            </div>
          </div>

          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              🌐 {profile.website}
            </a>
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact & Profiles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-xl mr-3">📧</span>
                <span className="text-gray-700">{profile.email}</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-xl mr-3">🔗</span>
                <span className="text-gray-700">LinkedIn</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-xl mr-3">🐙</span>
                <span className="text-gray-700">GitHub</span>
              </a>
              <a
                href={profile.gfg}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-xl mr-3">📗</span>
                <span className="text-gray-700">GeeksforGeeks</span>
              </a>
              <a
                href={profile.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-xl mr-3">💡</span>
                <span className="text-gray-700">Codeforces</span>
              </a>
              <a
                href={profile.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-xl mr-3">🏆</span>
                <span className="text-gray-700">CodeChef</span>
              </a>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full text-sm font-medium shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.projects.map((project, index) => (
                <a
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="text-xl mr-3">🔗</span>
                  <span className="text-gray-700">{project.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GitHubStatsBox />
          <LeetCodeStatsBox />
        </div>
      </div>
    </div>
  );
};

export default Profile;
