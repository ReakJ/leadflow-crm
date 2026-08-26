import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import LeadOverviewChart from "../../components/dashboard/LeadOverviewChart";
import LeadStatusChart from "../../components/dashboard/LeadStatusChart";

import { getDashboard } from "../../services/dashboardService";

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [leadOverview, setLeadOverview] = useState([]);

  const [period, setPeriod] = useState("7d");

  const [loading, setLoading] = useState(true);
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [error, setError] = useState("");

  const isFirstRender = useRef(true);

  const getStatusClass = (status) => {
    switch (status) {
      case "Won":
        return "badge-success";

      case "Lost":
        return "badge-error";

      case "New":
        return "badge-info";

      case "Qualified":
        return "badge-primary";

      case "Negotiation":
        return "badge-warning";

      default:
        return "badge-outline";
    }
  };

  // Initial dashboard data
  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        setError("");
  
        const data = await getDashboard();;

        setSummary(data.summary);
        setStatusDistribution(data.statusDistribution);
        setRecentLeads(data.recentLeads);
        setLeadOverview(data.leadOverview)
      } catch (error) {
        console.error(error);
        setError("Unable to load dashboard data.")
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard()
  }, []);

  // Only fetch lead overview when period changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    async function fetchOverview() {
      try {
        setOverviewLoading(true);

        const data = await getDashboard(period);

        setLeadOverview(data.leadOverview);
      } catch (error) {
        console.error(error);
      } finally {
        setOverviewLoading(false)
      }
    }

    fetchOverview();
  }, [period]);

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"/>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card bg-base-100 border border-error/30">
        <div className="card-body items-center text-center">
          <p className="font-medium text-error">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <p className="text-sm text-base-content/60 mt-1">
          Here's what's happening with your leads.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body p-5">
            <p className="text-sm text-base-content/60">
              Total Leads
            </p>

            <p className="text-3xl font-semibold mt-2">
              {summary?.totalLeads}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body p-5">
            <p className="text-sm text-base-content/60">
              New Leads
            </p>

            <p className="text-3xl font-semibold mt-2">
              {summary?.newLeads}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body p-5">
            <p className="text-sm text-base-content/60">
              In Progress
            </p>

            <p className="text-3xl font-semibold mt-2">
              {summary?.inProgress}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body p-5">
            <p className="text-sm text-base-content/60">
              Converted
            </p>

            <p className="text-3xl font-semibold mt-2">
              {summary?.converted}
            </p>
          </div>
        </div>

      </div>
     
      {/* Lead Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        
        {/* Overview */}
        <div className="card bg-base-100 border border-base-300 xl:col-span-2">
          <div className="card-body">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="card-title text-base">
                  Lead Overview
                </h2>

                <p className="text-sm text-base-content/60 mt-1">
                  Leads created over time
                </p>
              </div>

              <select 
                className="select select-bordered select-sm"
                value={period}
                onChange={(event) => {
                  setPeriod(event.target.value)
                }}
                disabled={overviewLoading}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
            </div>

            <div className="relative h-64">
              {overviewLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-base-100/70">
                  <span className="loading loading-spinner loading-sm text-primary"/>
                </div>
              )}

              <div className="h-64 mt-4">
                <LeadOverviewChart data={leadOverview}/>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body">
            <div>
              <h2 className="card-title text-base">
                Lead Status
              </h2>

              <p className="text-sm text-base-content/60 mt-1">
                Current lead distribution
              </p>
            </div>

            <div className="h-64 mt-4">
              <LeadStatusChart data={statusDistribution} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Leads */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body p-0">
          <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-4">
            <div>
              <h2 className="card-title text-base">
                Recent Leads
              </h2>

              <p className="text-sm text-base-content/60 mt-1">
                Recently created leads
              </p>
            </div>

            <Link
              to="/leads"
              className="btn btn-ghost btn-sm text-primary"
            >
              See all leads
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Lead</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                </tr>
              </thead>

              <tbody>
                {recentLeads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-10 text-center"
                    >
                      <p className="text-sm text-base-content/50">
                        No recent leads
                      </p>
                    </td>
                  </tr> 
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead._id}>
                      <td>
                        <div>
                          <p className="font-medium">
                            {lead.name}
                          </p>
                        </div>

                        <p className="text-xs text-base-content/50 mt-0.5">
                          {lead.createdAt
                            ? new Date(lead.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </p>
                      </td>

                      <td>
                        {lead.company || "—"}
                      </td>

                      <td>
                        <span className={`badge ${getStatusClass(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>

                      <td>
                        {lead.assignedTo?.name || (
                          <span className="text-base-content/50">
                            Unassigned
                          </span>
                        )}
                      </td>
                    </tr>
                  )))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;