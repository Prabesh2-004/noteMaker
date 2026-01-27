import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import api from "../utils/api";

const Home = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const response = await api.get("/user/me", {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        });
        const res = await api.get("/notes", {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
          withCredentials: true,
        });
        setNotes(res.data.notes);
        console.log(res.data.notes);
        setProfile(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user]);
  return (
    <div className="flex justify-center items-center h-full bg-[url(https://i.pinimg.com/1200x/0a/aa/ef/0aaaefcf0df7ddc4cac1c4ef39638546.jpg)] bg-cover ">
      {user ? (
        <div>
          <h1 className="text-4xl font-bold text-white">
            Welcome back, {profile?.name}!
          </h1>
          {notes.map((note) => (
            <div key={note.id}>
              <h2 className="text-2xl mt-4 text-white">{note.title}</h2>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex text-white flex-col gap-4 justify-center items-center">
          <h1 className="text-4xl font-bold">Welcome to Notes Maker</h1>
          <p className="text-center mt-4 text-lg">
            Your personal note taking application
          </p>
          <Link
            className="flex mt-3 px-5 py-2 rounded-full cursor-pointer items-center bg-blue-500 text-white font-medium"
            to="/login"
          >
            Get Started <ArrowRight />{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
