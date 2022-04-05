import { MeContext } from "@context/me"
import { useContext } from "react"
import { Sessions } from "./session"

function Home() {
 // const { me } = useMe()
  const user = useContext(MeContext)

  return (
    <div>
      {user?.me ? (
        <Sessions />
      ) : null}
    </div>
  )
}

export { Home }