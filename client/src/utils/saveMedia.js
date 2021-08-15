// This file is all used for the idea of checking if the queried api data
// has already been saved by the user.

export const getSavedIds = () => {
    const savedMediaIds = localStorage.getItem('saved_media')
        ? JSON.parse(localStorage.getItem('saved_media'))
        : [];
  
    return savedMediaIds;
};
  
export const saveMediaIds = (mediaIdArr) => {
    if (mediaIdArr.length) {
      localStorage.setItem('saved_media', JSON.stringify(mediaIdArr));
    } else {
      localStorage.removeItem('saved_media');
    }
};
  
export const removeMediaId = (mediaId) => {
    const savedMediaIds = localStorage.getItem('saved_media')
        ? JSON.parse(localStorage.getItem('saved_media'))
        : null;
  
    if (!savedMediaIds) {
      return false;
    }
  
    const updatedSavedMediaIds = savedMediaIds?.filter((savedMediaId) => savedMediaId !== mediaId);
    localStorage.setItem('saved_media', JSON.stringify(updatedSavedMediaIds));
  
    return true;
};