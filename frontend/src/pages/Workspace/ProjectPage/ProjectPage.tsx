import { useParams } from "react-router"

export default function ProjectPage() {
  const { id } = useParams()

  return (
    <section>
      <p>ProjectPage</p>
      <p>Project ID: {id}</p>
    </section>
  )
}
