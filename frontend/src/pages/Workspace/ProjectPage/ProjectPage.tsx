import { useParams } from "react-router"

export default function ProjectPage() {
  const { id } = useParams()

  return (
    <section className="p-5">
      <p>ProjectPage</p>
      <p>Project ID: {id}</p>
    </section>
  )
}
