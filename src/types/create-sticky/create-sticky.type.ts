export type CreateSticky = {
   title: string;
   tags: Tag[];
   body: string;
}

type Tag = {
    name: string;
    id: string;
}