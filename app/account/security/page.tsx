"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Security() {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function change(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (pw !== pw2) return setMsg({ ok: false, text: "Passwords don't match." });
    const sb = supabase();
    if (!sb) return setMsg({ ok: false, text: "Accounts aren't configured yet." });
    setBusy(true);
    const { error } = await sb.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) return setMsg({ ok: false, text: error.message });
    setPw(""); setPw2("");
    setMsg({ ok: true, text: "Password updated." });
  }

  async function signOutEverywhere() {
    await supabase()?.auth.signOut({ scope: "global" });
    location.href = "/login";
  }

  return (
    <>
      <h1>Security</h1>
      <form className="panel form" onSubmit={change}>
        <h2>Change password</h2>
        <div className="form-grid">
          <label className="span2">New password<input className="input" type="password" minLength={8} required value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" /></label>
          <label className="span2">Confirm new password<input className="input" type="password" minLength={8} required value={pw2} onChange={(e) => setPw2(e.target.value)} autoComplete="new-password" /></label>
        </div>
        {msg && <p className={msg.ok ? "notice" : "error"}>{msg.text}</p>}
        <button className="btn btn-primary" disabled={busy}>{busy ? "Updating…" : "Update password"}</button>
      </form>
      <div className="panel form">
        <h2>Sessions</h2>
        <p className="muted">Signed in somewhere you don&apos;t recognise? Log out of every device at once.</p>
        <button className="btn" onClick={signOutEverywhere}>Log out everywhere</button>
      </div>
    </>
  );
}
