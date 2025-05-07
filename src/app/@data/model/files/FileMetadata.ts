export interface FileMetadata {
    id?: string;
    filename: string;
    s3Key?: string;
    contentType: string;
    size: number;
    hashCode?: string;
    dimension: string;
    userId: string;
    uploadTimestamp?: number;
    status?: boolean;
    url?:string
  }
  