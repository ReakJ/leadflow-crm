import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"

import { useAuth } from "../../context/useAuth";

import { getLeadById } from "../../services/leadService";

const ManageLeadPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const isMember = user?.role === "member";

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(null);

  const leadStatuses = [
    "New",
    "Assigned",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Negotiation",
    "Won"
  ];

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);

        const response = await getLeadById(id);

        setLead(response.data.lead);
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    };
    
    fetchLead();
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-[850px] items-center justify-center">
        <span className="loading loading-spinner loading-xl text-primary"/>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="py-12 text-center">
        <p className="font-medium">
          Lead not found
        </p>

        <Link
          to="/leads"
          className="btn btn-primary btn-sm mt-4"
        >
          Back to Leads
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/leads"
          className="btn btn-ghost btn-sm"
        >
          ←
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Manage Lead
          </h1>

          <p className="text-sm text-base-content/60 mt-1">
            Manage this lead's information and sales progress.
          </p>
        </div>
      </div>

      {/* Lead Overview */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body p-6">

          <div className="flex items-center gap-5">

            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content w-16 h-16 rounded-full text-xl flex items-center justify-center">
                <span>
                  {lead.name?.charAt(0)?.toUpperCase() || "L"}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {lead.name}
              </h2>

              <p className="text-sm text-base-content/60 mt-1">
                {lead.email}
              </p>

              {lead.company && (
                <p className="text-sm text-base-content/60 mt-1">
                  {lead.company}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lead Progress */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">

          <h2 className="card-title">
            Lead Progress
          </h2>

          <div className="mt-6 overflow-x-auto">
            <ul className="steps steps-vertical sm:steps-horizontal w-full">
              
              {leadStatuses.map((status) => {
                const currentIndex = leadStatuses.indexOf(lead.status);
                const statusIndex = leadStatuses.indexOf(status);

                const isCompleted = statusIndex < currentIndex;
                const isCurrent = statusIndex === currentIndex;

                return (
                  <li
                    key={status}
                    className={`step ${
                      isCompleted || isCurrent
                        ? "step-primary"
                        : ""
                    }`}
                  >
                    <span className="text-xs whitespace-nowrap">
                      {status}
                    </span>
                  </li>
                )
              })}

            </ul>
          </div>

        </div>

      </div>

      {/* Lead Information */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">

          <div className="flex items-center justify-between gap-4">
            <h2 className="card-title">
              Lead Information
            </h2>
            
            {!isMember && (
              <button
                type="button"
                className="btn btn-primary btn-sm"
              >
                Edit Details
              </button>
            )}
          </div>

          {/* Contact & Company */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-base-content/80">
              Contact & Company
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <p className="text-sm text-base-content/50">
                  Name
                </p>
                <p className="font-medium mt-1">
                  {lead.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-base-content/50">
                  Email
                </p>
                <p className="font-medium mt-1">
                  {lead.email}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-base-content/50">
                  Phone
                </p>
                <p className="font-medium mt-1">
                  {lead.phone || "—"}
                </p>
              </div>

              <div>
                <p className="text-sm text-base-content/50">
                  Company
                </p>
                <p className="font-medium mt-1">
                  {lead.company || "—"}
                </p>
              </div>

              <div>
                <p className="text-sm text-base-content/50">
                  Source
                </p>
                <p className="font-medium mt-1">
                  {lead.source}
                </p>
              </div>

              <div>
                <p className="text-sm text-base-content/50">
                  Created By
                </p>

                <p className="font-medium mt-1">
                  {lead.createdBy?.name || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Assignment */}
          {!isMember && (
            <div className="mt-8 pt-6 border-t border-base-300">
              <h3 className="text-sm font-semibold text-base-content/80">
                Assignment
              </h3>

              {lead.assignedTo ? (
                <div className="mt-4 flex items-center justify-between gap-6">

                  {/* Assigned User */}
                  <div className="flex items-center gap-4">

                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content w-12 h-12 rounded-full flex items-center justify-center">
                        <span>
                          {lead.assignedTo.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p
                        className={`font-medium ${
                          !lead.assignedTo.isActive
                            ? "text-base-content/40"
                            : ""
                        }`}
                      >
                        {lead.assignedTo.name}
                      </p>

                      <p className="text-sm text-base-content/60">
                        {lead.assignedTo.email}
                      </p>

                      <p className="text-xs text-base-content/50 capitalize mt-0.5">
                        {lead.assignedTo.role}
                        {!lead.assignedTo.isActive && " · Inactive"}
                      </p>
                    </div>

                  </div>

                  {/* Change Assignee */}
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                  >
                    Change Assignee
                  </button>

                </div>
              ) : (
                <div className="mt-4 flex items-center justify-between gap-4">

                  <div>
                    <p className="font-medium text-base-content/60">
                      Unassigned
                    </p>

                    <p className="text-sm text-base-content/50">
                      This lead has not been assigned to anyone.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                  >
                    Assign Lead
                  </button>

                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      {!isMember && (
        <div className="card bg-base-100 border border-error/30">
          <div className="card-body">

            <h2 className="card-title text-error">
              Danger Zone
            </h2>

            <div className="flex items-center justify-between gap-4">

              <div>
                <p className="font-medium">
                  Delete this lead
                </p>

                <p className="text-sm text-base-content/60">
                  This will remove the lead from the current lead list.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-error btn-outline"
              >
                Delete Lead
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default ManageLeadPage;