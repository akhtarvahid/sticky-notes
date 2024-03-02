export type Sticky = {
   title: string;
   tags: Tag[];
   body: string;
}

type Tag = {
    name: string;
    id: string;
}

export interface StickyResponse extends Sticky {
   id: string;
   createdAt: string;
   updatedAt: string;
   image: string;
}