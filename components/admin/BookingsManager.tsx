"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockBookings = [
  {
    id: 1,
    name: "John Doe",
    date: "2024-03-20",
    time: "19:00",
    guests: 4,
    status: "confirmed",
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "2024-03-21",
    time: "20:00",
    guests: 2,
    status: "pending",
  },
];

export function BookingsManager() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Upcoming Bookings</h2>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.name}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.time}</TableCell>
              <TableCell>{booking.guests}</TableCell>
              <TableCell>
                <Badge
                  variant={booking.status === "confirmed" ? "default" : "secondary"}
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}