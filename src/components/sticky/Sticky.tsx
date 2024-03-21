import { useMemo, useState } from "react";
import CreateSticky from "./create-sticky/CreateSticky";
import StickyList from "./stickies-list/StickyList";
import {
  useDeleteSticky,
  useGetStickies,
  usePostSticky,
  useUpdateSticky,
} from "../../hooks/useStickyService";
import {
  InputSticky,
  Sticky,
} from "../../types/create-sticky/create-sticky.type";
import Skeleton from "../common/Skeleton";

function StickyIndex() {
  const [selectedSticky, setSelectedSticky] = useState<Sticky | null>(null);

  const { data: stickiesData, isLoading: isStickyLoading } = useGetStickies();
  const { createSticky, isCreating, createError } = usePostSticky();
  const { deleteSticky, isDeleting, deleteError } = useDeleteSticky();
  const { updateSticky, isUpdating, updateError } = useUpdateSticky();

  const stickyList = useMemo(() => {
    return stickiesData ? [...stickiesData].reverse() : [];
  }, [stickiesData]);

  const handleCreateSticky = async (sticky: InputSticky) => {
    try {
      await createSticky(sticky);
    } catch (err) {}
  };
  const handleDeleteSticky = async (id: string) => {
    try {
      await deleteSticky(id);
    } catch (err) {}
  };
  const handleUpdateSticky = async (sticky: any) => {
    try {
      await updateSticky({
        requestBody: sticky,
        queryParams: { id: sticky.id },
      });
    } catch (err) {}
    setSelectedSticky(null);
  };

  const isLoading = isStickyLoading || isCreating || isDeleting || isUpdating;
  const hasError = createError || deleteError || updateError;

  if (hasError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div className="sticky-root">
      <div className="sticky">
        <h1>Sticky notes</h1>
        <CreateSticky
          onCreateSticky={handleCreateSticky}
          onUpdateSticky={handleUpdateSticky}
          selectedSticky={selectedSticky}
        />
        {isLoading ? (
          <Skeleton />
        ) : (
          <StickyList
            stickies={stickyList}
            deleteSticky={handleDeleteSticky}
            setSelectedSticky={setSelectedSticky}
          />
        )}
      </div>
    </div>
  );
}

export default StickyIndex;
