import { Search } from "lucide-react"
import { useEffect, useState } from "react"

import SearchableSelect from "../common/SearchableSelect";

const LeadToolbar = ({
  filters, 
  onFilterChange,
  users,
  isMember
}) => {

  const [searchInput, setSearchInput] = useState(filters.search);

  const assigneeOptions = [
    {
      value: "",
      label: "All assignees",
    },
    ...users
      .filter(
        (user) => 
          user.isActive &&
        (user.role === "manager" || user.role === "member")
     )
     .map((user) => ({
      value: user.id,
      label: user.name,
     })),
  ];

  useEffect(() => {
    if (searchInput === filters.search) {
      return;
    }

    const timer = setTimeout(() => {
      onFilterChange({ search: searchInput });
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput, filters.search]);

  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body p-4">
        
        <div className="flex flex-col lg:flex-row gap-3">

          {/* Search */}
          <div className="relative flex-1">

            <input 
              type="text" 
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value);
              }}
              placeholder="Search leads..."
              className="input input-bordered w-full pl-10"
            />
              <Search 
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
              />
          </div>

          {/* Status */}
          <select
            className="select select-bordered w-full xl:w-44"
            value={filters.status}
            onChange={(event) => {
              onFilterChange({
                status: event.target.value,
              });
            }}
          >
            <option value="">All statuses</option>
            <option value="New">New</option>
            <option value="Assigned">Assigned</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>

          {!isMember && (
            <>
              {/* Assigned To */}
              <SearchableSelect 
                value={filters.assignedTo}
                options={assigneeOptions}
                onChange={(value) => {
                  onFilterChange({
                    assignedTo: value,
                  });
                }}
                placeholder="All assignees"
                searchPlaceholder="Search assignee..."
              />

              {/* View */}
              <select
                className="select select-bordered w-full xl:w-40"
                value={filters.deleted}
                onChange={(event) => {
                  onFilterChange({ 
                    deleted: event.target.value 
                  });
                }}
              >
                <option value="false">Current leads</option>
                <option value="true">Deleted leads</option>
                <option value="all">All leads</option>
              </select>
            </>
          )}

          {/* Sort */}
          <select
            className="select select-bordered w-full xl:w-44"
            value={`${filters.sort}-${filters.order}`}
            onChange={(event) => {
              const [sort, order] = event.target.value.split("-");
              onFilterChange({
                sort,
                order
              });
            }}
          >
            <option value="createdAt-desc">
              Newest
            </option>

            <option value="createdAt-asc">
              Oldest
            </option>

            <option value="name-asc">
              Name A–Z
            </option>

            <option value="name-desc">
              Name Z–A
            </option>

            <option value="company-asc">
              Company A–Z
            </option>

            <option value="company-desc">
              Company Z–A
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default LeadToolbar;