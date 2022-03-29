import { ChildrenProps } from "@types"
import clsx from "clsx"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

type Transition = {
  defaultClasses: string
  startStage: string
  endStage: string
  jsx?: JSX.Element
}

const FadeTransition: Transition = {
  defaultClasses: "pointer-events-none z-[999] fixed h-screen w-screen bg-th-primary transition-[250ms]",
  startStage: "opacity-0",
  endStage: "opacity-100",
}

function PageTransition({
  defaultClasses,
  startStage,
  endStage, 
  jsx,
  children
} : Transition & ChildrenProps) {
  const router = useRouter()
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState(startStage)

  useEffect(() => {
    setTransitionStage(endStage)
  }, [router.asPath, endStage]);

  useEffect(() => {
    setTransitionStage(startStage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div
        onTransitionEnd={() => {
          setTransitionStage(startStage)
          setDisplayChildren(children);
        }}
        className={clsx(defaultClasses, transitionStage)}
      >
        {jsx ?? null}
      </div>
      {displayChildren}
    </div>
  );
}

export { PageTransition, FadeTransition }