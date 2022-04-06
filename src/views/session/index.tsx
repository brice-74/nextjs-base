import { sessionsFromAuth } from "@data/session"
import clsx from "clsx"
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
      <p className="mb-10 font-black text-3xl">Sessions</p>
      <div className="grid grid-cols-2 gap-2">
        {list.map((item) => {
          return (
            <div key={item.id} className="text-sm bg-th-light-1 p-4 rounded-[10px] drop-shadow-xl flex-col">
              <div className="grid grid-flow-col">
                <div className="flex-col mr-4">
                  <p className="mb-4">IP</p>
                  <p>Agent</p>
                </div>
                <div className="flex-col">
                  <p className="mb-4 text-th-medium-1">{item.ip}</p>
                  <p className="mb-4 text-th-medium-1">{item.agent}</p>
                  <p className={clsx(
                    "px-4 py-2 rounded-[10px] inline-block text-th-light-1 ml-auto",
                    item.active ? "bg-th-success" : "bg-th-danger"
                  )}>
                    {item.active ? "active" : "inactive"}
                  </p>
                </div>
              </div> 
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
      keepPreviousData: true
    }
  ) 
}

export { Sessions }