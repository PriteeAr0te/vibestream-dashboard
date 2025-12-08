"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store/index";
import {
    setAutoplay,
    setToastEnabled,
    setPlaybackQuality,
    setCrossfade,
    setRecentActivity,
    resetPreferences,
} from "../../../store/slices/uiPreferencesSlice";
import SettingsRow from "../../../components/settings/SettingsRow";
import Switch from "../../../components/settings/Switch";
import Select from "../../../components/settings/Select";
import Slider from "../../../components/settings/Slider";
import { signOut, useSession } from "next-auth/react";

export default function SettingsPage() {
    const prefs = useSelector((s: RootState) => s.uiPreferences);
    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession();

    function clearAppData() {
        dispatch(resetPreferences());
        try {
            localStorage.removeItem("vibe_ui_preferences_v1");
        } catch { }
        window.location.reload();
    }

    return (
        <div className="max-w-4xl min-h-full mx-auto p-4 py-8 sm:p-3 lg:p-6 flex-1 overflow-y-auto scrollable-container mb-48 sm:mb-24">
            <h1 className="text-2xl font-semibold mb-3 text-foreground">Settings</h1>
            <p className="text-sm text-para mb-6">App preferences & account settings.</p>

            <div className="bg-accent shadow-sm rounded-lg divide-y divide-br">

                <div className="p-4">
                    <h2 className="text-sm font-medium mb-2 text-foreground">General Preferences</h2>

                    <SettingsRow title="Autoplay" subtitle="Automatically play next track">
                        <Switch checked={prefs.autoplay} onChange={(v) => dispatch(setAutoplay(v))} />
                    </SettingsRow>

                    <SettingsRow title="Notifications" subtitle="Show toasts for playlist and like/unlike actions">
                        <Switch checked={prefs.toastEnabled} onChange={(v) => dispatch(setToastEnabled(v))} />
                    </SettingsRow>

                    <SettingsRow title="Playback quality" subtitle="Choose streaming quality (mock)">
                        <Select
                            value={prefs.playbackQuality}
                            onChange={(v) => dispatch(setPlaybackQuality(v))}
                            options={[
                                { value: "normal", label: "Normal" },
                                { value: "high", label: "High" },
                            ]}
                        />
                    </SettingsRow>

                    <SettingsRow title="Crossfade" subtitle="Crossfade duration between tracks">
                        <Slider value={prefs.crossfade} onChange={(v) => dispatch(setCrossfade(v))} min={0} max={10} />
                    </SettingsRow>
                </div>

                <div className="p-4">
                    <h2 className="text-sm font-medium mb-2 text-foreground">Privacy & Data</h2>

                    <SettingsRow title="Recent activity" subtitle="Show or hide recently played songs">
                        <Switch checked={prefs.recentActivity} onChange={(v) => dispatch(setRecentActivity(v))} />
                    </SettingsRow>

                    <SettingsRow title="Clear app data" subtitle="Reset preferences and local app data">
                        <button
                            onClick={clearAppData}
                            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none cursor-pointer"
                        >
                            Clear data
                        </button>
                    </SettingsRow>
                </div>

                <div className="p-4">
                    <h2 className="text-sm font-medium mb-2 text-foreground">Account</h2>

                    <SettingsRow title="Signed in as" subtitle={session?.user?.email ?? "Not signed in"}>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="px-3 py-2 border border-br cursor-pointer rounded-md hover:bg-light"
                            >
                                Logout
                            </button>
                        </div>
                    </SettingsRow>
                </div>
            </div>

            <p className="text-sm text-para mt-4">
                Note: Playback quality and crossfade are UI settings for the demo and do not change actual CDN streams.
            </p>
        </div>
    );
}
