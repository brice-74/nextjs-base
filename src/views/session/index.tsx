import { sessionsFromAuth } from "@data/session"
import { useMemo, useState } from "react"
import { useQuery } from "react-query"

const pageLimit = 10

function Sessions() {
  const [currentPage, setCurrentPage] = useState(1)
  
  const offset = useMemo(() => {
    return (currentPage - 1) * pageLimit
  }, [currentPage])

  const { data } = useSessionsFromAuth({
    offset: offset,
    limit: pageLimit
  })

  const list = useMemo(() => {
    return data?.sessionsFromAuth.list ?? []
  }, [data])

  return (
    <div>
      <p className="mb-10 bold text-2xl">Sessions</p>
      <div className="grid grid-cols-2 gap-2">
        {list.map((item) => {
          return (
            <div key={item.id} className="bg-th-light-1 p-4 rounded-[10px] drop-shadow-xl">
              <p>{item.active ? "Actif" : "Inactif"}</p>
              <p>{item.ip}</p>
              <p>{item.agent}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function useSessionsFromAuth({
  offset,
  limit
}: {
  offset: number
  limit: number
}) {
  return useQuery(
    ["sessionsFromAuth", offset, limit],
    () => 
      sessionsFromAuth({
        offset,
        limit,
      }),
    {
      retry: false,
      keepPreviousData: true
    }
  ) 
}

export { Sessions }