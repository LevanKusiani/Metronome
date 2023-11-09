import axios from "axios";
import config from "../config.json";

export const register = async (email, password) => {
  try {
    const request = {
      email,
      password,
    };

    const response = await axios.post(
      `${config.EASYAPI.BASE_URL}api/v1/accounts/register`,
      request
    );

    return response.data;
  } catch (error) {
    console.error("Could not register user: ", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const request = {
      email,
      password,
    };

    const response = await axios.post(
      `${config.EASYAPI.BASE_URL}api/v1/accounts/login`,
      request
    );

    localStorage.setItem("authToken", "Bearer " + response.data);

    return {
      success: true,
      token: response.data
    };
  } catch (error) {
    console.error("Could not authenticate user: ", error);
    throw error;
  }
};

export const getTrackDetails = async (search) => {
  return tempData;

  try {
    const requestConfig = {
      headers: {
        Authorization: localStorage.getItem("authToken"),
      },
    };

    const response = await axios.get(
      `${config.EASYAPI.BASE_URL}api/v1/spotify?search=${search}`,
      requestConfig
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const refreshSuccess = await refreshToken();

      if (refreshSuccess) {
        const requestConfig = {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        };

        const response = await axios.get(
          `${config.EASYAPI.BASE_URL}api/v1/spotify?search=${search}`,
          requestConfig
        );

        return response.data;
      } else {
        console.error("Token refresh failed, unable to retry the request.");
      }
    } else {
      console.error("Request failed:", error);

      throw error;
    }
  }
};

const refreshToken = async () => {
  try {
    const response = await axios.get(
      `${config.EASYAPI.BASE_URL}api/v1/accounts/refreshAccessToken`
    );

    localStorage.setItem("authToken", response.data);

    return true;
  } catch (error) {
    console.error("Could not fetch tracks: ", error);

    return false;
  }
};

const tempData = [
  {
    "id": "7HSk4yGZxfjOkHyOvZrBQZ",
    "name": "Ramparts",
    "artistName": "John Frusciante",
    "albumName": "To Record Only Water For Ten Days (U.S. Version)",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b2732212a5deaedc7b5060799d83",
    "previewUrl": "https://p.scdn.co/mp3-preview/630e78225a3e538ad5f2530b31adf602192744f8?cid=053d1f837c514ba7bd924a64db882745",
    "key": 10,
    "tempo": 172.311
  },
  {
    "id": "1TKYjDdljAXgtQcaAFMWJ9",
    "name": "A.D.H.D. Freestyle",
    "artistName": "Sad Frosty",
    "albumName": "A.D.H.D. Freestyle",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273f7d791e333a6365f7a76e54e",
    "previewUrl": "https://p.scdn.co/mp3-preview/cd1f149c6ec4b25ec515384f68f5fb9577920593?cid=053d1f837c514ba7bd924a64db882745",
    "key": 1,
    "tempo": 119.959
  },
  {
    "id": "2Lt6XpDCo3xETDwWgvZJIY",
    "name": "Murderers",
    "artistName": "John Frusciante",
    "albumName": "To Record Only Water For Ten Days (U.S. Version)",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b2732212a5deaedc7b5060799d83",
    "previewUrl": "https://p.scdn.co/mp3-preview/bf56413f41ad846241054db3d53fa9f3d73b2c9e?cid=053d1f837c514ba7bd924a64db882745",
    "key": 6,
    "tempo": 109.01
  },
  {
    "id": "5CKlucK9mkGhSnCV5i0RSL",
    "name": "S.H.Y.N.E. Freestyle",
    "artistName": "CoachDaGhost",
    "albumName": "Ghost Stories",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b27341ffe169a2c986b80bbcec50",
    "previewUrl": "https://p.scdn.co/mp3-preview/8908bd6083f05b887b1e4a12cada19757be33a24?cid=053d1f837c514ba7bd924a64db882745",
    "key": 11,
    "tempo": 143.657
  },
  {
    "id": "2a0WwSvmFdXPTdDMilPA1y",
    "name": "Song To Sing When I'm Lonely",
    "artistName": "John Frusciante",
    "albumName": "Shadows Collide With People",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273170c1534eab1173ca18982ed",
    "previewUrl": "https://p.scdn.co/mp3-preview/21f399da7eae873d25457eb7ab51cca377265496?cid=053d1f837c514ba7bd924a64db882745",
    "key": 6,
    "tempo": 114.243
  },
  {
    "id": "0IFkeBGmjiq0BW3G7HTZjs",
    "name": "Glacial Domination (feat. Matthew K. Heafy)",
    "artistName": "Frozen Soul",
    "albumName": "Glacial Domination",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b27367c7c8c92bfca4182f8bf6e9",
    "previewUrl": "https://p.scdn.co/mp3-preview/cb96b3bf8c402da2e0b1bae87db713cac46d0e2e?cid=053d1f837c514ba7bd924a64db882745",
    "key": 9,
    "tempo": 127.038
  },
  {
    "id": "6UJyU6gBWdE2oTzuPJODNG",
    "name": "The Past Recedes",
    "artistName": "John Frusciante",
    "albumName": "Curtains",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b27307f4f77a96929f7151c4a9c1",
    "previewUrl": "https://p.scdn.co/mp3-preview/8867ab9b12c9e64378790abdf32b88ef77b18641?cid=053d1f837c514ba7bd924a64db882745",
    "key": 7,
    "tempo": 102.767
  },
  {
    "id": "4hDzUbl0NxTuoYHKkXK0NB",
    "name": "$FREE",
    "artistName": "gio.",
    "albumName": "$FREE",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b2734b81f46fed210d66846ba1f6",
    "previewUrl": "https://p.scdn.co/mp3-preview/4ee5bf0f7cb0c928e60cbb59a14c6f4c8d6974ec?cid=053d1f837c514ba7bd924a64db882745",
    "key": 1,
    "tempo": 119.963
  },
  {
    "id": "3qI18UF3mDDjHdV7fPV9XK",
    "name": "The Will To Death",
    "artistName": "John Frusciante",
    "albumName": "The Will To Death",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b2735b5a026cb23075fff31dd0df",
    "previewUrl": "https://p.scdn.co/mp3-preview/aa99148165146a1772ec7a9d71f5239edb40dfe0?cid=053d1f837c514ba7bd924a64db882745",
    "key": 6,
    "tempo": 168.215
  },
  {
    "id": "7wlYgSvjUYJoSuSJsNETVP",
    "name": "Suckafree",
    "artistName": "Nowaah The Flood",
    "albumName": "Respectfully",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b27396bc41771e4e03c9abc78aad",
    "previewUrl": "https://p.scdn.co/mp3-preview/c3878a3c3132f39a359751b776a0ba78d16ff1d7?cid=053d1f837c514ba7bd924a64db882745",
    "key": 7,
    "tempo": 81.892
  },
  {
    "id": "0v7zvN72z2XGANTHmX064E",
    "name": "Second Walk",
    "artistName": "John Frusciante",
    "albumName": "Shadows Collide With People",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273170c1534eab1173ca18982ed",
    "previewUrl": "https://p.scdn.co/mp3-preview/66be9bd37b280a8a2bb3324a7141bfe0ffce4d06?cid=053d1f837c514ba7bd924a64db882745",
    "key": 4,
    "tempo": 99.967
  },
  {
    "id": "114CMCngAIwvI8pTgTadIO",
    "name": "Money",
    "artistName": "Frustration",
    "albumName": "Money",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b2734da702ee3fe7729232fadee7",
    "previewUrl": "https://p.scdn.co/mp3-preview/945b45662b6e2dcca59a6a6dbc8d751b6e71cf57?cid=053d1f837c514ba7bd924a64db882745",
    "key": 6,
    "tempo": 106.424
  },
  {
    "id": "67nD6Cd1IZwnj9TsDLly6o",
    "name": "Omission",
    "artistName": "John Frusciante",
    "albumName": "Shadows Collide With People",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273170c1534eab1173ca18982ed",
    "previewUrl": "https://p.scdn.co/mp3-preview/4412d25c8c103112ba5149e6f2951aeabc1eec80?cid=053d1f837c514ba7bd924a64db882745",
    "key": 0,
    "tempo": 164.373
  },
  {
    "id": "7t8XzOVbyD73uhk4s4mZ6H",
    "name": "Suicide Freestyle",
    "artistName": "Ja Rule",
    "albumName": "Venni Vetti Vecci",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b2739494fd00546dc8622d962a73",
    "previewUrl": null,
    "key": 6,
    "tempo": 112.242
  },
  {
    "id": "2vC2YrdJBPUxYXqZSXHFAg",
    "name": "This Cold",
    "artistName": "John Frusciante",
    "albumName": "Shadows Collide With People",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273170c1534eab1173ca18982ed",
    "previewUrl": "https://p.scdn.co/mp3-preview/207ca3ebbbb69cca9967fc38eba465844baf5aa1?cid=053d1f837c514ba7bd924a64db882745",
    "key": 0,
    "tempo": 101.531
  },
  {
    "id": "1CUmDIdhiRGCVFNWDAZ4uo",
    "name": "$€ Freestyle",
    "artistName": "Sfera Ebbasta",
    "albumName": "Famoso",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273fcea903d2a115669ab85b19e",
    "previewUrl": null,
    "key": 8,
    "tempo": 136.079
  },
  {
    "id": "0WlIsoZO70rddJrsal9Tqm",
    "name": "Before the Beginning",
    "artistName": "John Frusciante",
    "albumName": "The Empyrean",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273d0fc10bfd23d2ef8824a0d81",
    "previewUrl": "https://p.scdn.co/mp3-preview/96dd8e8e0aa8be96780bd64428be874d5def73bc?cid=053d1f837c514ba7bd924a64db882745",
    "key": 4,
    "tempo": 179.438
  },
  {
    "id": "3OsYMhzN0fOrrU7GWgo6Ef",
    "name": "Fruit Snacks",
    "artistName": "Milligram",
    "albumName": "Give Me Everything or Give Me Nothing At All",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b27324999b7bf9275424b971d956",
    "previewUrl": "https://p.scdn.co/mp3-preview/3b0755c122dda5dbb96f08f7f562f42fbee502f4?cid=053d1f837c514ba7bd924a64db882745",
    "key": 4,
    "tempo": 163.044
  },
  {
    "id": "1cTRK9gNztl05x4coj4agt",
    "name": "J. Frusciante",
    "artistName": "Avenade",
    "albumName": "Vice Versa in Such Things",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273176b3ad15e9cf9f1d3bd5f1a",
    "previewUrl": "https://p.scdn.co/mp3-preview/63c686c8c7aab43413960709d7704c063f29259c?cid=053d1f837c514ba7bd924a64db882745",
    "key": 9,
    "tempo": 91.128
  },
  {
    "id": "2qR60OcSmBOSwaTtrZncCq",
    "name": "Abominable (feat. Matthew K. Heafy)",
    "artistName": "Frozen Soul",
    "albumName": "Glacial Domination",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b27367c7c8c92bfca4182f8bf6e9",
    "previewUrl": "https://p.scdn.co/mp3-preview/b7fc367b205123bc81ac028ea2df0f95b347f01d?cid=053d1f837c514ba7bd924a64db882745",
    "key": 4,
    "tempo": 120.533
  }
]