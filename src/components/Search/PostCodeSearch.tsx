/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { useSearchResults } from "@/services/search";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

import { Loader2, Search } from "lucide-react";
import { useState } from "react";

// Lightweight debounce function to replace lodash
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const PostCodeSearch = ({
  onSelectSearch,
}: {
  onSelectSearch: (value: any, setSearch?: (value: string) => void) => void;
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data, isLoading } = useSearchResults(debouncedSearch);
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onDebouncedSearchChange(e);
  };
  const onDebouncedSearchChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDebouncedSearch(e.target.value);
    },
    500
  );

  const onSelect = (value: any) => {
    onSelectSearch(value, setSearch);
  };

  return (
    <Combobox
      value={search}
      onChange={(value) => onSelect(value)}
      immediate
      // onChange={(value) => setSearch(value)}
    >
      <div className="relative w-[90%] md:w-[60%] lg:w-[50%] mx-auto">
        <div className="absolute left-0 h-12 w-12 bg-base-green rounded-full p-2 flex justify-center items-center">
          {isLoading ? (
            <Loader2
              className="w-6 h-6 text-white animate-spin"
              strokeWidth={2}
            />
          ) : (
            <Search className="w-6 h-6 text-white stroke-2 md:stroke-3" />
          )}
        </div>
        <ComboboxInput
          defaultValue={search}
          value={search}
          autoComplete="off"
          onChange={(event) => onSearchChange(event)}
          placeholder="Location or postcode"
          className="w-full h-12 pl-14 rounded-full bg-white text-black px-4 outline-none border-4 border-base-green focus:border-base-green font-medium"
        />
      </div>
      <ComboboxOptions
        anchor="bottom"
        transition
        className={cn(
          "w-(--input-width) rounded-xl bg-white shadow border border-gray-200 z-50 empty:invisible",
          "transition duration-100 ease-in data-leave:data-closed:opacity-0"
        )}
      >
        {data?.map((place: any) => (
          <ComboboxOption
            key={place.osm_id}
            value={place}
            className="group flex flex-col cursor-default rounded-lg px-4 py-1.5 select-none data-focus:bg-gray-200"
          >
            <div className="text-sm text-primary-blue">{place.name}</div>
            <div className="text-xs text-gray-500 truncate">
              {place.display_name}
            </div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default PostCodeSearch;
