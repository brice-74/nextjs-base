import { ChildrenProps } from "@types"
import clsx from "clsx"

type BannerType = "SUCCESS" | "WARNING" | "DANGER"

type BannerProps = {
  type: BannerType
  classNames?: string
} & ChildrenProps

function Banner({children, type, classNames}: BannerProps) {
  return (
    <p 
      className={clsx(classNames, "p-5 w-full rounded-[10px] mb-8",
        type === "SUCCESS" ? "text-th-success bg-th-success-light" : null,
        type === "WARNING" ? "text-th-warning bg-th-warning-light" : null,
        type === "DANGER" ? "text-th-danger bg-th-danger-light" : null
      )}
    >
      {children}
    </p>
  )
}

export {Banner}