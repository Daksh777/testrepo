import React, { useRef, useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Download,
  FileText,
  Plus,
  Trash2,
  Loader2,
  Upload,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useGetUploadLink,
  useImportDatabase,
  usePostLinkFile,
} from "@/services/adminServices";
import { useUpload } from "@/hooks/useUpload";
import { toast } from "sonner";

interface DatabaseFile {
  filename: string;
  url: string;
  size: number;
}

interface LocalFile extends File {
  imported?: boolean;
}

type FileState =
  | { type: "aws"; file: DatabaseFile }
  | { type: "local"; file: LocalFile; imported: boolean }
  | { type: "empty"; file: null };

interface DatabaseRowProps {
  category: string;
  files: DatabaseFile[];
}

// Custom hook for file operations
const useFileOperations = (category: string) => {
  const { mutateAsync: getUploadLink, isPending: isUploading } =
    useGetUploadLink();
  const {
    uploadFile,
    isUploading: isUploadingFile,
    uploadProgress,
  } = useUpload();
  const { mutateAsync: postLinkFile, isPending: isPosting } = usePostLinkFile();
  const { mutateAsync: importDatabase, isPending: isImporting } =
    useImportDatabase();

  const handleImportFile = useCallback(
    async (file: LocalFile): Promise<void> => {
      try {
        const { s3_upload_url } = await getUploadLink(file.name);
        if (!s3_upload_url) {
          throw new Error("No upload link received from server");
        }

        await uploadFile(file, s3_upload_url);
        await postLinkFile({ category, filename: file.name });
        await importDatabase(category);

        toast.success("File imported successfully");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error occurred";
        toast.error(`Failed to import file: ${message}`);
        throw error;
      }
    },
    [category, getUploadLink, uploadFile, postLinkFile, importDatabase]
  );

  const handleReImportClick = async () => {
    try {
      await importDatabase(category);
      toast.success("File re-importe started successfully");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Failed to re-import file: ${message}`);
    }
  };

  return {
    handleReImportClick,
    handleImportFile,
    isUploading: isUploadingFile || isImporting || isUploading || isPosting,
    uploadProgress,
  };
};

// Utility functions
const formatFileSize = (bytes: number, type: string): string => {
  if (bytes === 0) return "0 KB";

  const k = 1024;
  const sizes =
    type === "aws" ? ["KB", "MB", "GB"] : ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const getCategoryDisplayName = (category: string): string => {
  return category
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const DatabaseRow: React.FC<DatabaseRowProps> = ({ category, files }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize state based on available files
  const initialState: FileState = useMemo(() => {
    const firstFile = files[0];
    return firstFile
      ? { type: "aws", file: firstFile }
      : { type: "empty", file: null };
  }, [files]);

  const [fileState, setFileState] = useState<FileState>(initialState);
  const { handleImportFile, handleReImportClick, isUploading, uploadProgress } =
    useFileOperations(category);

  // Event handlers
  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setFileState({
        type: "local",
        file: file as LocalFile,
        imported: false,
      });

      // Reset input for re-selection
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    []
  );

  const handleAddFileClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveFile = useCallback(() => {
    setFileState({ type: "empty", file: null });
  }, []);

  const handleImportClick = useCallback(async () => {
    if (fileState.type !== "local") return;

    try {
      await handleImportFile(fileState.file);
      setFileState((prev) =>
        prev.type === "local" ? { ...prev, imported: true } : prev
      );
    } catch (error) {
      // Error handling is done in the hook
      console.error("Import failed:", error);
    }
  }, [fileState, handleImportFile]);

  const handleDownloadClick = useCallback(() => {
    if (fileState.type === "aws") {
      downloadFile(fileState.file.url, fileState.file.filename);
    }
  }, [fileState]);

  // Computed values
  const displayName = useMemo(
    () => getCategoryDisplayName(category),
    [category]
  );

  const fileName = useMemo(() => {
    if (!fileState.file) return null;
    return fileState.type === "aws"
      ? fileState.file.filename
      : fileState.file.name;
  }, [fileState]);

  const fileSize = useMemo(() => {
    if (!fileState.file) return null;
    return formatFileSize(fileState.file.size, fileState.type);
  }, [fileState]);

  const statusConfig = useMemo(() => {
    switch (fileState.type) {
      case "aws":
        return {
          text: "Available",
          className: "bg-green-100 text-green-800 border-green-200",
        };
      case "local":
        return fileState.imported
          ? {
              text: "Available",
              className: "bg-green-100 text-green-800 border-green-200",
            }
          : {
              text: "Pending",
              className: "bg-yellow-100 text-yellow-800 border-yellow-200",
            };
      default:
        return {
          text: "Not Available",
          className: "bg-gray-100 text-gray-800 border-gray-200",
        };
    }
  }, [fileState]);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept=".csv,.json,.txt,.xlsx,.xls"
        aria-label={`Upload file for ${displayName}`}
      />

      {/* Category */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Database className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
          <div className="text-sm font-medium text-gray-900">{displayName}</div>
        </div>
      </td>

      {/* File Name */}
      <td className="px-6 py-4 whitespace-nowrap">
        {fileName ? (
          <div className="flex items-center">
            <FileText className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-900 truncate" title={fileName}>
              {fileName}
            </span>
            {files.length > 1 && (
              <Badge
                variant="secondary"
                className="ml-2 text-xs bg-blue-100 text-blue-800 border-blue-200 flex-shrink-0"
              >
                +{files.length - 1} more
              </Badge>
            )}
          </div>
        ) : (
          <span className="text-sm text-gray-500">No file available</span>
        )}
      </td>

      {/* File Size */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">{fileSize || "—"}</span>
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge
          variant="secondary"
          className={cn("font-medium", statusConfig.className)}
        >
          {statusConfig.text}
        </Badge>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          {/* Download Button */}
          {fileState.type === "aws" && (
            <Button
              size="sm"
              onClick={handleDownloadClick}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          )}

          {/* Import Button */}
          {fileState.type === "local" && !fileState.imported && (
            <Button
              size="sm"
              onClick={handleImportClick}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  <span className="hidden sm:inline">Uploading</span>
                  <span className="text-xs ml-1">({uploadProgress}%)</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-1" />
                  Import
                </>
              )}
            </Button>
          )}

          {/* Add File Button */}
          {fileState.type === "empty" && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleAddFileClick}
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add File
            </Button>
          )}

          {/* Remove File Button */}
          {fileState.file && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleRemoveFile}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Remove</span>
            </Button>
          )}

          {fileState.file && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleReImportClick}
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              <RefreshCcw className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Re-Import</span>
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default React.memo(DatabaseRow);
