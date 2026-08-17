const DashboardPage = () => {
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
              128
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body p-5">
            <p className="text-sm text-base-content/60">
              New Leads
            </p>

            <p className="text-3xl font-semibold mt-2">
              24
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body p-5">
            <p className="text-sm text-base-content/60">
              In Progress
            </p>

            <p className="text-3xl font-semibold mt-2">
              67
            </p>
          </div>
        </div>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body p-5">
            <p className="text-sm text-base-content/60">
              Converted
            </p>

            <p className="text-3xl font-semibold mt-2">
              37
            </p>
          </div>
        </div>

      </div>
     
      {/* Lead Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        
        {/* Overview */}
        <div className="card bg-base-100 border border-base-300 xl:col-span-2">
          <div className="card-body">
            <div>
              <h2 className="card-title text-base">
                Lead Overview
              </h2>

              <p className="text-sm text-base-content/60 mt-1">
                Lead activity over time
              </p>
            </div>

            <div className="h-64 flex items-center justify-center text-base-content/40">
              Chart will go here
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

            <div className="h-64 flex items-center justify-center text-base-content/40">
              Chart will go here
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;