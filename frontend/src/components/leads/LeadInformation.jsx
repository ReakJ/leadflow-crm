import LeadFormFields from "./LeadFormFields";

const LeadInformation = ({ 
  lead, 
  isMember, 
  editing, 
  setEditing,
  register,
  errors,
  handleSubmit,
  reset,
  isSubmitting,
  onUpdate 
}) => {
  const restoreForm = () => {
    reset({
      name: lead.name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      company: lead.company || "",
      source: lead.source || "",
    });
  }

  const handleEdit = () => {
    restoreForm();
    setEditing(true);
  };

  const handleCancel = () => {
    restoreForm();
    setEditing(false);
  };

  return (
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <h2 className="card-title">
              Lead Information
            </h2>
            
            {editing ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  disabled={isSubmitting}
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  form="lead-edit-form"
                  className="btn btn-primary btn-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            ) : (
              !isMember && (
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={handleEdit}
                >
                  Edit Details
                </button>
              )  
            )}
          </div>

          {/* Information */}
          {editing ? (
            <form
            id="lead-edit-form"
              onSubmit={handleSubmit(onUpdate)}
            >
              <LeadFormFields 
                register={register}
                errors={errors}
              />

            </form>
          ) : (
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
          )}


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
  )
}

export default LeadInformation;