import { Link } from "react-router-dom";

const LeadTable = ({ leads, filters, loading, isMember, onRestore, restoringId }) => {
  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body p-0">
        <div className="relative overflow-x-auto">

          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-base-100/70 backdrop-blur-2xl">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          )}

          <table className="table">

            <thead>
              <tr>
                <th>Lead</th>
                <th>Company</th>
                <th>Source</th>
                <th>Status</th>
                {!isMember && <th>Assigned To</th>}
                <th className="text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center"
                  >
                    <p className="font-medium">
                      No leads found
                    </p>

                    <p className="mt-1 text-sm text-base-content/60">
                      Try adjusting your search or filters.
                    </p>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id}>

                    {/* Lead */}
                    <td>
                      <div className="flex items-center gap-3">

                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content w-10 rounded-full flex items-center justify-center">
                            <span>
                              {lead.name?.charAt(0)?.toUpperCase() || "L"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="font-medium">
                            {lead.name}
                          </p>

                          <p className="text-sm text-base-content/60">
                            {lead.email}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Company */}
                    <td>
                      {lead.company || "—"}
                    </td>

                    {/* Source */}
                    <td>
                      {lead.source}
                    </td>

                    {/* Status */}
                    <td>
                      <span className="badge badge-outline">
                        {lead.status}
                      </span>
                    </td>

                    {/* Assigned To */}
                    {!isMember && (
                      <td>
                        {lead.assignedTo ? (
                          <span 
                            className={
                              !lead.assignedTo.isActive
                                ? "text-sm text-base-content/40"
                                : "text-sm"
                            }
                          >
                            {lead.assignedTo.name}
                          </span>
                        ) : (
                          <span className="text-sm text-base-content/50">
                            Unassigned
                          </span>
                        )}
                      </td>
                    )}

                    {/* Actions */}
                    <td className="text-right">
                      {lead.isDeleted ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                          disabled={restoringId === lead._id}
                          onClick={() => onRestore(lead._id)}
                        >
                          {restoringId === lead._id ? (
                            <>
                             <span className="loading loading-spinner loading-sm"/>
                              Restoring...
                            
                            </>
                          ) : (
                            "Restore"
                          )}
                        </button>
                      ) : (
                        <div className="flex justify-end gap-1">
                          <Link
                            to={`/leads/${lead._id}`}
                            className="btn btn-ghost btn-sm"
                          >
                            Manage
                          </Link>

                          <Link
                            to={`/leads/${lead._id}/notes`}
                            className="btn btn-ghost btn-sm"
                          >
                            Notes
                          </Link>
                        </div>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
};

export default LeadTable;