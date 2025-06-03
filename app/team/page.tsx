"use client";

import React, { useState, useEffect } from "react";
import { getTeamMembersData, TeamMemberItem } from "@/lib/api";
import styles from "./TeamGrid.module.css";

const members = [
  {
    name: "Dr.Pengyuan SHEN",
    role: "Lab Leader",
    avatar: "/avatar1.jpg",
    email: "shen@example.com",
    research: "方向A",
    experience: "经历A",
  },
  {
    name: "Alice",
    role: "Research Assistant",
    avatar: "/avatar2.jpg",
    email: "alice@example.com",
    research: "方向B",
    experience: "经历B",
  },
  {
    name: "Bob",
    role: "Researcher",
    avatar: "/avatar3.jpg",
    email: "bob@example.com",
    research: "方向C",
    experience: "经历C",
  },
  {
    name: "Carol",
    role: "Researcher",
    avatar: "/avatar4.jpg",
    email: "carol@example.com",
    research: "方向D",
    experience: "经历D",
  },
  {
    name: "David",
    role: "Research Assistant",
    avatar: "/avatar5.jpg",
    email: "david@example.com",
    research: "方向E",
    experience: "经历E",
  },
  {
    name: "Eve",
    role: "Researcher",
    avatar: "/avatar6.jpg",
    email: "eve@example.com",
    research: "方向F",
    experience: "经历F",
  },
  // ...继续添加，直到你想要的数量
];

export default function TeamGridPage() {
  const [members, setMembers] = useState<TeamMemberItem[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    getTeamMembersData().then(setMembers);
  }, []);

  return (
    <div className={styles.teamPage}>
      <h2 className={styles.title}>Team Members</h2>
      <div className={styles.grid}>
        {members.map((m, idx) => (
          <div
            key={m.id}
            className={styles.avatarWrapper}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            <img src={m.image ?? ""} alt={m.name} className={styles.avatar} />
            <div className={styles.name}>
              {m.name}
              <br />
              {m.role}
            </div>
            {hovered === idx && (
              <div className={styles.card}>
                <div className={styles.cardName}>{m.name}</div>
                <div className={styles.cardRole}>{m.role}</div>
                <div>邮箱: {m.email}</div>
                <div>研究方向: {m.research}</div>
                <div>经历: {m.experience}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}