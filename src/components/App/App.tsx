import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlesearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const fetchPhotos = await getPhotos(query);
      if (fetchPhotos.length === 0) {
        toast.error("No photos found for your request");
      }
      setPhotos(fetchPhotos);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelecPhoto = (photo: Photo | null) => {
    setSelectedPhoto(photo);
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handlesearch} />
          {isLoading && <Loader />}
          {isError && <Text textAlign="center"> Something went wrong... </Text>}
          {photos.length > 0 && (
            <PhotosGallery photos={photos} onSelect={handleSelecPhoto} />
          )}
          {photos.length === 0 && (
            <Text textAlign="center">Sorry. There are not images </Text>
          )}
          {selectedPhoto && (
            <Modal onClose={() => handleSelecPhoto(null)}>
              <div
                style={{
                  backgroundColor: selectedPhoto.avg_color,
                  borderColor: selectedPhoto.avg_color,
                }}
              >
                <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
              </div>
            </Modal>
          )}
        </Container>
      </Section>
    </>
  );
}
