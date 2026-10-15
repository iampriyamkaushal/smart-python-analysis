import { useEffect, useState } from "react";

export default function ToastViewport() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const showToast = (event) => {
      const id = `${Date.now()}-${Math.random()}`;
      const toast = { id, message: event.detail?.message || "Something went wrong.", type: event.detail?.type || "success" };
      setToasts((items) => [...items, toast]);
      window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 4200);
    };
    window.addEventListener("spa-toast", showToast);
    return () => window.removeEventListener("spa-toast", showToast);
  }, []);

  return (
    <div className="toast-viewport" aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => (
        <div className={`global-toast toast-${toast.type}`} key={toast.id} role={toast.type === "error" ? "alert" : "status"}>
          <span aria-hidden="true">{toast.type === "error" ? "!" : "✓"}</span>
          <p>{toast.message}</p>
          <button type="button" aria-label="Dismiss notification" onClick={() => setToasts((items) => items.filter((item) => item.id !== toast.id))}>×</button>
        </div>
      ))}
    </div>
  );
}
