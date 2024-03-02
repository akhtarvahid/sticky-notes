export type Sticky = {
   title: string;
   tag: string;
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