import * as React from "react";
import { useRef, useState, useEffect } from "react";
import clsx from "clsx";

import { useOnClickOutside } from "@utils/dom-events";
import { ChildrenProps } from "@types";
import { Button } from "./button";

type ItemSelectOption = [title: string, value: ItemOptionValue];
type ItemOptionValue = string | number | boolean

type ItemSelectProps = {
  options?: ItemSelectOption[]
  parentClassName?: string
  btnClassName?: string
  itemsClassName?: string
  defaultActive?: ItemOptionValue
  onSelect?: (val: ItemOptionValue) => void
  onOptionVisible?: (val: boolean) => void
}

function ItemSelect({
  parentClassName,
  btnClassName,
  itemsClassName,
  options = [],
  defaultActive,
  onSelect,
  onOptionVisible,
  children,
}: ItemSelectProps & ChildrenProps) {
  const [optionsVisible, setOptionsVisible] = useState(false);

  useEffect(() => {
    onOptionVisible?.(optionsVisible)
  }, [optionsVisible])

  const divRef = useRef<HTMLDivElement>(null);

  const hasOptions = options.length ?? 0 > 0;

  useOnClickOutside(divRef, () => setOptionsVisible(false));
  
  return (
    <div 
      ref={divRef}
      className={clsx("relative", parentClassName)} 
      onClick={() => setOptionsVisible(true)}
    >
      <Button
        as="button"
        className={btnClassName}
      >
        { children }
      </Button>
      { hasOptions && optionsVisible ? (
        <Items 
          options={options} 
          defaultActive={defaultActive} 
          itemsClassName={itemsClassName}
          onSelect={onSelect} 
        />
      ) : null }
    </div>
  );
}

type ItemsProps = {
  options: ItemSelectOption[];
  defaultActive?: ItemOptionValue
  itemsClassName?: string
  onSelect?: (val: ItemOptionValue) => void
}

function Items({options, defaultActive, itemsClassName, onSelect}: ItemsProps) {
  const [active, setActive] = useState(defaultActive)

  return (
    <div className={clsx(
      itemsClassName,
      "absolute flex flex-col bg-th-primary overflow-hidden rounded-l-xl",
      options.length > 5 && "max-h-40 overflow-y-scroll"
    )}>
      { options.map(([title, value], index) => {
        return (
          <button 
            key={index} 
            onClick={() => {
              onSelect?.(value)
              setActive(value)
            }}
            className={clsx(
              "p-2 hover:bg-th-primary-dark text-th-light-1",
              active === value ? "bg-th-primary-dark" : null
            )}
          >
            { title }
          </button>
        )
      }) }
    </div>
  )
}

export { ItemSelect };
export type { ItemSelectOption };
