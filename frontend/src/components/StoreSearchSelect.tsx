import { useState, useRef, useEffect } from "react"
import type { SallingStore } from "../types/SallingStore"

type Props = {
  stores: SallingStore[]
  selected: SallingStore | undefined
  onChange: (store: SallingStore | undefined) => void
}

export default function StoreSearchSelect({ stores, selected, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  const filtered = stores.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div className="store-select-wrapper" ref={ref}>
      <input
        className="input store-search-input"
        placeholder="Søg butik…"
        value={query || selected?.name || ""}
        onChange={e => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className="store-dropdown">
          {filtered.length === 0 && (
            <div className="store-option disabled">Ingen butikker matcher</div>
          )}

          {filtered.map(store => (
            <div
              key={store.id}
              className="store-option"
              onClick={() => {
                onChange(store)
                setQuery("")
                setOpen(false)
              }}
            >
              {store.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
