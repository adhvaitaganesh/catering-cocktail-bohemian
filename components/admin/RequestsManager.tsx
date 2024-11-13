"use client";

import { useAdmin } from "@/contexts/AdminContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Add this type for badge variants
type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export function RequestsManager() {
  const { requests } = useAdmin();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Contact Requests</h2>
        <Button variant="outline" size="sm">
          Mark All as Read
        </Button>
      </div>
      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="bg-neutral-800 border-neutral-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{request.name}</CardTitle>
                  <CardDescription>{request.email}</CardDescription>
                </div>
                <Badge
                  variant={request.status === "new" ? "default" : "secondary" as BadgeVariant}
                >
                  {request.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-300 mb-4">{request.message}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">{request.date}</span>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm">
                    Archive
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}