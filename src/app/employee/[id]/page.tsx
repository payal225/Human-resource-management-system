'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  role: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: number;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
};

export default function EmployeePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/users/${id}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading employee details...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Employee not found.
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl">
            {user.firstName} {user.lastName}
          </DialogTitle>

          <DialogDescription>
            Employee Details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-lg text-muted-foreground">
              {user.role}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Email
              </p>
              <p>{user.email}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Age
              </p>
              <p>{user.age}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Gender
              </p>
              <p>{user.gender}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Phone
              </p>
              <p>{user.phone}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-muted-foreground">
                Address
              </p>

              <p>
                {user.address.address}, {user.address.city},{' '}
                {user.address.state} ({user.address.stateCode}) -{' '}
                {user.address.postalCode}
              </p>

              <p className="text-sm text-muted-foreground mt-1">
                Coordinates: {user.address.coordinates.lat},{' '}
                {user.address.coordinates.lng}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}