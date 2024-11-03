'use client';

import { createContext, useContext, useState } from 'react';

interface Announcement {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  offerTitle: string;
  offerDescription: string;
  promoCode: string;
  active: boolean;
}

interface AnnouncementContextType {
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
}

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: 'Special Offer',
    subtitle: 'Limited Time',
    imageUrl: '/default-image.jpg',
    offerTitle: 'Spring Special',
    offerDescription: 'Book now and save 15%',
    promoCode: 'SPRING24',
    active: true,
  },
];

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(
  undefined
);

export function AnnouncementProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(initialAnnouncements);

  const value = {
    announcements,
    setAnnouncements,
  };

  return (
    <AnnouncementContext.Provider value={value}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncements() {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    throw new Error(
      'useAnnouncements must be used within an AnnouncementProvider'
    );
  }
  return context;
}
