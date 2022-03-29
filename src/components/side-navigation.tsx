import clsx from "clsx"
import { useContext, useMemo } from "react"
import { SideNavContext } from "@context/side-nav"
import { useRouter } from "next/router"
import Link from "next/link"
import { HomeSVG } from "./svg/home"


function SideNavigation() {
  const navCtx = useContext(SideNavContext)

  return (
    <div className={clsx(
      `transition-[left] top-[var(--top-nav-height)] z-10 fixed h-full w-[var(--side-nav-width)] mt-10`,
      navCtx?.isOpen ? "left-0"
      : "-left-[var(--side-nav-width)]"
    )}>
      <Navigation />
    </div>
  )
}

const elements: NavigationElement[] = [
  {
    title: "Home",
    path: "/",
    icon: HomeSVG
  }
];

function Navigation() {
  return (
    <nav className="h-full flex flex-col">
      {elements.map((el) => (
        <NavigationItem key={`nav-${el.title}`} {...el} />
      ))}
    </nav>
  );
}

type NavigationElement = {
  title: string
  path: string
  icon?: ({className}:{className?: string}) => JSX.Element
};

function NavigationItem({
  title,
  path,
  icon
}: NavigationElement) {
  const { asPath } = useRouter();

  const isActive = useMemo(() => {
    return asPath === path;
  }, [asPath, path]);

  return (
      <Link href={path}>
        <a className={clsx(`
          flex relative w-full px-3 py-1.5 text-th-medium-1 stroke-th-medium-1 rounded-r-[10px] bg-th-light-1-op
          hover:text-th-dark-1 hover:stroke-th-dark-1 hover:bg-th-light-1`,
          isActive ? "bg-th-light-1" : null)}>
          {icon ? icon({
            className: `stroke-2 fill-transparent mr-2 mt-0.5 h-5`
          }) : null}
          {title}
        </a>
      </Link>
  );
}

export { SideNavigation }