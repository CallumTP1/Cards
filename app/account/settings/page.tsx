"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

const FIELDS = ["full_name", "phone", "address1", "address2", "city", "postcode", "country"] as const;
type Form = Record<(typeof FIELDS)[number], string>;
const EMPTY: Form = { full_name: "", phone: "", address1: "", address2: "", city: "", postcode: "", country: "United Kingdom" };

export default function Settings() {
  const { user } = useAuth();
  const [form, setForm] = useState<Form>(EMPTY);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    const m = user.user_metadata ?? {};
    setForm({ ...EMPTY, ...Object.fromEntries(FIELDS.filter((f) => m[f]).map((f) => [f, m[f]])) });
    setEmail(user.email ?? "");
  }, [user]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const sb = supabase();
    if (!sb) return setMsg({ ok: false, text: "Accounts aren't configured yet." });
    setBusy(true); setMsg(null);
    const changeEmail = email.trim() && email.trim() !== user?.email;
    const { error } = await sb.auth.updateUser({ data: form, ...(changeEmail ? { email: email.trim() } : {}) });
    setBusy(false);
    setMsg(error ? { ok: false, text: error.message } : { ok: true, text: changeEmail ? "Saved. Check your new email address to confirm the change." : "Saved." });
  }

  return (
    <>
      <h1>Settings</h1>
      <form className="panel form" onSubmit={save}>
        <h2>Profile</h2>
        <div className="form-grid">
          <label>Full name<input className="input" value={form.full_name} onChange={set("full_name")} autoComplete="name" /></label>
          <label>Phone<input className="input" value={form.phone} onChange={set("phone")} autoComplete="tel" /></label>
          <label className="span2">Email<input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
        </div>
        <h2>Delivery address</h2>
        <div className="form-grid">
          <label className="span2">Address line 1<input className="input" value={form.address1} onChange={set("address1")} autoComplete="address-line1" /></label>
          <label className="span2">Address line 2<input className="input" value={form.address2} onChange={set("address2")} autoComplete="address-line2" /></label>
          <label>Town / city<input className="input" value={form.city} onChange={set("city")} autoComplete="address-level2" /></label>
          <label>Postcode<input className="input" value={form.postcode} onChange={set("postcode")} autoComplete="postal-code" /></label>
          <label className="span2">Country<input className="input" value={form.country} onChange={set("country")} autoComplete="country-name" /></label>
        </div>
        {msg && <p className={msg.ok ? "notice" : "error"}>{msg.text}</p>}
        <button className="btn btn-primary" disabled={busy}>{busy ? "Saving…" : "Save changes"}</button>
      </form>
    </>
  );
}
