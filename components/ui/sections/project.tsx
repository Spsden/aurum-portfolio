import ProjectCard from "@/components/helpers/project-card";
import { Project } from "@/types/project.t";
import { Reveal, StaggerWrapper, StaggerItem } from "../enhancers/motion-utils";

type Props = {
  projects: Project[];
};

export default function ProjectsGrid({ projects }: Props) {
  return (
    <section id="projects" className="max-w-7xl mx-auto scroll-mt-24">
      <Reveal>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">
          Projects
        </h2>
      </Reveal>

      <StaggerWrapper className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {projects.map((p) => (
          <StaggerItem key={p.id}>
            <ProjectCard project={p} />
          </StaggerItem>
        ))}
      </StaggerWrapper>
    </section>
  );
}
