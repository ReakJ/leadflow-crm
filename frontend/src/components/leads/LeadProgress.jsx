const leadStatuses = [
  "New",
  "Assigned",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Negotiation",
  "Won"
];

const allowedTransitions = {
  New: ["Assigned"],
  Assigned: ["Contacted", "Lost"],
  Contacted: ["Qualified", "Lost"],
  Qualified: ["Proposal Sent", "Lost"],
  "Proposal Sent": ["Negotiation", "Lost"],
  Negotiation: ["Won", "Lost"],
  Won: [],
  Lost: [],
};

const LeadProgress = ({
  status,
  onStatusChange,
  updating
}) => {

  const isLost = status === "Lost";

  const currentIndex = leadStatuses.indexOf(status);

  const canMarkLost = allowedTransitions[status]?.includes("Lost");

  const handleStatusClick = (nextStatus) => {
    if (updating) return;

    onStatusChange(nextStatus);
  }

  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body">

        <h2 className="card-title">
          Lead Progress
        </h2>

        {isLost ? (

          /* Lost State */
          <div className="mt-6 flex items-center gap-4 border-t border-base-300 pt-6">

            <div className="w-10 h-10 rounded-full bg-error/10 text-error flex items-center justify-center">
              ✕
            </div>

            <div>
              <p className="font-medium text-error">
                Lead Lost
              </p>

              <p className="text-sm text-base-content/60 mt-1">
                This lead is no longer active in the sales pipeline.
              </p>
            </div>

          </div>

        ) : (
          <>
            <div className="mt-6 overflow-x-auto">
              <ul className="steps steps-vertical sm:steps-horizontal w-full">
                
                {leadStatuses.map((leadStatus) => {
    
                  const statusIndex = leadStatuses.indexOf(leadStatus);
    
                  const isCompleted = statusIndex < currentIndex;
    
                  const isCurrent = leadStatus === status;
    
                  const isNext = allowedTransitions[status]?.includes(leadStatus);
    
                  const isClickable = isNext && !updating;
    
                  return (
                    <li
                      key={leadStatus}
                      className={`step ${
                        isCompleted || isCurrent
                          ? "step-primary"
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        disabled={!isClickable}
                        onClick={() => handleStatusClick(leadStatus)}
                        className={`text-xs whitespace-nowrap ${
                          isClickable
                            ? "cursor-pointer hover:text-primary"
                            : "cursor-default" 
                        }`}
                      >
                        {leadStatus}
                      </button>
                    </li>
                  )
                })}
    
              </ul>
            </div>
    
            {/* Lost */}
            {canMarkLost && (
              <div className="flex justify-end mt-6 pt-4 border-t border-base-300">
                <button
                  type="button"
                  className="btn btn-error btn-outline btn-sm"
                  disabled={updating}
                  onClick={() =>
                    handleStatusClick("Lost")
                  }
                >
                  {updating ? (
                    <>
                      <span className="loading loading-spinner loading-xs "/>
                      Updating...
                    </>
                  ) : (
                    "Mark as Lost"
                  )}
                </button>
              </div>
            )}          
          </>
        )}
      </div>
    </div>
  );
};

export default LeadProgress;