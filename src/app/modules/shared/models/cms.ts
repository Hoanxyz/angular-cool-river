//cms block interface
export interface CMSResponse {
  cmsBlocks: {
    items: CMSEntry[];
  };
}

export interface CMSEntry {
  content: string;
}
 
 
 
 