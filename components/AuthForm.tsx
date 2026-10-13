"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authConfigured, supabase } from "@/lib/supabase";

export default function AuthForm({ mode }: { mode: "signup" | "login" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const signup = mode === "signup";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setNotice("");
    const sb = supabase();
    if (!sb) return setError("Accounts aren't set up yet.");
    setBusy(true);
    if (signup) {
      const { data, error } = await sb.auth.signUp({
        email, password,
        options: { data: { full_name: name }, emailRedirectTo: `${location.origin}/account` },
      });
      setBusy(false);
      if (error) return setError(error.message);
      if (data.session) router.push("/account");
      else setNotice("Check your email to confirm your account, then log in.");
    } else {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setError(error.message);
      router.push("/account");
    }
  }

  return (
    <div className="container section">
      <form className="auth" onSubmit={submit}>
        <h1>{signup ? "Create your account" : "Welcome back"}</h1>
        {!authConfigured && <p className="error">Accounts aren&apos;t configured yet (missing Supabase keys).</p>}
        {signup && (
          <label>Name<input className="input" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
        )}
        <label>Email<input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
        <label>Password
          <input className="input" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={signup ? "new-password" : "current-password"} />
        </label>
        {error && <p className="error">{error}</p>}
        {notice && <p className="notice">{notice}</p>}
        <button className="btn btn-primary" disabled={busy || !authConfigured}>{busy ? "Please wait…" : signup ? "Sign up" : "Log in"}</button>
        <p className="muted">
          {signup ? <>Already have an account? <Link href="/login" className="link">Log in</Link></> : <>New here? <Link href="/signup" className="link">Create an account</Link></>}
        </p>
      </form>
    </div>
  );
}
