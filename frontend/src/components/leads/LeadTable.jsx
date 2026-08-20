import { Link } from "react-router-dom";

const LeadTable = ({ leads, filters }) => {
  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body p-0">
        <div className="overflow-x-auto">

          <table className="table">

            <thead>
              <tr>
                <th>Lead</th>
                <th>Company</th>
                <th>Source</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th className="text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
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

                  {/* Actions */}
                  <td className="text-right">
                    {filters.deleted === "true" ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline"
                      >
                        Restore
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
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
};

export default LeadTable;