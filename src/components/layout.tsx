import { SideNavigation } from "./side-navigation";
import { TopNavigation } from "./top-navigation";
import { SideNavContext } from "src/context/side-nav";
import { useContext } from "react";
import clsx from "clsx";
import { ChildrenProps } from "@types";
import { WaveSVG } from "./svg/wave";

function Layout({ 
  children 
}: ChildrenProps) {
  const navCtx = useContext(SideNavContext)
  
  return (
    <div className="min-h-screen flex bg-layout text-th-dark-1">
      <div className="z-[0] absolute w-full h-[30vh]">
        <div className="bg-top-layout w-full h-full">
        </div>
        <WaveSVG className="w-full h-auto fill-th-primary" />
      </div>
      
      <TopNavigation />
      <SideNavigation />

      <div className={clsx(
        "transition-[margin-left] z-[1] p-10 mt-[var(--top-nav-height)] flex flex-col w-full",
        navCtx?.isOpen ? "ml-[var(--side-nav-width)]"
        : "ml-0"
      )}>
        { children }
      </div>
    </div>
  );
}

export { Layout };


