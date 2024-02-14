import { IFormValues } from '@/app/hooks/useForm';

const apiURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:3333';

const getShortenURL = async (values: IFormValues) => {
  try {
    const res = await fetch(`${apiURL}/url/short-url`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data: { shortenedUrl: string } = await res.json();

    const responseURL: string | null = data.shortenedUrl ? `${apiURL}/url/${data.shortenedUrl}` : null;

    return responseURL;
  } catch (error: unknown) {
    return null;
  }
};

const getOriginalURL = async (values: IFormValues) => {
  try {
    const urlArray = values.url.split('/');
    const shortenId = urlArray[urlArray.length - 1];

    if (shortenId === '') return null;

    const res = await fetch(`${apiURL}/url/original-url/${shortenId}`, {
      method: 'GET',
      mode: 'cors',
    });

    const data: { url: string } = await res.json();

    const responseURL: string | null = data.url ? data.url : null;

    return responseURL;
  } catch (error: unknown) {
    return null;
  }
};

export const shortenURLService = { getShortenURL, getOriginalURL };
