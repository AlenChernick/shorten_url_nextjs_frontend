'use client';
import { FormEvent, useState, type FC } from 'react';
import { useForm } from '@/app/hooks/useForm';
import { shortenURLService } from '@/app/services/shortenURL.service';
import Link from 'next/link';
import toast from 'react-hot-toast';

const OriginalURL: FC = () => {
  const { values, handleChange, resetForm } = useForm({ url: '' });
  const [originalURL, setOriginalURL] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const originalURLServer: string | null = await shortenURLService.getOriginalURL(values);

    if (originalURLServer) {
      setOriginalURL(originalURLServer);
      toast.success('Original URL Succeeded');
    } else {
      toast.error('Shorten URL Does Not Exists. Shorten it first or check the URL');
    }

    resetForm();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(originalURL);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className='url-shorten-container'>
      <h1 className='url-shorten-title'>Get Original URL</h1>
      <form className='url-shorten-form' onSubmit={handleSubmit}>
        <input
          className='url-shorten-input'
          name='url'
          placeholder='https://example.com/shortenId'
          required
          value={values.url}
          onChange={handleChange}
          autoComplete='off'
        />
        <button type='submit' className='url-shorten-btn'>
          Original URL
        </button>
      </form>
      {originalURL && (
        <section className='url-shorten-output'>
          <h2 className='url-shorten-label'>Your Original Link</h2>
          <input className='url-shorten-input' type='text' readOnly value={originalURL} />
          <section className='url-shorten-btns'>
            <button className='url-shorten-copy-link-btn' onClick={copyToClipboard}>
              Copy Link
            </button>
            <Link className='url-shorten-link' href={originalURL} title={originalURL} target='_blank'>
              Browse
            </Link>
          </section>
        </section>
      )}
    </section>
  );
};

export default OriginalURL;
