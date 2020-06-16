import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
      console.log(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Novo projeto ${Date.now()}`,
      url: "https://github.com/jgalmeida93/repo",
      techs: ["Javascript", "NodeJS", "ReactJS"],
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const updatedRepos = repositories.filter((repo) => repo.id !== id);

    setRepositories(updatedRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
