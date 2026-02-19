"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (user?.token) fetchUsers();
  }, [user]);

  if (loading) {
    return (
      <section className="bg-[#EBE2DB] min-h-screen py-20 text-center">
        Loading users...
      </section>
    );
  }

  return (
    <section className="bg-[#EBE2DB] min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto bg-[#F2F1EC] p-10 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-8 tracking-wide">
          REGISTERED USERS
        </h1>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="overflow-hidden rounded-md border border-gray-300">
            <table className="w-full text-left">
              <thead className="bg-[#e8ded5]">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-t hover:bg-[#f6f3ef] transition"
                  >
                    <td className="px-6 py-4">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4 capitalize">{u.role}</td>
                    <td className="px-6 py-4">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
