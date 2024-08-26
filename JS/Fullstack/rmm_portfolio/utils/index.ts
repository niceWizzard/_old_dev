import { Project } from "@/types";
import { useEffect, useState } from "react";

export function getProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const rootUrl =
    "https://raw.githubusercontent.com/fireWizard23/profile_projects_list/main";

  useEffect(() => {
    (async () => {
      console.log("LSKDJFLSDKJFLKJ");
      const projectsResponse = await fetch(`${rootUrl}/list.json`, {
        next: { revalidate: 3000 },
      });

      const projectsJson: Project[] = await projectsResponse.json();

      setProjects(
        projectsJson.map((project) => {
          return {
            ...project,
            image: `${rootUrl}/${project.image}`,
          };
        })
      );
    })();
  }, []);

  return projects;
}
