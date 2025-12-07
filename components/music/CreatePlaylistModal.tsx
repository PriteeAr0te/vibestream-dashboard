"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlaylist } from "@/store/slices/playlistSlice";
import InputComponent from "../ui/InputComponent";

interface CreatePlaylistModalProps {
    onClose: () => void;
}

export default function CreatePlaylistModal({ onClose }: CreatePlaylistModalProps) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const handleCreate = () => {
        if (!name) return;
        const id = `${Date.now()}`;
        dispatch(addPlaylist({ id, name, artworkUrl100: image || "/fallback.jpg" }));
        setName("");
        setImage("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-accent p-6 rounded-xl w-[320px] space-y-4">
                <h2 className="text-lg font-semibold">Create Playlist</h2>
                <InputComponent
                    type="text"
                    placeholder="Playlist Name"
                    value={name}
                    label="Playlist Name"
                    name="p-name"
                    onChange={(e) => setName(e.target.value)}
                />
                <InputComponent
                    type="text"
                    placeholder="Image URL (optional)"
                    value={image}
                    label="Image URL (optional)"
                    name="url"
                    onChange={(e) => setImage(e.target.value)}
                />
                <div className="flex gap-2">
                    <button
                        onClick={handleCreate}
                        className="flex-1 bg-primary text-white py-2 rounded hover:opacity-80 transition"
                    >
                        Create
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-secondary text-white py-2 rounded hover:opacity-80 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
