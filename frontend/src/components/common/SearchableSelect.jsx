import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

const SearchableSelect = ({
  value,
  options = [],
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search..."
}) => {
  const [open, setOpen] = useState(false);
  const [ search, setSearch ] = useState("");

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(
        containerRef.current && 
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  const normalizedSearch = String(search ?? "").toLowerCase();

  const filteredOptions = options.filter((option) =>
    String(option.label ?? "")
      .toLowerCase()
      .includes(normalizedSearch)
  );

  const handleSelect = (option) => {
    onChange(option.value);
    setOpen(false);
    setSearch("");
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full xl:w-44"
    >
      {/* Trigger */}
      <button
        type="button"
        className="select select-bordered w-full text-left"
        onClick={() => setOpen((previous) => !previous)}
      >
        <span className="flex-1 truncate">
          {selectedOption?.label || placeholder}
        </span>

        <ChevronDown 
          size={16}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-box border border-base-300 bg-base-100 shadow-xl">

          {/* Search */}
          <div className="p-2 border-b border-base-300">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                placeholder={searchPlaceholder}
                className="input input-sm input-bordered w-full pl-8"
                autoFocus
              />

              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-base-content/40"
              />
            </div>
          </div>

          {/* Options */}
          <div className="max-h-60 overflow-y-auto p-1">

            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-base-content/50">
                No users found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className="flex w-full items-center gap-2 rounded-btn px-3 py-2 text-left text-sm hover:bg-base-200"
                  onClick={() => handleSelect(option)}
                >
                  <span className="w-4">
                    {option.value === value && (
                      <Check size={15} />
                    )}
                  </span>

                  <span className="truncate">
                    {option.label}
                  </span>
                </button>
              ))
            )}

          </div>
        </div>
      )}
    </div>
  )
}

export default SearchableSelect;