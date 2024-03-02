export interface CreateSticky {
    title: string;
    tags: Tag[];
    body: string;
}

type Tag = {
    name: string;
    id: string;
}

export interface StickyResponse extends CreateSticky {
   id: string;
   createdAt: string;
   updatedAt: string;
   image: string;
}