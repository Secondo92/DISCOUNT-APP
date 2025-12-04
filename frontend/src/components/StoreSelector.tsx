import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import { type SallingStore } from '../types/SallingStore'

type StoreComponent = {
    stores: SallingStore[],
    selected: SallingStore | undefined,
    onChange: (store: SallingStore) => void
}

export default function StoreSelector({ stores, selected, onChange }: StoreComponent) {
    return (
        <div className='store-selector'>
            {/* store picker later */}
            <Listbox value={selected} onChange={onChange}>
                <Label className="block text-sm/6 font-medium text-white">Vælg en butik</Label>
                <div className="relative mt-2">
                    <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-gray-800/50 py-1.5 pr-2 pl-3 text-left text-white outline-1 -outline-offset-1 outline-white/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500 sm:text-sm/6">
                        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                            <img
                                alt=""
                                src={`/${selected?.brand}.png`}
                                className="size-5 shrink-0 rounded-full bg-gray-700 outline -outline-offset-1 outline-white/10"
                            />
                            <span className="block truncate">{selected?.name}</span>
                        </span>
                        <ChevronUpDownIcon
                            aria-hidden="true"
                            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                        />
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base outline-1 -outline-offset-1 outline-white/10 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                    >
                        {stores.map((store) => (
                            <ListboxOption
                                key={store.id}
                                value={store}
                                className="group relative cursor-default py-2 pr-9 pl-3 text-white select-none data-focus:bg-indigo-500 data-focus:outline-hidden"
                            >
                                <div className="flex items-center">
                                    <img
                                        alt=""
                                        src={`/${store.brand}.png`}
                                        className="size-5 shrink-0 rounded-full outline -outline-offset-1 outline-white/10"
                                    />
                                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{store.name}</span>
                                </div>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-400 group-not-data-selected:hidden group-data-focus:text-white">
                                    <CheckIcon aria-hidden="true" className="size-5" />
                                </span>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
        </div>
    )
}