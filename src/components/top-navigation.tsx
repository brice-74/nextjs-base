import { useContext } from "react"
import { SideNavContext } from "@context/side-nav"
import { Button } from "./button"
import { useTheme } from 'next-themes';
import { ItemSelect, ItemSelectOption } from "./item-select";
import { SpaceNB } from "@utils/unicode";
import { SunSVG } from "./svg/sun";
import { useRouter } from "next/router";
import clsx from "clsx";
import { MeContext } from "@context/me";
import { useLogout } from "@data/logout";

const themesOptions: ItemSelectOption[] = [
  [`🌝${SpaceNB(2)}light`, "light"],
  [`🌚${SpaceNB(2)}dark`, "dark"]
]

const registerPATH = "/auth/register"
const loginPATH = "/auth/login"

function TopNavigation() {
  const navCtx = useContext(SideNavContext)
  const user = useContext(MeContext)
  
  const logout = useLogout()
  const { asPath } = useRouter();
  const { theme, setTheme } = useTheme()
  
  return (
    <div className="z-10 fixed w-full backdrop-blur">
      <div className="flex p-4">
        <Button
          as="button"
          className="space-y-1"
          onClick={() => navCtx?.toggleOpen()}
        >
          <div className="w-8 h-0.5 bg-th-light-1"></div>
          <div className="w-8 h-0.5 bg-th-light-1"></div>
          <div className="w-5 h-0.5 bg-th-light-1"></div>
        </Button>
        <ItemSelect 
          parentClassName="ml-auto mr-4"
          btnClassName="bg-th-light-1-op px-1 rounded-full h-full stroke-th-medium-1
          hover:bg-th-light-1 hover:stroke-th-dark-1"
          itemsClassName="top-[3rem] right-0"
          options={themesOptions}
          onSelect={(val) => setTheme(val)}
          defaultActive={theme as string}
        >
          <SunSVG className="fill-transparent w-full h-full" />
        </ItemSelect>
        {user?.me ? (
          <Button
            as="button"
            className="bg-th-primary text-th-light-1 py-1 px-4 rounded-[10px]
            hover:bg-th-primary-dark"
            onClick={logout}
          >
            Logout
          </Button>
        ) : (
          <div className="flex">
            <Button
              as="link"
              href={loginPATH}
              className={clsx(`bg-th-primary text-th-light-1 py-1 px-4 rounded-l-[10px]
              hover:bg-th-primary-dark`,
              asPath === loginPATH ? "bg-th-primary-dark" : null)}
            >
              Login
            </Button>
            <Button
              as="link"
              href={registerPATH}
              className={clsx(`bg-th-primary text-th-light-1 py-1 px-4 rounded-r-[10px]
              hover:bg-th-primary-dark`,
              asPath === registerPATH ? "bg-th-primary-dark" : null)}
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { TopNavigation }