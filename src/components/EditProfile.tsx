import { useState } from "react";
import { X } from "lucide-react";
import ImageProcessing from "./ImageProcessing";

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  currentBio: string;
  onSave: (avatarUrl: string, bio: string) => Promise<void>;
}

export default function EditProfile({
  isOpen,
  onClose,
  currentAvatar,
  currentBio,
  onSave,
}: EditProfileProps) {
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar);
  const [bio, setBio] = useState(currentBio);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      if (avatarUrl.trim() && !avatarUrl.startsWith("http")) {
        throw new Error("Please enter a valid image web URL link.");
      }
      await onSave(avatarUrl, bio);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to submit updates.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-[#FFC17A] border-4 border-[#FF8800] rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#007878] hover:scale-110 transition-transform z-10"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-black text-[#007878] uppercase mb-4">
          Edit Profile Information
        </h3>

        <div className="flex justify-center mb-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold text-[#9c5600] uppercase tracking-wider">
              Live Preview
            </span>
            <ImageProcessing
              src={avatarUrl || "https://placehold.co/150"}
              alt="Avatar Preview"
              fallback="https://placehold.co/150?text=Invalid+URL"
              className="w-24 h-24 rounded-full border-4 border-[#007878] bg-white object-cover shadow-md"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded-xl text-sm font-bold border border-red-300">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-black text-[#9c5600] uppercase mb-1">
              Avatar Image URL
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2.5 rounded-xl bg-white text-gray-800 border border-gray-300 outline-none focus:border-[#007878] transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black text-[#9c5600] uppercase mb-1">
              Bio Description
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell visitors about yourself..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl bg-white text-gray-800 border border-gray-300 outline-none focus:border-[#007878] transition resize-none"
              maxLength={160}
            />
            <p className="text-right text-[10px] text-gray-600 mt-1">
              {bio.length}/160 characters
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border-2 border-[#007878] rounded-xl font-bold text-[#007878] hover:bg-[#007878]/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 bg-[#007878] text-white rounded-xl font-black shadow-md hover:bg-[#005a5a] transition-all disabled:bg-gray-400"
            >
              {isSaving ? "Saving..." : "Save Modifications"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
