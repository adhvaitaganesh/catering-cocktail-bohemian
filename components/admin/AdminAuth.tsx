"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

interface AdminAuthProps {
  onAuthenticated: () => void;
}

export function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { // In a real app, use proper authentication
      onAuthenticated();
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col items-center gap-4">
        <div className="p-3 rounded-full bg-neutral-800">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold">Admin Access</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-neutral-800 border-neutral-700"
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}