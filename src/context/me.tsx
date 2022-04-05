import { useMe } from "@data/me";
import { ChildrenProps, Role, UserAccount } from "@types";
import { createContext, useEffect, useState } from "react";

type ProviderValueProps = {
  me: UserAccount | null
  can: (role: Role | Role[]) => boolean
};

const MeContext = createContext<ProviderValueProps | undefined>(undefined)

const MeContextProvider = ({children}: ChildrenProps) => {
  const { me, can } = useMe()

  return (
    <MeContext.Provider value={{
      me,
      can
    }}>
      { children }
    </MeContext.Provider>
  )
}

export { MeContext, MeContextProvider }