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
import Button from "react-bootstrap/Button";
import ToastMessage from "./toast-message/ToastMessage";
import AlertMsg from "../common/Alert";

function StickyIndex() {
  const [selectedSticky, setSelectedSticky] = useState<Sticky | null>(null);
  const [isCreateSticky, setIsCreateSticky] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  // hooks for CRUD operations
  const { data: stickiesData, isLoading: isStickyLoading } = useGetStickies();
  const { createSticky, isCreating, createError } = usePostSticky();
  const { deleteSticky, isDeleting, deleteError } = useDeleteSticky();
  const { updateSticky, isUpdating, updateError } = useUpdateSticky();

  const stickyList = useMemo(() => {
    return stickiesData ? [...stickiesData].reverse() : [];
  }, [stickiesData]);

  const handleCreateSticky = async (sticky: InputSticky): Promise<void> => {
    let response: InputSticky | undefined;
    if (sticky.title) {
      try {
        response = await createSticky(sticky);
      } catch (err) {}

      if (response) {
        setShow(true);
        setIsCreateSticky(false);
      }
    } else {
      setError(true);
    }
  };
  const handleDeleteSticky = async (id: string): Promise<void> => {
    try {
      await deleteSticky(id);
    } catch (err) {}
  };
  const handleUpdateSticky = async (sticky: any): Promise<void> => {
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
    <>
      {error && (
        <AlertMsg
          title="Oh snap! You got an error!"
          subTitle="Please enter a title for your sticky."
          setError={setError}
        />
      )}
      <div className="sticky-root">
        <div className="sticky">
          <div className="sticky-header">
            <h1>Topics note</h1>
            <Button
              className="create-btn"
              variant="primary"
              onClick={() => setIsCreateSticky(!isCreateSticky)}
            >
              {!isCreateSticky ? "Create" : "Hide"}
            </Button>
          </div>

          {isCreateSticky && (
            <CreateSticky
              onCreateSticky={handleCreateSticky}
              onUpdateSticky={handleUpdateSticky}
              selectedSticky={selectedSticky}
            />
          )}
          <hr />
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
        <ToastMessage show={show} setShow={setShow} />
      </div>
    </>
  );
}

export default StickyIndex;
