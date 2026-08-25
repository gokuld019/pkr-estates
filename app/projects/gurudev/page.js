// app/projects/gurudev/page.js
import ProjectDetail from "../../components/ProjectDetail";

export default function GurudevPage() {
  return (
    <ProjectDetail
      name="Gurudev"
      tagline="A RESIDENCE BUILT ON QUIET DETAIL AND LASTING MATERIAL."
      index="01"
      category="Residential"
      images={{
        detail: "/gurudev1.jpeg",
        full: "/gurudev2.jpeg",
      }}
    />
  );
}