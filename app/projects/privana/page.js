// app/projects/privana/page.js
import ProjectDetail from "../../components/ProjectDetail";

export default function PrivanaPage() {
  return (
    <ProjectDetail
      name="Privana"
      tagline="WHERE PRIVACY MEETS PRECISION IN EVERY LINE."
      index="02"
      category="Residential"
      images={{
        detail: "/projects/privana/detail.jpg",
        full: "/projects/privana/full.jpg",
      }}
    />
  );
}