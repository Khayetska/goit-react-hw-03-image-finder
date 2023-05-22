const BASE_URL = 'https://pixabay.com/api/';
const KEY = '36624002-5b9962b3858e5d5ecab8577d4';

export const getSearchImg = async (searchText, page) => {
  try {
    const data = await fetch(
      `${BASE_URL}?q=${searchText}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return await data.json();
  } catch (error) {
    console.log(error);
  }
};

// export const getSearchImg = (searchText, page) => {
//   return fetch(
//     `${BASE_URL}?q=${searchText}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   ).then(res => res.json());
// };
