import { ChildrenProps } from "@types";
import { createContext, useState } from "react";

type ProviderValueProps = {
  isOpen: boolean
  toggleOpen: () => void
  newState: (state: boolean) => void
};

const SideNavContext = createContext<ProviderValueProps | undefined>(undefined);

const SideNavContextProvider = ({isOpen, children }: {isOpen: boolean} & ChildrenProps) => {
  const [isOpenSideNav, setIsOpenSideNav] = useState(isOpen)

  return (
    <SideNavContext.Provider value={{
      isOpen: isOpenSideNav,
      toggleOpen: () => setIsOpenSideNav(!isOpenSideNav),
      newState: (state: boolean) => setIsOpenSideNav(state)
    }}>
      {children}
    </SideNavContext.Provider>
  );
};

export { SideNavContext, SideNavContextProvider };