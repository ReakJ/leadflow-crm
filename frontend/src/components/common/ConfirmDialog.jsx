const ConfirmDialog = ({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">

          <h2 className="card-title">
            {title}
          </h2>

          <p className="text-base-content/70">
            {message}
          </p>

          <div className="card-actions justify-end mt-4">
            <button
              type="button"
              className="btn btn-ghost"
              disabled={loading}
              onClick={onCancel}
            >
              {cancelText}
            </button>

            <button
              type="button"
              className="btn btn-error"
              disabled={loading}
              onClick={onConfirm}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"/>
                  Processing...
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;