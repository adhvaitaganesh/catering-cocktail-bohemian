"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SpecialAnnouncement } from "@/components/SpecialAnnouncement";
import { useAnnouncements } from "@/components/ActiveAnnouncementContext";


export function AnnouncementsManager() {
  const { announcements, setAnnouncements } = useAnnouncements();
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    offerTitle: "",
    offerDescription: "",
    promoCode: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setNewAnnouncement(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateAnnouncement = () => {
    const newItem = {
      id: announcements.length + 1,
      title: newAnnouncement.title,
      subtitle: newAnnouncement.subtitle,
      imageUrl: newAnnouncement.imageUrl,
      offerTitle: newAnnouncement.offerTitle,
      offerDescription: newAnnouncement.offerDescription,
      promoCode: newAnnouncement.promoCode,
      active: true,
    };
    setAnnouncements([...announcements, newItem]);
    setNewAnnouncement({
      title: "",
      subtitle: "",
      imageUrl: "",
      offerTitle: "",
      offerDescription: "",
      promoCode: "",
    });
  };

  return (
    <>
      {announcements
        .filter(announcement => announcement && announcement.active)
        .map(announcement => (
          <SpecialAnnouncement 
            key={announcement.id} 
            announcement={announcement} 
          />
        ))}
        
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Create Special Announcement</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Dialog Title</Label>
              <Input
                id="title"
                value={newAnnouncement.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Special Offer"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Image Subtitle</Label>
              <Input
                id="subtitle"
                value={newAnnouncement.subtitle}
                onChange={(e) => handleInputChange("subtitle", e.target.value)}
                placeholder="e.g., Spring Special"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={newAnnouncement.imageUrl}
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                placeholder="Enter image URL"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="offerTitle">Offer Title</Label>
              <Input
                id="offerTitle"
                value={newAnnouncement.offerTitle}
                onChange={(e) => handleInputChange("offerTitle", e.target.value)}
                placeholder="e.g., Book Now & Save"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="offerDescription">Offer Description</Label>
              <Textarea
                id="offerDescription"
                value={newAnnouncement.offerDescription}
                onChange={(e) => handleInputChange("offerDescription", e.target.value)}
                placeholder="e.g., 15% off on all wedding packages"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="promoCode">Promo Code</Label>
              <Input
                id="promoCode"
                value={newAnnouncement.promoCode}
                onChange={(e) => handleInputChange("promoCode", e.target.value)}
                placeholder="e.g., SUMMER24"
                className="bg-neutral-800 border-neutral-700"
              />
            </div>
            <Button className="w-full" onClick={handleCreateAnnouncement}>
              Create Announcement
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Active Announcements</h2>
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="bg-neutral-800 border-neutral-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{announcement.title}</CardTitle>
                    <CardDescription>
                      <div className="space-y-1">
                        <p><strong>Subtitle:</strong> {announcement.subtitle}</p>
                        <p><strong>Offer Title:</strong> {announcement.offerTitle}</p>
                        <p><strong>Description:</strong> {announcement.offerDescription}</p>
                        <p><strong>Promo Code:</strong> {announcement.promoCode}</p>
                      </div>
                    </CardDescription>
                  </div>
                  <Switch
                    checked={announcement.active}
                    onCheckedChange={(checked) => {
                      setAnnouncements(
                        announcements.map((a) =>
                          a.id === announcement.id ? { ...a, active: checked } : a
                        )
                      );
                    }}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}