import { useState, useEffect } from "react";
import { X, Plus, Trash } from "lucide-react";
import { createVenue, updateVenue, type VenuePayload } from "../api/venues";
import ImageProcessing from "./ImageProcessing";

interface VenueModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess: () => void;
  initialData?: any;
  isInlinePage?: boolean;
}

export default function VenueModal({
  isOpen = true,
  onClose,
  onSuccess,
  initialData,
  isInlinePage = false,
}: VenueModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(1);
  const [mediaUrls, setMediaUrls] = useState<string[]>([""]);
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setPrice(initialData.price || 0);
      setMaxGuests(initialData.maxGuests || 1);
      setMediaUrls(initialData.media?.map((m: any) => m.url) || [""]);
      setWifi(initialData.meta?.wifi || false);
      setParking(initialData.meta?.parking || false);
      setBreakfast(initialData.meta?.breakfast || false);
      setPets(initialData.meta?.pets || false);
      setAddress(initialData.location?.address || "");
      setCity(initialData.location?.city || "");
      setZip(initialData.location?.zip || "");
      setCountry(initialData.location?.country || "");
    } else {
      setName("");
      setDescription("");
      setPrice(0);
      setMaxGuests(1);
      setMediaUrls([""]);
      setWifi(false);
      setParking(false);
      setBreakfast(false);
      setPets(false);
      setAddress("");
      setCity("");
      setZip("");
      setCountry("");
    }
  }, [initialData, isOpen]);

  if (!isOpen && !isInlinePage) return null;

  const handleAddMediaField = () => setMediaUrls([...mediaUrls, ""]);
  const handleRemoveMediaField = (index: number) =>
    setMediaUrls(mediaUrls.filter((_, i) => i !== index));
  const handleMediaChange = (index: number, val: string) => {
    const updated = [...mediaUrls];
    updated[index] = val;
    setMediaUrls(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: VenuePayload = {
      name,
      description,
      price: Number(price),
      maxGuests: Number(maxGuests),
      media: mediaUrls
        .filter((url) => url.trim() !== "")
        .map((url) => ({ url, alt: `${name} property visual representation` })),
      meta: { wifi, parking, breakfast, pets },
      location: {
        address: address.trim() || undefined,
        city: city.trim() || undefined,
        zip: zip.trim() || undefined,
        country: country.trim() || undefined,
      },
    };

    try {
      if (initialData?.id) {
        await updateVenue(initialData.id, payload);
      } else {
        await createVenue(payload);
      }
      onSuccess();
      if (onClose) onClose();
    } catch (err: any) {
      alert(err.message || "Operation submission rejected.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <div
      className={`bg-[#FFC17A] border-4 border-[#FF8800] rounded-2xl w-full max-w-2xl p-6 relative shadow-2xl text-left ${
        !isInlinePage && "my-8 max-h-[90vh] overflow-y-auto"
      }`}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#007878] hover:scale-110 transition-transform"
        >
          <X size={24} />
        </button>
      )}
      <h3 className="text-2xl font-black text-[#007878] uppercase mb-4">
        {initialData ? "Modify Your Venue" : "List a New Accommodation"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-[#9c5600] uppercase mb-1">
              Venue Title Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border bg-white outline-none focus:border-[#007878]"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-black text-[#9c5600] uppercase mb-1">
                Price / Night
              </label>
              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl border bg-white outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black text-[#9c5600] uppercase mb-1">
                Max Guests Allowed
              </label>
              <input
                type="number"
                min="1"
                value={maxGuests}
                onChange={(e) => setMaxGuests(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl border bg-white outline-none"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-[#9c5600] uppercase mb-1">
            Detailed Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 rounded-xl border bg-white outline-none resize-none"
            required
          />
        </div>

        <div className="p-4 bg-white/20 rounded-xl border border-[#FF8800]/10 space-y-3">
          <p className="text-xs font-black text-[#9c5600] uppercase tracking-wide">
            Location Information
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase mb-0.5">
                Street Address
              </label>
              <input
                type="text"
                placeholder="e.g. 123 Main St"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border bg-white text-sm outline-none focus:border-[#007878]"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-0.5">
                  City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Oslo"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border bg-white text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-0.5">
                  Zip
                </label>
                <input
                  type="text"
                  placeholder="0150"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border bg-white text-sm outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-0.5">
              Country
            </label>
            <input
              type="text"
              placeholder="e.g. Norway"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border bg-white text-sm outline-none focus:border-[#007878]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-black text-[#9c5600] uppercase">
            Media Portfolio Gallery URLs
          </label>
          {mediaUrls.map((url, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                type="url"
                placeholder="https://..."
                value={url}
                onChange={(e) => handleMediaChange(idx, e.target.value)}
                className="flex-grow px-4 py-1.5 rounded-xl border bg-white text-sm outline-none"
              />
              {url && (
                <ImageProcessing
                  src={url}
                  alt="Thumbnail preview"
                  className="w-9 h-9 rounded-md border"
                />
              )}
              {mediaUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMediaField(idx)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash size={16} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMediaField}
            className="text-xs font-bold text-[#007878] flex items-center gap-1 hover:underline pt-0.5"
          >
            <Plus size={14} /> Add Secondary Media URL Link
          </button>
        </div>

        <div className="p-4 bg-white/30 rounded-xl border border-[#FF8800]/20">
          <p className="text-xs font-black text-[#9c5600] uppercase mb-2 tracking-wide">
            Venue Amenities
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              ["WIFI", wifi, setWifi],
              ["Parking", parking, setParking],
              ["Breakfast", breakfast, setBreakfast],
              ["Pets", pets, setPets],
            ].map(([lbl, state, setter]: any) => (
              <label
                key={lbl}
                className="flex items-center gap-2 text-sm font-bold text-gray-800 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={state}
                  onChange={(e) => setter(e.target.checked)}
                  className="w-4 h-4 accent-[#007878] rounded cursor-pointer"
                />{" "}
                {lbl}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-[#007878] text-white rounded-xl font-black shadow-lg hover:bg-[#005a5a] transition-colors disabled:bg-gray-400"
        >
          {isSubmitting
            ? "Syncing..."
            : initialData
              ? "Save Venue"
              : "Submit New Venue Listing"}
        </button>
      </form>
    </div>
  );

  if (isInlinePage) {
    return formContent;
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
      {formContent}
    </div>
  );
}
