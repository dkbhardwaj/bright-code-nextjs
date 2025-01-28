// types.ts
export interface WebsiteData {
    images: Image[];
    links: Link[];
    report: Report | null;
  }
  
  export interface Image {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    fileSize?: number;
  }
  
  export interface Link {
    url: string;
    status: number;
  }
  
  export interface Report {
    totalLinks: number;
    totalLinksWithIssues: number;
    hosts: string[];
    issueTypes: { [key: string]: number };
    linkTypes: { [key: string]: number };
    startUrl: string;
  }
  