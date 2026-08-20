import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/useAuth";

import { getUsers } from "../../services/userService"
import { getLeads } from "../../services/leadService";

import LeadToolbar from "../../components/leads/LeadToolbar"
import LeadTable from "../../components/leads/LeadTable";


const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const isMember = user?.role === "member";

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    assignedTo: "",
    deleted: "false",
    sort: "createdAt",
    order: "desc",
    page: 1,
    limit: 10,
  });

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    async function fetchAssignableUsers() {
      try {
        const response = await getUsers({
          active: "true",
          deleted: "false",
          limit: 100,

        });

        setUsers(response.users);
      } catch (error) {
        console.error(error);
      }
    }

    if (!isMember) {
      fetchAssignableUsers();
    }
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const response = await getLeads(filters);

      setLeads(response.data.leads);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  const handleFilterChange = (changes) => {
    setFilters((previous) => ({
      ...previous,
      ...changes,
      page: 1
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Leads
          </h1>

          <p className="text-sm text-base-content/60 mt-1">   
            Track and manage your sales leads.
          </p>
        </div>

        {!isMember && (
          <Link
            to="/leads/new"
            className="btn btn-primary"
          >
            + Add Lead
          </Link>
        )}

      </div>

      {/* Toolbar */}
      <LeadToolbar 
        filters={filters}
        onFilterChange={handleFilterChange}
        users={users}
        isMember={isMember}
      />

      {/* Table */}
      <LeadTable 
        leads={leads}
        filters={filters}
        loading={loading}
        isMember={isMember}
      />

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between">

          <p className="text-sm text-base-content/60">
            Showing {leads.length} of {pagination.totalItems} leads
          </p>

          <div className="join">

            <button
              type="button"
              className="join-item btn btn-sm"
              disabled={pagination.page === 1}
              onClick={() => {
                setFilters((previous) => ({
                  ...previous,
                  page: previous.page - 1,
                }));
              }}
            >
              ←
            </button>

            <button
              type="button"
              className="join-item btn btn-sm btn-active"
            >
              {pagination.page} of {pagination.totalPages}
            </button>

            <button
              type="button"
              className="join-item btn btn-sm"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => {
                setFilters((previous) => ({
                  ...previous,
                  page: previous.page + 1,
                }));
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeadsPage