"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Upload, 
  File, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadFile, UploadResponse } from "@/lib/services/upload.service";
import Image from "next/image";

interface UploadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete?: (data: UploadResponse["data"]) => void;
  token: string;
}

export default function UploadPopup({ isOpen, onClose, onUploadComplete, token }: UploadPopupProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFile(null);
        setPreview(null);
        setStatus("idle");
        setProgress(0);
        setError(null);
      }, 300);
    }
  }, [isOpen]);

  const handleFileSelect = (selectedFile: File) => {
    const validTypes = ["image/jpeg", "image/png", "application/pdf", "video/mp4", "video/quicktime", "video/x-msvideo"];
    
    if (!validTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Please upload an image, video, or PDF.");
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("File is too large. Max size is 50MB.");
      return;
    }

    setFile(selectedFile);
    setError(null);

    // Create preview for images
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files?.[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file || !token) return;

    setStatus("uploading");
    setProgress(0);

    try {
      const response = await uploadFile(file, token, (p) => setProgress(p));
      setStatus("success");
      onUploadComplete?.(response.data);
      
      // Auto close after success
      setTimeout(onClose, 2000);
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Something went wrong during upload");
    }
  };

  const getFileIcon = () => {
    if (!file) return <Upload className="w-10 h-10 text-slate-400" />;
    if (file.type.startsWith("image/")) return <ImageIcon className="w-10 h-10 text-blue-400" />;
    if (file.type.startsWith("video/")) return <Video className="w-10 h-10 text-purple-400" />;
    return <FileText className="w-10 h-10 text-amber-400" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={status !== "uploading" ? onClose : undefined}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <h3 className="text-lg font-semibold text-white">Upload Media</h3>
                {status !== "uploading" && (
                  <button 
                    onClick={onClose}
                    className="p-1.5 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {status === "idle" || status === "error" ? (
                  <div className="space-y-6">
                    {/* Upload Area */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className={cn(
                        "relative group cursor-pointer flex flex-col items-center justify-center gap-4 py-12 px-6 border-2 border-dashed rounded-2xl transition-all duration-300",
                        file 
                          ? "border-indigo-500/50 bg-indigo-500/5" 
                          : "border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
                      )}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                        accept="image/*,video/*,application/pdf"
                      />

                      {preview ? (
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-lg border border-white/10">
                          <Image 
                            src={preview} 
                            alt="Preview" 
                            fill 
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="p-4 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-300">
                          {getFileIcon()}
                        </div>
                      )}

                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-200">
                          {file ? file.name : "Click to select or drag and drop"}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          PNG, JPG, MP4 or PDF (Max. 50MB)
                        </p>
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <button
                      disabled={!file}
                      onClick={handleSubmit}
                      className={cn(
                        "w-full py-3.5 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                        file
                          ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 active:scale-95"
                          : "bg-white/5 text-slate-500 cursor-not-allowed"
                      )}
                    >
                      <Upload className="w-5 h-5" />
                      Start Upload
                    </button>
                  </div>
                ) : status === "uploading" ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-8">
                    <div className="relative flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-4 border-white/5" />
                      <svg className="absolute w-24 h-24 -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="44"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-indigo-500 transition-all duration-300 ease-out"
                          style={{
                            strokeDasharray: 276.46,
                            strokeDashoffset: 276.46 - (progress / 100) * 276.46
                          }}
                        />
                      </svg>
                      <span className="absolute text-xl font-bold text-white">{progress}%</span>
                    </div>

                    <div className="w-full text-center space-y-2">
                      <p className="font-semibold text-white">Uploading file...</p>
                      <p className="text-sm text-slate-400">Please keep this window open</p>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center justify-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white">Upload Complete!</h4>
                      <p className="text-sm text-slate-400 mt-1">Your file has been stored securely</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
